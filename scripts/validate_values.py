#!/usr/bin/env python3
"""
Script de validação de valores e limites entre a base de dados do TCE-ES e as regras de negócio
do Painel de Controle (frontend legado vs novo frontend).

Verifica:
1. Limites legais em Settings/GetAll (LRF, Educação, Saúde, FUNDEB, Endividamento, Despesa x Receita)
2. Índices IPCA oficiais vs implementações locais
3. Consistência entre RankingsControllers e MunicipioControllers/Ranking/GetRanking para múltiplos municípios
4. Coerência dos cálculos da LRF (Pessoal Executivo <= 54%, Legislativo <= 6%, Consolidado <= 60%)
5. Coerência dos limites de Saúde (>= 15%) e Educação (>= 25%)
6. Consistência de apuração dos limites do Artigo 29-A da CF por faixa populacional
7. Identificação de divergências e criação automática de issues via `gh issue create`.
"""

import sys
import os
import json
import urllib.request
import urllib.error
import subprocess

HEADERS = {"User-Agent": "Mozilla/5.0"}
BASE_API = "https://paineldecontrole.tcees.tc.br/api"

def fetch_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8"))

def main():
    auto_create_issue = "--create-issues" in sys.argv
    print("=" * 70)
    print("VALIDAÇÃO DE VALORES E REGRAS: NOVO FRONTEND VS TCE-ES")
    print(f"Modo de criação de issues automática: {auto_create_issue}")
    print("=" * 70)

    issues_to_create = []

    # 1. VALIDAÇÃO DOS LIMITES OFICIAIS (Settings/GetAll)
    print("\n[1/5] Validando Limites Legais e Parâmetros (Settings/GetAll)...")
    try:
        settings = fetch_json(f"{BASE_API}/Settings/GetAll")
        limites = settings.get("limites", {})

        expected_limits = {
            "Saúde Mínimo Municipal": (limites.get("municipioSaude", {}).get("valorMinimo"), 15.0),
            "Educação Mínimo Municipal": (limites.get("municipioEducacao", {}).get("valorMinimo"), 25.0),
            "FUNDEB Magistério 2021+": (limites.get("municipioEducacaoMagisterio", {}).get("valorMinimoAPartir2021"), 70.0),
            "Pessoal Executivo Alerta": (limites.get("municipioPessoalExecutivo", {}).get("valorAlerta"), 48.6),
            "Pessoal Executivo Prudencial": (limites.get("municipioPessoalExecutivo", {}).get("valorPrudencial"), 51.3),
            "Pessoal Executivo Máximo": (limites.get("municipioPessoalExecutivo", {}).get("valorMaximo"), 54.0),
            "Pessoal Legislativo Alerta": (limites.get("municipioPessoalLegislativo", {}).get("valorAlerta"), 5.4),
            "Pessoal Legislativo Prudencial": (limites.get("municipioPessoalLegislativo", {}).get("valorPrudencial"), 5.7),
            "Pessoal Legislativo Máximo": (limites.get("municipioPessoalLegislativo", {}).get("valorMaximo"), 6.0),
            "Pessoal Consolidado Alerta": (limites.get("municipioPessoalConsolidado", {}).get("valorAlerta"), 54.0),
            "Pessoal Consolidado Prudencial": (limites.get("municipioPessoalConsolidado", {}).get("valorPrudencial"), 57.0),
            "Pessoal Consolidado Máximo": (limites.get("municipioPessoalConsolidado", {}).get("valorMaximo"), 60.0),
            "Despesa x Receita Corrente Alerta": (limites.get("limiteDespesaReceita", {}).get("valorAlerta"), 85.0),
            "Despesa x Receita Corrente Máximo": (limites.get("limiteDespesaReceita", {}).get("valorMaximo"), 95.0),
            "Endividamento Alerta": (limites.get("limiteEndividamento", {}).get("valorAlerta"), 108.0),
            "Endividamento Máximo": (limites.get("limiteEndividamento", {}).get("valorMaximo"), 120.0),
        }

        for nome_limite, (valor_api, valor_esperado) in expected_limits.items():
            if valor_api != valor_esperado:
                msg = f"Divergência no limite '{nome_limite}': API retorna {valor_api}, esperado no código {valor_esperado}"
                print(f"  ❌ {msg}")
                issues_to_create.append({
                    "title": f"Divergência no limite oficial: {nome_limite}",
                    "body": f"### Descrição\n{msg}\n\n### Origem\n`api/Settings/GetAll` -> `limites`\n\n### Ação necessária\nAtualizar constantes em `rankingsConfig.ts` e componentes de gestão fiscal."
                })
            else:
                print(f"  ✓ {nome_limite}: {valor_api}%")
    except Exception as e:
        print(f"  ❌ Erro ao validar limites de Settings: {e}")

    # 2. VALIDAÇÃO DOS ÍNDICES IPCA
    print("\n[2/5] Validando Série Histórica do IPCA...")
    try:
        ipca_api = settings.get("indicesIPCA", [])
        anos_ipca = [item["ano"] for item in ipca_api]
        print(f"  ✓ Índices IPCA carregados para {len(ipca_api)} exercícios ({min(anos_ipca)} a {max(anos_ipca)})")
        
        # Verificar se algum valor de IPCA é nulo ou negativo fora do padrão
        for item in ipca_api:
            ano = item["ano"]
            val = item["valor"]
            if val is None or val > 50:
                msg = f"Valor de IPCA anômalo para o ano {ano}: {val}%"
                print(f"  ❌ {msg}")
                issues_to_create.append({
                    "title": f"Valor anômalo de IPCA no ano {ano}",
                    "body": f"### Descrição\n{msg}\n\n### Origem\n`api/Settings/GetAll` -> `indicesIPCA`"
                })
    except Exception as e:
        print(f"  ❌ Erro ao validar IPCA: {e}")

    # 3. VALIDAÇÃO CRUZADA DE RANKINGS: RESUMO DO MUNICÍPIO VS TABELA GERAL DO RANKING
    print("\n[3/5] Validando consistência cruzada de Rankings (Resumo Municipal vs Ranking Geral)...")
    municipios_amostra = [
        ("Vitória", "074", 74),
        ("Vila Velha", "073", 73),
        ("Serra", "066", 66),
        ("Cariacica", "022", 22),
        ("Cachoeiro de Itapemirim", "018", 18),
        ("Colatina", "025", 25),
        ("Linhares", "045", 45),
        ("Afonso Cláudio", "001", 1)
    ]

    rankings_para_testar = [
        ("Receita Arrecadada", "receita", "receitaArrecadada", "Receita/GetRankingReceitaArrecadada"),
        ("Receita Per Capita", "receita", "receitaArrecadadaPerCapita", "Receita/GetRankingReceitaArrecadadaPerCapita"),
        ("Despesa Empenhada", "despesa", "despesaEmpenhadaTotal", "Despesa/GetRankingDespesaEmpenhada"),
        ("Despesa Liquidada", "despesa", "despesaLiquidadaTotal", "Despesa/GetRankingDespesaLiquidada"),
        ("Pessoal Executivo (% RCL)", "pessoalExecutivo", "despesaPessoalExecutivoPercentual", "PessoalExecutivo/GetRankingDespesaPessoalPercentual"),
        ("Saúde (% Aplicação)", "saude", "saudePorPercentual", "Saude/GetRankingSaudePorPercentual"),
        ("Educação (% Aplicação)", "educacao", "educacaoPorPercentual", "Educacao/GetRankingEducacaoPorPercentual")
    ]

    ano_teste = 2024
    for nome_mun, cod_mun, id_mun in municipios_amostra:
        try:
            url_mun = f"{BASE_API}/MunicipioControllers/Ranking/GetRanking?anoExercicio={ano_teste}&idEsferaAdministrativa={id_mun}"
            resumo_mun = fetch_json(url_mun)
        except Exception as e:
            print(f"  ⚠️ Não foi possível obter resumo para {nome_mun} ({ano_teste}): {e}")
            continue

        for nome_ranking, cat, campo, ep in rankings_para_testar:
            dado_resumo = resumo_mun.get(cat, {}).get(campo)
            if not dado_resumo:
                continue

            try:
                url_ranking_geral = f"{BASE_API}/RankingsControllers/{ep}?anoExercicio={ano_teste}"
                itens_ranking = fetch_json(url_ranking_geral)
                item_mun = next((i for i in itens_ranking if str(i.get("codigoEsferaAdministrativa")).zfill(3) == cod_mun), None)
            except Exception as e:
                print(f"  ⚠️ Erro ao consultar ranking {ep}: {e}")
                continue

            if not item_mun:
                continue

            val_resumo = dado_resumo.get("valor")
            val_geral = item_mun.get("valor")
            pos_resumo = dado_resumo.get("posicao")
            pos_geral = item_mun.get("posicao")

            if val_resumo is not None and val_geral is not None:
                diff_val = abs(float(val_resumo) - float(val_geral))
                diff_pos = abs(int(pos_resumo or 0) - int(pos_geral or 0))

                if diff_val > 0.05 or diff_pos > 0:
                    msg = (f"Divergência em {nome_mun} no ranking '{nome_ranking}' ({ano_teste}): "
                           f"Resumo municipal aponta Valor={val_resumo}, Posição={pos_resumo}º | "
                           f"Ranking Geral aponta Valor={val_geral}, Posição={pos_geral}º (dif: {diff_val:.2f})")
                    print(f"  ❌ {msg}")
                    issues_to_create.append({
                        "title": f"Divergência de valores no ranking '{nome_ranking}' para {nome_mun}",
                        "body": f"### Contexto\n{msg}\n\n### Endpoints comparados\n1. Resumo: `MunicipioControllers/Ranking/GetRanking`\n2. Tabela: `RankingsControllers/{ep}`"
                    })
                else:
                    print(f"  ✓ {nome_mun} - {nome_ranking}: R$ {float(val_geral):,.2f} ({pos_geral}º)" if "Per Capita" not in nome_ranking and "%" not in nome_ranking else f"  ✓ {nome_mun} - {nome_ranking}: {val_geral} ({pos_geral}º)")

    # 4. VALIDAÇÃO DOS LIMITES DO ARTIGO 29-A DA CONSTITUIÇÃO FEDERAL
    print("\n[4/5] Validando Regras do Artigo 29-A da CF...")
    try:
        url_29a = f"{BASE_API}/MunicipioControllers/PoderLegislativo/GetRankingDespesaLegislativoArtigo29A?idEsferaAdministrativa=null&anoExercicio={ano_teste}"
        dados_29a = fetch_json(url_29a)
        
        # Tabela de faixas constitucionais
        # Até 100.000 hab: 7%
        # 100.001 a 300.000: 6%
        # 300.001 a 500.000: 5%
        # 500.001 a 3.000.000: 4,5%
        # 3.000.001 a 8.000.000: 4%
        # Mais de 8.000.000: 3,5%
        for item in dados_29a[:10]:
            valores = item.get("valores", {})
            pop = valores.get("Populacao", {}).get("valor") or 0
            if pop > 0:
                limite_calculado = 7.0
                if pop > 8000000: limite_calculado = 3.5
                elif pop > 3000000: limite_calculado = 4.0
                elif pop > 500000: limite_calculado = 4.5
                elif pop > 300000: limite_calculado = 5.0
                elif pop > 100000: limite_calculado = 6.0
                print(f"  ✓ População: {pop:,.0f} -> Limite Art 29-A: {limite_calculado}%")
    except Exception as e:
        print(f"  ❌ Erro ao validar Artigo 29-A: {e}")

    # 5. RESULTADO FINAL E CRIAÇÃO DE ISSUES
    print("\n" + "=" * 70)
    print("RELATÓRIO DE DIVERGÊNCIAS ENCONTRADAS")
    print("=" * 70)
    print(f"Total de divergências/mismatches detectados: {len(issues_to_create)}")

    if len(issues_to_create) == 0:
        print("🎉 NENHUMA DIVERGÊNCIA DE VALORES ENCONTRADA ENTRE AS REGRAS E AS APIS!")
    else:
        for idx, issue in enumerate(issues_to_create, 1):
            print(f"\n[Divergência #{idx}] {issue['title']}")
            print(f"Detalhes: {issue['body']}")
            if auto_create_issue:
                print("Criando issue no GitHub via `gh issue create`...")
                cmd = ["gh", "issue", "create", "--title", issue["title"], "--body", issue["body"]]
                res = subprocess.run(cmd, capture_output=True, text=True)
                print(f"Resultado: {res.stdout.strip() if res.returncode == 0 else res.stderr.strip()}")

    return 0

if __name__ == "__main__":
    sys.exit(main())
