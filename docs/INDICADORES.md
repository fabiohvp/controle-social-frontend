# Indicadores consolidados — como implementar uma página

Rota: `/indicadores-consolidados/:ano/<slug>` (site oficial: `/indicadoresConsolidados/:ano/:abaSelecionada`).
Código: `src/app/indicadores-consolidados/[ano]/`.

## O que já existe (não edite ao implementar uma página)

- `layout.tsx`: `DashboardLayout` com sidebar e breadcrumb (grupo > página > ano).
- `indicadoresConfig.ts`: **todas** as 25 páginas (`slug`, `grupo`, `titulo`, `tituloCompleto`, `abaOficial`). Sidebar e breadcrumb são gerados daqui; títulos e nomes seguem `IndicadoresBreadcrumb` do site oficial.
- `routes.ts`: `generateIndicadoresUrl`, anos válidos (2013 até o ano corrente), `getUrlMunicipioIndicador`.
- `_components/PaginaIndicador.tsx`: moldura (valida o ano, renderiza `<h1>` com o título). Sem `children` mostra "Em construção".
- `_components/TabelaMapaMunicipios.tsx`: tabela ordenável + mapa do ES (`SortableTable` + `MapaEsChart` com `getUrlMunicipio`).

## Regra de arquivos (para #6 e #7 em paralelo)

Cada página só toca `<slug>/page.tsx` e uma pasta `<slug>/_components/` (e `_api/` se precisar). Não edite config, sidebar, breadcrumb nem `routes.ts`. Se faltar algo compartilhado, avise no PR.

- #6: receita, receita-composicao, receita-destaque, despesa, despesa-composicao, despesa-destaque, despesa-corrente-x-receita-corrente, resultado-orcamentario.
- #7: pessoal, educacao, educacao-fundeb, saude, previdencia-* (4), alerta-* (8), iegm.

## Passo a passo

1. Veja no site oficial o componente da aba (`abaOficial` no config), ex.: `IndicadorReceita` em `oficial.pretty.js`: endpoints, parâmetros e colunas.
2. Troque o `page.tsx` do stub:

```tsx
import PaginaIndicador, { getMetadataIndicador } from "../_components/PaginaIndicador";
import { IndicadoresPageProps } from "../routes";
import TabelaReceita from "./_components/TabelaReceita"; // seu componente

export const metadata = getMetadataIndicador("receita");

export default function Page({ params }: { params: Promise<IndicadoresPageProps> }) {
  return (
    <PaginaIndicador params={params} slug="receita">
      <Conteudo params={params} />
    </PaginaIndicador>
  );
}

async function Conteudo({ params }: { params: Promise<IndicadoresPageProps> }) {
  const { ano } = await params;
  const dados = await getDados(ano); // fetch com cache, a partir de ENV.apiUrl
  return <TabelaReceita ano={ano} dados={dados} />;
}
```

3. Busque dados em Server Components (`${ENV.apiUrl}/<Controller>/<Acao>?anoExercicio=${ano}`), com `cache()` como os widgets de `municipio/`. Trate falha da API com `AlertPanel type="danger"` (veja `rankings/[ano]/_components/PaginaRanking.tsx`).
4. Tabela + mapa por município: o componente precisa ser `"use client"` (colunas têm funções). Use `TabelaMapaMunicipios` ou, para rankings por faixa, `src/components/ranking/RankingTabela.tsx`. Cores/legendas do mapa: `src/components/ranking/rankingUtils.ts`. Nome do município no mapa: `useGlobalState().municipios`.
5. Previdência (4 páginas) tem seletor de unidade gestora no site oficial (IPAM / Fundo Financeiro / Fundo Previdenciário); implemente dentro da página.
6. Verifique: `npx eslint <seus arquivos>`, `npm run build`, `curl` 200 na rota e confira 1–2 valores contra a API oficial.
