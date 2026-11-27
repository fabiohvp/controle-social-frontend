# Rankings: como adicionar um ranking

Rota: `/rankings/:ano/:categoria/:slug` (ex.: `/rankings/2024/receita/arrecadada`).
Layout, sidebar, breadcrumb (categoria > ranking > ano), tabela ordenável e mapa já são
genéricos. Um ranking novo é **uma entrada de config + um `page.tsx` de 3 linhas**.

## 1. Descobrir o endpoint

No bundle oficial (`oficial.pretty.js`), procure o serviço da categoria
(`api/RankingsControllers/<Categoria>/${modulo}`) e o componente do submenu
(ex.: `function Arrecadadas`, `function LimiteConstitucional`). Anote:

- método (`GetRankingReceitaArrecadada`), texto do `AlertaPagina` (título e descrição);
- componente usado: `RankingPadraoMonetario` (monetário) ou `RankingPadraoPercentual` (percentual);
- `sliderOptions` → gradiente; `legenda: !0` → faixas com quantidade; tooltip com
  `valorAplicado`/`valorExigido` → colunas extras.

Confira o formato: `curl -s "https://paineldecontrole.tcees.tc.br/api/RankingsControllers/Receita/GetRankingReceitaArrecadada?anoExercicio=2024"`.
Todos devolvem `RankingItem[]` (`src/components/ranking/types.ts`).

## 2. Adicionar a entrada em `src/app/rankings/[ano]/rankingsConfig.ts`

```ts
{
  categoria: "receita",                 // pasta em src/app/rankings/[ano]/
  slug: "arrecadada-per-capita",        // pasta da rota
  titulo: "Arrecadadas per capita",     // menu/breadcrumb
  tituloCompleto: "Receitas Arrecadadas per capita",
  descricao: "Receita total arrecadada pelo município dividida pelo número de seus habitantes.",
  endpoint: "Receita/GetRankingReceitaArrecadadaPerCapita",
  formato: "perCapita",                 // "monetario" | "perCapita" | "percentual" | "numero"
  cores: CORES_RANKING_PER_CAPITA,      // opcional; padrão = negativo/positivo com opacidade por posição
  chaveRankingMunicipio: "receita.receitaArrecadadaPerCapita", // opcional (usado por #13)
}
```

Campos opcionais (ver o tipo `RankingConfig`):

| Campo | Uso |
| --- | --- |
| `cores` | `{ tipo: "faixas", faixas: [{ ate, cor, descricao }], exibirQuantidade?, opacidadePorPosicao? }` ou `{ tipo: "gradiente", corMinima, corMaxima }`. Helpers: `getCoresLimiteMinimo(15)`, `CORES_RANKING_PER_CAPITA`, paleta `CORES_RANKING` (`src/components/ranking/rankingUtils.ts`). Faixa: entra na primeira com `valor < ate`; a última fica sem `ate`. |
| `colunasExtras` | `[{ campo: "valorAplicado" \| "valorExigido" \| "diferenca", titulo, formato }]` |
| `observacao` | 2º parágrafo do alerta (ex.: "Quanto mais alta for a posição...") |
| `tendenciaQuandoParcial` | acrescenta " - Tendência" ao título quando o ano não fechou |
| `tituloValor` | cabeçalho da coluna de valor (padrão "Valor") |
| `paginaMunicipio` | página aberta ao clicar no município (padrão `visao-geral`) |
| `ordem` | `"crescente"` só se a API não trouxer `posicao` e menor for melhor |
| `submenuOficial` | nome do submenu no site oficial, só referência |

A config deve conter apenas dados serializáveis (ela vai para um Client Component).
Categoria nova: acrescente em `CategoriaRankingSlug`/`CATEGORIAS_RANKING` e um ícone em
`_components/BarraLateralRankings.tsx`.

## 3. Página

`src/app/rankings/[ano]/<categoria>/<slug>/page.tsx`:

```tsx
import PaginaRanking, { getMetadataRanking } from "../../_components/PaginaRanking";
import { RankingsPageProps } from "../../routes";

const RANKING = "receita/arrecadada-per-capita";

export const metadata = getMetadataRanking(RANKING);

export default function Page(props: { params: Promise<RankingsPageProps> }) {
  return <PaginaRanking {...props} ranking={RANKING} />;
}
```

Sidebar e breadcrumb passam a mostrar o ranking automaticamente (só exibem categorias
com ao menos um ranking configurado).

## Reuso fora de `/rankings`

- Lista iterável: `RANKINGS`, `getRankingsPorCategoria`, `getCategoriasComRankings`,
  `getRankingConfig("categoria/slug")`, `getChaveRanking(config)`.
- Dados: `getRanking({ ano, endpoint })` em `src/app/rankings/[ano]/_api/getRanking.ts`.
- Posição de um município em todos os rankings: o site oficial usa
  `MunicipioControllers/Ranking/GetRanking?anoExercicio=&idEsferaAdministrativa=`;
  `chaveRankingMunicipio` aponta o campo da resposta.
- UI: `RankingTabela` (`src/components/ranking/RankingTabela.tsx`, tabela + mapa a partir
  de `RankingItem[]` + `RankingTabelaConfig`) e `SortableTable`
  (`src/components/tables/SortableTable.tsx`, tabela ordenável genérica).
