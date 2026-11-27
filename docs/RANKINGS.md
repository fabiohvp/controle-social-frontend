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
| `cores` | `{ tipo: "faixas", faixas: [{ ate, cor, descricao }], exibirQuantidade?, opacidadePorPosicao? }`, `{ tipo: "gradiente", corMinima, corMaxima }` ou `{ tipo: "limiteDoItem", corAbaixo, corAcima, descricaoAbaixo, descricaoAcima }` (limite próprio de cada item em `valorExigido`, ex.: art. 29-A). Helpers: `getCoresLimiteMinimo(15)`, `getCoresLimitePessoal(alerta, prudencial, maximo)`, `CORES_RANKING_PER_CAPITA`, `CORES_RANKING_RESULTADO` (negativo/positivo com contagem), paleta `CORES_RANKING` (`src/components/ranking/rankingUtils.ts`). Faixa: entra na primeira com `valor < ate`; a última fica sem `ate`. |
| `adaptador` | Converte respostas que não são `RankingItem[]` (hoje só `"artigo29A"`, em `_api/getRanking.ts`). |
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

### Endpoints fora de `RankingsControllers`

`endpoint` é relativo a `RankingsControllers/`. Se começar com `MunicipioControllers/`
é usado como está (`getRanking` só troca o prefixo) e aceita query extra, sempre antes
do `anoExercicio` que é acrescentado. Usados por:

| Ranking | Endpoint |
| --- | --- |
| `gestao-fiscal/superavit-e-deficit-financeiro` | `MunicipioControllers/BalancoPatrimonial/GetValorDeficitSuperavitRanking` |
| `gestao-fiscal/balanco-patrimonial-rpps` | `.../BalancoPatrimonial/GetValorDeficitSuperavitRPPS` (só municípios com RPPS) |
| `gestao-fiscal/balanco-patrimonial-exceto-rpps` | `.../BalancoPatrimonial/GetValorDeficitSuperavitExcetoRPPS` |
| `gestao-fiscal/balanco-patrimonial-x-rcl` | `.../BalancoPatrimonial/GetValorDeficitSuperavitXRclRanking` |
| `gestao-fiscal/despesa-corrente-x-receita-corrente` | `MunicipioControllers/LimiteDespesaReceita/GetRankingLimiteDespesaReceita` |
| `despesa/poder-legislativo` | `MunicipioControllers/PoderLegislativo/GetRankingDespesaLegislativoArtigo29A?idEsferaAdministrativa=null` + `adaptador: "artigo29A"` |

O art. 29-A devolve só `Populacao` e `DespesaPercentualMesEnvioObrigatorio` por id de
município; o adaptador gera `valor` (despesa, % da receita), `valorExigido` (limite 3,5% a
7% conforme a população) e usa `cores: { tipo: "limiteDoItem" }`. Diferente do site
oficial, que separa um gráfico por faixa de população, aqui há uma tabela única.

### Limites legais usados nas faixas

Vêm de `Settings/GetAll` (`limites`) e estão fixos na config: saúde 15%, educação 25%,
magistério do FUNDEB 70% (60% antes de 2021), pessoal executivo 48,6/51,3/54%, legislativo
5,4/5,7/6%, consolidado 54/57/60%, despesa x receita corrente 85/95%, endividamento 108/120%.
Se a API mudar esses valores, atualize as constantes no topo de `rankingsConfig.ts`.

### Fora do escopo (rankings oficiais sem página aqui)

- CAPAG (4), IVF (5), Situação Previdenciária e Cumprimento de deliberações: controllers
  próprios e escala de notas/letras, não cabem em `RankingItem[]` + faixas.
- Previdência (6): `RankingsControllers/Previdencia/*` usa `anoSelecionado` e devolve uma
  linha por unidade gestora (vários por município); só `GetRankigsAporteFinanceiroXRclAjustada`
  responde com dados.
- Educação VAAT (6, `Educacao/GetRankingVAAT`): resposta é um objeto com 6 listas e todas
  vêm sem valor em todos os anos (2021 a 2025).

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
