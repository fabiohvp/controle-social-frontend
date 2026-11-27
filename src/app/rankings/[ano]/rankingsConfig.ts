import { getCoresLimiteMinimo } from "@/components/ranking/rankingUtils";
import { RankingTabelaConfig } from "@/components/ranking/types";

/** Slugs das pastas em `src/app/rankings/[ano]/<categoria>/`. */
export type CategoriaRankingSlug =
  | "despesa"
  | "educacao"
  | "gestao-fiscal"
  | "pessoal"
  | "receita"
  | "resultado"
  | "saude";

export type CategoriaRanking = {
  slug: CategoriaRankingSlug;
  titulo: string;
};

/** Ordem do sidebar/breadcrumb (mesma do site oficial). */
export const CATEGORIAS_RANKING: CategoriaRanking[] = [
  { slug: "receita", titulo: "Receitas" },
  { slug: "despesa", titulo: "Despesas" },
  { slug: "resultado", titulo: "Resultado" },
  { slug: "gestao-fiscal", titulo: "Gestão Fiscal" },
  { slug: "saude", titulo: "Saúde" },
  { slug: "educacao", titulo: "Educação" },
  { slug: "pessoal", titulo: "Pessoal" },
];

/**
 * Um ranking = uma entrada aqui + um `page.tsx` de 3 linhas na pasta
 * `<categoria>/<slug>/` (ver `docs/RANKINGS.md`). Só dados serializáveis.
 */
export type RankingConfig = RankingTabelaConfig & {
  categoria: CategoriaRankingSlug;
  /** Pasta da rota (kebab-case): `/rankings/:ano/<categoria>/<slug>`. */
  slug: string;
  /** Nome curto do menu/breadcrumb (ex.: "Arrecadadas"). */
  titulo: string;
  /** Título do alerta, do painel e da aba do navegador. */
  tituloCompleto: string;
  /** Texto explicativo exibido no alerta do topo. */
  descricao: string;
  /** Texto extra (ex.: "Quanto mais alta for a posição..."). */
  observacao?: string;
  /** `<Controller>/<Acao>` em `RankingsControllers`; chamado com `?anoExercicio=`. */
  endpoint: string;
  /** Acrescenta " - Tendência" ao título quando os dados ainda não fecharam o ano. */
  tendenciaQuandoParcial?: boolean;
  /**
   * Caminho do mesmo ranking na resposta de
   * `MunicipioControllers/Ranking/GetRanking?anoExercicio=&idEsferaAdministrativa=`
   * (posição de um município em todos os rankings), ex.: `receita.receitaArrecadada`.
   */
  chaveRankingMunicipio?: string;
  /** Nome do submenu no site oficial (`/rankings/:ano/:aba/:submenu`), para referência. */
  submenuOficial?: string;
};

export const RANKINGS: RankingConfig[] = [
  {
    categoria: "receita",
    slug: "arrecadada",
    titulo: "Arrecadadas",
    tituloCompleto: "Receitas Arrecadadas",
    descricao:
      "Total de impostos, taxas, contribuições, transferências e outras fontes de recursos arrecadados pelo município e usadas para custear as despesas públicas e as necessidades de investimentos.",
    endpoint: "Receita/GetRankingReceitaArrecadada",
    formato: "monetario",
    tituloValor: "Receita arrecadada",
    chaveRankingMunicipio: "receita.receitaArrecadada",
    submenuOficial: "receitaArrecadada",
  },
  {
    categoria: "saude",
    slug: "limite-constitucional",
    titulo: "Limite constitucional",
    tituloCompleto: "Aplicação em Saúde - Limite Constitucional Mínimo",
    descricao:
      "A Constituição estabelece que os municípios devem aplicar 15%, no mínimo, da receita resultante de impostos, compreendida a proveniente de transferências, em ações e serviços públicos de saúde.",
    observacao:
      "Quanto mais alta for a posição no ranking maior é o comprometimento da receita do município em ações e serviços públicos de Saúde.",
    endpoint: "Saude/GetRankingSaudePorPercentual",
    formato: "percentual",
    tituloValor: "Aplicação",
    cores: getCoresLimiteMinimo(15),
    tendenciaQuandoParcial: true,
    chaveRankingMunicipio: "saude.saudePorPercentual",
    submenuOficial: "saudePorPercentual",
  },
];

// Exemplos de outras opções (para as próximas entradas):
// - per capita: formato: "perCapita", cores: CORES_RANKING_PER_CAPITA
// - aplicado x exigido: colunasExtras: [{ campo: "valorAplicado", titulo: "Aplicado", formato: "monetario" }, { campo: "valorExigido", ... }, { campo: "diferenca", ... }]
// - faixas próprias: cores: { tipo: "faixas", faixas: [{ ate: 48.6, cor: CORES_RANKING.verdePastelClaro, descricao: "..." }, ...], exibirQuantidade: true }

export function getChaveRanking(config: Pick<RankingConfig, "categoria" | "slug">) {
  return `${config.categoria}/${config.slug}`;
}

/** Busca pela chave `categoria/slug` (ex.: `receita/arrecadada`). */
export function getRankingConfig(chave: string) {
  return RANKINGS.find((ranking) => getChaveRanking(ranking) === chave);
}

export function getRankingsPorCategoria(categoria: string) {
  return RANKINGS.filter((ranking) => ranking.categoria === categoria);
}

/** Categorias que têm ao menos um ranking configurado, com seus rankings. */
export function getCategoriasComRankings() {
  return CATEGORIAS_RANKING.map((categoria) => ({
    ...categoria,
    rankings: getRankingsPorCategoria(categoria.slug),
  })).filter((categoria) => categoria.rankings.length > 0);
}
