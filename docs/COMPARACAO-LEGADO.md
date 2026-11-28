# Comparação com o site oficial (legado) — 28/11/2026

Varredura automática de `paineldecontrole.tcees.tc.br` (262 páginas, ano 2025, município Vitória) contra este repositório rodando localmente (284 páginas). Scripts em `scripts/comparar-legado/` (Playwright; o deploy da Vercel bloqueia navegador headless, por isso a comparação usa `next start` local). Relatório completo por página: `COMPARACAO-LEGADO-DETALHADO.md`.

Como rodar:

```
cd scripts/comparar-legado
npm i playwright-core
node crawl.js legacy legacy.json 500
NOVO_BASE=http://localhost:3000 node crawl.js novo novo.json 500
LEG=legacy.json node compare.js > relatorio.md
```

O extrator lê as opções reais dos gráficos (FusionCharts `getJSONData()` e ECharts via props React `option`/`options`), então compara séries e cores, não pixels.

## Corrigido nesta rodada

- **Visão geral do município**: medidores no formato do legado (valor + 👍/👎, escala e frase "Obedeceu o limite…"); adicionados *Fundeb - Profissionais Educação Básica* e *Dívida Consolidada Líquida* (antes era cópia do card de despesas correntes); cor invertida em Educação; limites errados no Pessoal - Legislativo; "Dados acumulados até <MÊS>"; ordem dos cards igual ao legado.
- **Visão geral do Estado**: usava `MunicipioControllers` com código `001`; agora `EstadoControllers` (id 81). Adicionados Judiciário, Assembleia, Ministério Público, Tribunal de Contas, Desp. x receitas correntes e DCL (10 medidores, como o legado).
- **Gestão fiscal do Estado**: cartões de limite (barra) viraram medidores iguais ao legado; textos "Obedeceu…/Tende a obedecer…"; "Dados acumulados até" também na gestão fiscal do município.
- **Indicadores Consolidados**: as 34 páginas eram placeholder "Em construção". Agora têm as tabelas dos 78 municípios com os mesmos endpoints, colunas, barras proporcionais e ícones do legado (`_components/tabelasIndicadores.ts`).
- **Cores**: barras negativas `#F28B82` (era `#C0392B`); donuts de composição do Estado e de folha com a paleta PadraoRange; séries de despesa/receita corrente `#8AA2AD`/`#607D8B`; resultado primário/nominal e endividamento do Estado; "Situação da remessa"; liquidez CAPAG; IVF anual; Receitas X Despesas da previdência.

## Pendências (maiores lacunas)

| Área | Situação no novo |
|---|---|
| Rankings (todas) | falta o 2º gráfico (legado tem 2, novo 1) |
| Previdência › Segurados (município) | 0 de 9 gráficos |
| Previdência › Resultado atuarial (Estado/militares/município) | 0–2 de 5–7 gráficos |
| Previdência › Patrimônio (Estado) | 2 de 8 gráficos |
| Previdência › Projeções atuariais | faltam 3–4 gráficos |
| Fiscalizações › Controle interno / Transparência passiva / Portal | 0–2 de 3 gráficos |
| Fiscalizações › IEGM / IEGE | sem gráficos nem textos do índice |
| Município › IEGM, Mais informações, Fiscalizações, Prestação de contas, Obrigações | páginas-hub; faltam tabelas/listas do legado |
| Estado › Fiscalizações, Obrigações, Prestação de contas | idem |
| Gestão fiscal › IVF (município) | 5 de 10 gráficos |
| Gestão fiscal › Superávit/déficit, CAPAG, Metas | textos/gráficos parciais |
| Áreas temáticas › Desestatizações (visão geral) | 4 de 13 gráficos |
| Áreas temáticas › Educação › Inativos/Profissionais | sem gráficos/cards |
| Folha › Beneficiários | 6 de 9 gráficos |
| Áreas temáticas (várias) | faltam textos introdutórios/notas do legado |
| Saúde › Visão geral | 404 (legado: Power BI) |
| Comparador, Unidade gestora, Parecer prévio, Julgamento | textos/tabelas parciais |

Divergência conhecida e intencional: o legado mostra decimais com ponto em algumas tabelas (ex.: `37.1%`); o novo usa vírgula (pt-BR).
