# Plano de implementação — paridade com paineldecontrole.tcees.tc.br

Levantamento feito em 27/11/2026 comparando o site oficial (versão `2026.11.7.1.18`) com este repositório (`main` @ `0cc3528`).

## Como o site oficial funciona (o que importa para o plano)

- O `<title>` é fixo em todas as rotas: `:: Painel de Controle - Tribunal de Contas do Estado do Espírito Santo ::`. Também define `lang="pt"`, `meta copyright="© Tribunal de Contas do Espírito Santo"` e `author="STI - TCE-ES"`.
- As páginas se dividem em dois tipos:
  1. **Nativas**, que consomem a mesma API já usada aqui (`${ENV.apiUrl}/MunicipioControllers/...`, `RankingsControllers/...`, `PrevidenciaControllers/...`, `FiscalizacaoControllers/...`). Exemplos capturados:
     - RCL do município: `MunicipioControllers/Receita/GetEvolucaoMensalReceitaCorrenteLiquida`, `.../GetEvolucaoAnualReceitaCorrenteLiquida`, `MunicipioControllers/Endividamento/GetEvolucao{Mensal,Anual}RCLAjustadaEndividamento`, `MunicipioControllers/PessoalConsolidado/GetEvolucao{Mensal,Anual}RCLAjustadaPessoal` (parâmetros `idEsferaAdministrativa`, `anoExercicio`).
     - Ranking: `RankingsControllers/Receita/GetRankingReceitaArrecadada?anoExercicio=`.
     - Indicadores consolidados/receitas: `MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaMunicipios`, `MunicipioControllers/Receita/GetEsferaAdministrativaValorPerCapita`, `MunicipioControllers/Receita/GetEvolucaoReceitaArrecadadaEsferas`.
  2. **Embeds Power BI/Tableau** (padrão `Iframe` já usado em `obras/page.tsx` e `area-tematica/saude/*`). Ex.: Saneamento básico e Contratações públicas são `app.powerbi.com/view?r=...`.
- **Descoberta de endpoints:** para cada página, abrir a rota no site oficial e rodar no console:
  ```js
  performance.getEntriesByType('resource').map(e => e.name).filter(n => /\/api\//.test(n))
  [...document.querySelectorAll('iframe')].map(i => i.src)
  ```

## Fase 0 — Title e metadados (rápido, fazer primeiro)

Arquivo: `src/app/layout.tsx`.

1. Trocar `metadata` (hoje `"Create Next App"`) por:
   ```ts
   export const metadata: Metadata = {
     title: {
       default: ":: Painel de Controle - Tribunal de Contas do Estado do Espírito Santo ::",
       template: "%s :: Painel de Controle - TCE-ES",
     },
     description: "Painel de Controle: a sua ferramenta de fiscalização dos órgãos públicos capixabas",
     authors: [{ name: "STI - TCE-ES" }],
     other: { copyright: "© Tribunal de Contas do Espírito Santo" },
   };
   ```
   O `template` só vale para segmentos filhos (doc em `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`). Sem `title` nos filhos, toda página exibe o `default` — idêntico ao site oficial.
2. `<html lang="en">` → `<html lang="pt-BR">`.
3. Opcional, depois: `export const metadata = { title: "Município" }` (ou `generateMetadata` com nome do município/ano) nos `layout.tsx` de cada seção. Só funciona em arquivos de servidor; layouts com `"use client"` precisam de um `layout.tsx` servidor por cima.
4. Remover o `<script>` comentado do Google Maps com a chave `AIzaSy...` embutida. **A chave está versionada no Git: revogar/rotacionar no Google Cloud** e ler de `ENV.apiGoogleMapsKey`.

## Fase 1 — Corrigir navegação quebrada/errada

> **Status:** Fases 0 e 1 aplicadas. IEGE/IEGM no header apontam provisoriamente para o painel oficial (link externo) até a Fase 6.

| Onde | Problema | Correção |
|---|---|---|
| `src/app/(home)/_components/widgets/painel/area-tematica.json` | "Assistência social" aponta para `/area-tematica/concessao-publica/visao-geral` | `/area-tematica/assistencia-social/referenciamento` |
| `.../painel/outras-opcoes.json` | Título "Fsicalizações" com link para `/estado/{ano}/visao-geral` | "Boletins e fiscalizações" → `/boletins/{boletins-ano}` (site oficial agrupa) ou dropdown de fiscalizações |
| `.../painel/municipios.json` | `/indicadores-consolidados/{ano}/receita/orcamentaria` não existe | `/indicadores-consolidados/{ano}/receita` |
| `src/components/layout/dashboard/DashboardHeaderMenu.tsx` | Links IEGE (`/estado/{ano}/iege`) e IEGM (`/municipio/{ano}/iegm`) sem rota; "Pessoal" com `TODO` | Apontar para as novas rotas de fiscalização (Fase 4) |
| `src/app/estado/[ano]/_components/BarraLateralEstado.tsx` | Tooltip "Visão geral do município" | "Visão geral do Estado" |
| `src/app/municipio/[ano]/[municipio]/[pagina]/page.tsx` | `area-tematica` redireciona fixo para concessão pública | Redirecionar para o índice de áreas temáticas |
| Header (dropdowns) | Faltam itens do site oficial (ver Fases 3–5) | Atualizar junto com cada fase |

## Fase 2 — Preencher stubs existentes

Padrão a seguir: `DashboardLayout` + `barraLateral` + `itensBreadcrumb`; widgets como Server Components `async` com `getData` em `cache()` (ver `municipio/.../visao-geral/_components/widgets/SaudeWidget.tsx`); gráficos via `EChart`/`GaugeChart`/`DoughnutChart`.

### 2.1 Rankings (33 páginas com `//TODO: implementar pagina`, sem layout)

- Criar `src/app/rankings/[ano]/layout.tsx`, `routes.ts`, `BreadcrumbRankings.tsx` e `_components/BreadcrumbRankingsPaginas.tsx` (mesmo padrão de `fiscalizacao/[ano]/saude`).
- Criar `src/app/rankings/[ano]/_components/RankingTabela.tsx` (tabela ordenável + mapa `MapaEsChart`) e `rankingsConfig.ts` mapeando `categoria/slug → { titulo, endpoint, formato }`. Cada `page.tsx` vira um wrapper de poucas linhas que passa o slug.
- Endpoints: `RankingsControllers/<Categoria>/GetRanking<Nome>?anoExercicio=` — descobrir um por página.
- Adicionar no site oficial e faltando aqui: `gestao-fiscal/balanco-patrimonial-rpps`, `balanco-patrimonial-exceto-rpps`, `balanco-patrimonial-x-rcl`.

### 2.2 Indicadores consolidados (25 páginas stub, sem layout)

- Mesmo esquema: `layout.tsx` + sidebar própria (`BarraLateralIndicadoresConsolidados`) + breadcrumb com seletor de ano.
- Agrupar por tema (receita, despesa, resultado, pessoal, educação, saúde, previdência, alertas LRF, IEGM). Site oficial usa rotas como `/indicadoresConsolidados/{ano}/receitas` e `/despesasReceitas`.

### 2.3 Município e Estado — páginas com texto placeholder

- `municipio/[ano]/[municipio]/gestao-fiscal/{meta-arrecadacao,receita-corrente-liquida}`
- `municipio/[ano]/[municipio]/gestao-orcamentaria/{planejamento-governamental,plano-plurianual}`
- `municipio/[ano]/[municipio]/(root)/{obrigacao-de-envio,prestacao-conta}`
- Os mesmos seis em `estado/[ano]/...`
- Reaproveitar `obrigacao-de-envio/[ano]/_api/*` e `prestacao-de-conta` onde fizer sentido.

### 2.4 Fiscalizações com `TODO: adicionar gráficos`

- `controle-interno/{prefeituras,camaras}`, `portal-transparencia/{estado,prefeituras,camaras}`, `transparencia-passiva/{estado,prefeituras,camaras}`.

### 2.5 Wiki

- `wiki/sobre/page.tsx` (hoje `<div>sobre</div>`): conteúdo de `/wiki/sobre` do site oficial dentro de `WikiLayout`.
- `wiki/novidades`: sincronizar a lista com "Últimas novidades" do site oficial (vai até 11/2026). Corrigir links mortos em `Novidades.tsx` (`/IEGM/2018/iIEGM`, `/IEGM/2015/indiceIEGM`, `/estado/2019/iege`).

## Fase 3 — Novas páginas de Município

Sidebar oficial: Visão Geral · Obrigações · Gestão Orçamentária · Gestão Fiscal · Previdência · Rankings · Prestação de Contas · Fiscalizações · Áreas temáticas · IEGM · Mais Informações.

Atualizar `BarraLateralMunicipios.tsx`, `gestao-*/routes.ts`, breadcrumbs, e criar (slugs em kebab-case, seguindo o projeto):

- **Gestão orçamentária** (`gestao-orcamentaria/`): `diretrizes-orcamentarias`, `programas-e-acoes`, `receitas`, `despesas`, `destino-do-dinheiro`, `resultado-orcamentario`. Decidir se `planejamento-governamental` vira `diretrizes-orcamentarias` + `programas-e-acoes` (site oficial não tem "planejamento governamental").
- **Gestão fiscal** (`gestao-fiscal/`): `capag`, `indice-vulnerabilidade-fiscal`, `despesas-correntes-x-receitas-correntes`, `endividamento`, `superavit-deficit`, `pessoal`, `saude`, `educacao`, `educacao-fundeb`, `alertas-lrf`. Ligar os widgets da visão geral a essas páginas, como no site oficial.
- **Previdência** (nova seção `previdencia/[[...unidadeGestora]]`, com `routes.ts` e breadcrumb de UG): `receitas`, `despesas`, `patrimonio`, `resultado-atuarial`, `projecoes-atuariais`, `plano-amortizacao`, `segurados`, `contribuicoes-previdenciarias`, `situacao-previdenciaria`. O código da UG (ex.: `077E0900001`) entra na URL.
- `(root)/rankings` (posição do município em cada ranking), `(root)/fiscalizacoes`, `(root)/iegm`, `(root)/mais-informacoes`.

## Fase 4 — Novas páginas de Estado

Atualizar `BarraLateralEstado.tsx` para: Visão Geral · Obrigações junto ao TCE-ES · Gestão Orçamentária · Gestão Fiscal · Previdência · Previdência Militares · Prestação de Contas · Fiscalizações · Áreas temáticas · IEGE.

- **Gestão orçamentária:** `receitas`, `despesas`, `despesas-por-poder`, `resultado-orcamentario`.
- **Gestão fiscal:** `despesas-correntes-x-receitas-correntes`, `resultado-primario`, `resultado-nominal`, `endividamento`, `pessoal`, `saude`, `educacao`, `educacao-fundeb`, `destinacao-fundeb`.
- **Previdência** (`previdencia/[[...unidadeGestora]]`): `receitas`, `despesas`, `patrimonio`, `projecoes-atuariais`, `resultado-atuarial`, `situacao-previdenciaria`.
- **Previdência militares** (`previdencia-militares/[[...unidadeGestora]]`): `receitas`, `despesas`, `projecoes-atuariais`, `resultado-atuarial`, `segurados`.
- `(root)/fiscalizacoes`, `(root)/iege`.

Extrair o que for comum entre Município e Estado (gráficos de previdência, gestão fiscal) para `src/components/` ou módulos compartilhados, em vez de duplicar.

## Fase 5 — Novas Áreas temáticas (maioria Power BI → `Iframe`)

Mesmo padrão de `area-tematica/saude`: `layout.tsx` + `BreadcrumbX.tsx` + `_components/BreadcrumbXPaginas.tsx` + `routes.ts` + `page.tsx` com `Iframe`.

| Nova pasta em `src/app/area-tematica/` | Páginas |
|---|---|
| `atos-de-pessoal` | `admissao`, `concessao`, `concurso-publico` |
| `contratacoes-publicas` | `contratacoes`, `instrumentos`, `atas-registro-precos`, `obras-servicos-engenharia` |
| `emendas-parlamentares` | `emendas`, `receitas`, `comparativo-receitas`, `despesas` |
| `patrimonio` | `visao-geral` |
| `previdencia` (investimentos) | `visao-geral` |
| `saneamento-basico` | `agua-esgoto`, `residuos-solidos` |
| `saude` (existente) | adicionar `plano-saude` |
| `pessoal` | `vantagens-descontos`, `afastamento`, `ingressos-desligamentos` (avaliar reaproveitar `folha-de-pagamento`) |

Também:
- Renomear rótulo "Concessões comuns e PPP" → "Desestatizações" (slug pode ficar).
- Mover "Projeções de gastos com pessoal" (`/projecao`) e "Geo-obras (legado)" (`/obras`) para o dropdown de Áreas temáticas; remover o dropdown "Inteligência artificial" se for seguir o site oficial.
- Atualizar `DropdownAreasTematicas` e `area-tematica.json` da home.

## Fase 6 — Fiscalizações e Obrigações novas

- `src/app/fiscalizacao/[ano]/`: `violencia-contra-mulheres` (2024), `crimes-contra-patrimonio` (2022), `levantamento-ods` (2025), `iege` (2019), `iegm` (2015–2023, com abas por índice). Incluir no `DropdownFiscalizacoes`.
- Obrigações: o site oficial tem "Remessas" e "Monitoramento de deliberações" sob Obrigações. Hoje o monitoramento está em `prestacao-de-conta/[ano]/[tipoEsferaAdministrativa]/monitoramento`. Adicionar o item no dropdown de Obrigações apontando para a rota existente, ou mover a rota.

## Fase 7 — Home e itens globais

- Home (`src/app/(home)`): adicionar cartões "Execução orçamentária", "Contratações públicas", "Desestatizações", "Emendas e patrimônio", "Pessoal e previdência", "Saneamento básico", "Dados abertos". Atualizar títulos e descrições conforme o site oficial.
- Nova seção "Execução orçamentária" (`/execucao-orcamentaria/{receita,despesa}`): painel por município.
- Busca "Pesquisar" no header (site oficial tem; aqui não existe).
- Banner de cookies com link para a política de privacidade (site oficial tem).

## Issues no GitHub

Cada issue tem as labels `model:haiku|sonnet|opus` (modelo a usar) e `fase:N`. Opus decide arquitetura; as issues sonnet que dependem dela só começam depois.

| # | Modelo | Fase | Issue | Depende de |
|---|---|---|---|---|
| 1 | haiku | 1 | Vitest + teste de links internos | — |
| 2 | haiku | 0 | Title por seção via metadata | — |
| 3 | opus | 2 | Rankings: arquitetura | — |
| 4 | sonnet | 2 | Rankings: demais páginas | #3 |
| 5 | sonnet | 2 | Indicadores: layout/sidebar/breadcrumb | #3 |
| 6 | sonnet | 2 | Indicadores: receita, despesa, resultado | #5 |
| 7 | sonnet | 2 | Indicadores: pessoal, educação, saúde, previdência, alertas, IEGM | #5 |
| 8 | opus | 3 | Arquitetura compartilhada Município/Estado | — |
| 9 | sonnet | 2 | Município/Estado: preencher stubs | #8 |
| 10 | sonnet | 3 | Município: Gestão orçamentária | #8 |
| 11 | sonnet | 3 | Município: Gestão fiscal | #8 |
| 12 | sonnet | 3 | Município: Previdência | #8 |
| 13 | sonnet | 3 | Município: Rankings, Fiscalizações, IEGM, Mais informações | #8, #3 |
| 14 | sonnet | 4 | Estado: Gestão orçamentária e fiscal | #8 |
| 15 | sonnet | 4 | Estado: Previdência, Militares, Fiscalizações, IEGE | #8, #12 |
| 16 | sonnet | 2 | Fiscalizações: gráficos pendentes | — |
| 17 | sonnet | 6 | Fiscalizações novas (IEGE, IEGM, violência, crimes, ODS) | — |
| 18 | haiku | 5 | Áreas temáticas Power BI | — |
| 19 | sonnet | 5 | Área temática Pessoal | — |
| 20 | haiku | 5 | Menus (Desestatizações, Projeção/Obras, Obrigações) | #18 |
| 21 | haiku | 2 | Wiki: Sobre e Novidades | — |
| 22 | haiku | 7 | Home: novos cartões | #18, #20 |
| 23 | sonnet | 7 | Execução orçamentária | — |
| 24 | opus | 7 | Busca "Pesquisar" | — |
| 25 | haiku | 7 | Banner de cookies | — |

## Ordem sugerida e critério de pronto

1. Fase 0 + Fase 1: um PR pequeno.
2. Fase 5 (iframes): alto ganho e baixo esforço.
3. Fase 2.1 e 2.2 (rankings e indicadores): componente genérico + config.
4. Fases 3 e 4 (município/estado): por subseção, um PR cada (gestão fiscal, gestão orçamentária, previdência).
5. Fases 6 e 7.

Para cada PR: `npm run lint` e `npm run build` sem erro; abrir as rotas novas no navegador e comparar com a rota equivalente do site oficial (mesmos números para o mesmo ano/município); todos os links de header, sidebar e home resolvem sem 404.
