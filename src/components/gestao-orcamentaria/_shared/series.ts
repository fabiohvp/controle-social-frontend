import { MultiSerie, SerieItem } from "@/types/Serie";

/**
 * O site oficial desliga séries na legenda por padrão (`seriesConfig.enabled`).
 * Aqui só as séries habilitadas entram no gráfico.
 */
export function filtrarSeries(
  dados: MultiSerie | null,
  config: { tipo: "line" | "bar"; habilitada: boolean }[]
): { dados: MultiSerie | null; tipos: ("line" | "bar")[] } {
  if (!dados?.series?.length) return { dados: null, tipos: [] };
  const indices = config
    .map((c, i) => (c.habilitada ? i : -1))
    .filter((i) => i >= 0 && i < dados.labels.length);
  return {
    dados: {
      labels: indices.map((i) => dados.labels[i]),
      series: dados.series.map((serie) => ({
        name: serie.name,
        values: indices.map((i) => serie.values[i]),
      })),
    },
    tipos: indices.map((i) => config[i].tipo),
  };
}

/** Variação percentual de cada ano em relação ao anterior (`useIPCAComparacaoAnual` do site oficial) */
export function getVariacaoAnual(
  dados: { ano: number; nome?: string; valor: number | null }[] | null
): SerieItem[] | null {
  if (!dados?.length) return null;
  const ordenados = [...dados].sort((a, b) => a.ano - b.ano);
  return ordenados.slice(1).map((item, indice) => {
    const anterior = ordenados[indice].valor;
    const percentual =
      anterior != null && anterior > 0 && item.valor != null && item.valor >= 0
        ? ((item.valor - anterior) / anterior) * 100
        : 0;
    return {
      ano: item.ano,
      nome: item.nome || String(item.ano),
      valor: percentual,
    };
  });
}
