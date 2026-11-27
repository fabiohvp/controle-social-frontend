import { formatFloat } from "@/formatters/number";
import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import {
  CampoColunaRanking,
  CoresRanking,
  FormatoRanking,
  RankingItem,
  RankingLinha,
  RankingTabelaConfig,
} from "./types";

/** Paleta do site oficial (`Cores` no bundle do painel). */
export const CORES_RANKING = {
  amareloMuitoClaro: "#FFF8B8",
  amareloMostardaPastel: "#F4B350",
  laranjaPastel: "#f4b351",
  omisso: "#f0f0f0",
  padraoNivel3: "#8aa2ad",
  padraoNivel6: "#3d4c57",
  verdePastel: "#90c695",
  verdePastelClaro: "#A7D489",
  vermelhoPastel: "#e68364",
} as const;

export const DESCRICAO_OMISSO = "não enviaram dados ou enviaram parcialmente";

/** Cores padrão: negativo em vermelho, positivo em azul-acinzentado (monetário do site oficial). */
export const CORES_RANKING_PADRAO: CoresRanking = {
  tipo: "faixas",
  faixas: [
    { ate: 0, cor: CORES_RANKING.vermelhoPastel, descricao: "Negativo" },
    { cor: CORES_RANKING.padraoNivel3, descricao: "Positivo" },
  ],
  opacidadePorPosicao: true,
};

/** Gradiente usado pelo site oficial nos rankings per capita (`sliderOptions`). */
export const CORES_RANKING_PER_CAPITA: CoresRanking = {
  tipo: "gradiente",
  corMinima: CORES_RANKING.padraoNivel3,
  corMaxima: CORES_RANKING.padraoNivel6,
};

/** Faixas "não obedecem / obedecem" de limites mínimos (saúde, educação). */
export function getCoresLimiteMinimo(limite: number): CoresRanking {
  return {
    tipo: "faixas",
    faixas: [
      { ate: limite, cor: CORES_RANKING.vermelhoPastel, descricao: "Não obedecem" },
      { cor: CORES_RANKING.verdePastel, descricao: "Obedecem" },
    ],
    exibirQuantidade: true,
  };
}

export function isOmisso(valor: number | null | undefined) {
  return valor === null || valor === undefined || valor === 1e-16;
}

export function formatValorRanking(
  valor: number | null | undefined,
  formato: FormatoRanking
) {
  if (isOmisso(valor)) return "-";

  switch (formato) {
    case "monetario":
    case "perCapita":
      return `R$ ${formatFloat(valor!)}`;
    case "percentual":
      return `${formatFloat(valor!)}%`;
    default:
      return formatFloat(valor!);
  }
}

export function getValorCampoRanking(
  item: RankingItem,
  campo: CampoColunaRanking
) {
  if (campo === "diferenca") {
    if (isOmisso(item.valorAplicado) || isOmisso(item.valorExigido)) {
      return null;
    }
    return item.valorAplicado! - item.valorExigido!;
  }
  return item[campo] ?? null;
}

/**
 * Normaliza os itens da API: ordena, resolve posição, cor e nome do município
 * usado no mapa (`municipios.json`). Omissos vão para o fim, sem posição.
 */
export function getLinhasRanking(
  itens: RankingItem[],
  config: RankingTabelaConfig,
  municipios: EsferaAdministrativa[]
): RankingLinha[] {
  const cores = config.cores ?? CORES_RANKING_PADRAO;
  const validos = itens
    .filter((item) => !isOmisso(item.valor))
    .sort((a, b) => {
      if (a.posicao > 0 && b.posicao > 0) return a.posicao - b.posicao;
      return config.ordem === "crescente"
        ? a.valor! - b.valor!
        : b.valor! - a.valor!;
    });
  const omissos = itens
    .filter((item) => isOmisso(item.valor))
    .sort((a, b) =>
      a.nomeEsferaAdministrativa.localeCompare(b.nomeEsferaAdministrativa)
    );
  const valores = validos.map((item) => item.valor!);
  const minimo = Math.min(...valores);
  const maximo = Math.max(...valores);

  const linhas = validos.map((item, index) => ({
    item,
    omisso: false,
    posicaoExibida:
      item.posicao > 0
        ? item.posicao
        : index > 0 && validos[index - 1].valor === item.valor
          ? null
          : index + 1,
    cor: getCor(item.valor!, index, validos.length, cores, minimo, maximo),
  }));
  // posições empatadas calculadas localmente herdam a anterior
  linhas.forEach((linha, index) => {
    if (linha.posicaoExibida === null) {
      linha.posicaoExibida = linhas[index - 1].posicaoExibida;
    }
  });

  return [
    ...linhas,
    ...omissos.map((item) => ({
      item,
      omisso: true,
      posicaoExibida: null,
      cor: CORES_RANKING.omisso,
    })),
  ].map(({ item, ...linha }) => {
    const municipio = municipios.find(
      (o) => o.codigo === item.codigoEsferaAdministrativa
    );
    return {
      ...item,
      ...linha,
      nomeMapa: municipio?.nome ?? item.nomeEsferaAdministrativa,
      nomeNormalizado: municipio?.nomeNormalizado ?? null,
    };
  });
}

export type LegendaRanking = { color: string; name: string; value: number };

/** Legenda no formato aceito por `MapaEsChart` (`legends`). */
export function getLegendasRanking(
  config: RankingTabelaConfig,
  linhas: RankingLinha[]
): LegendaRanking[] {
  const cores = config.cores ?? CORES_RANKING_PADRAO;
  const omissos = linhas.filter((linha) => linha.omisso).length;
  let legendas: Omit<LegendaRanking, "value">[];

  if (cores.tipo === "gradiente") {
    const valores = linhas
      .filter((linha) => !linha.omisso)
      .map((linha) => linha.valor!);
    if (!valores.length) return [];
    legendas = [
      {
        color: cores.corMinima,
        name: `Menor: ${formatValorRanking(Math.min(...valores), config.formato)}`,
      },
      {
        color: cores.corMaxima,
        name: `Maior: ${formatValorRanking(Math.max(...valores), config.formato)}`,
      },
    ];
  } else {
    legendas = cores.faixas.map((faixa) => {
      const quantidade = linhas.filter(
        (linha) => !linha.omisso && getFaixa(linha.valor!, cores.faixas) === faixa
      ).length;
      return {
        color: faixa.cor,
        name: cores.exibirQuantidade
          ? `${quantidade} ${faixa.descricao}`
          : faixa.descricao,
      };
    });
  }

  if (omissos) {
    legendas.push({
      color: CORES_RANKING.omisso,
      name: `${omissos} ${DESCRICAO_OMISSO}`,
    });
  }
  return legendas.map((legenda, value) => ({ ...legenda, value }));
}

function getFaixa(
  valor: number,
  faixas: Extract<CoresRanking, { tipo: "faixas" }>["faixas"]
) {
  return (
    faixas.find((faixa) => faixa.ate === undefined || valor < faixa.ate) ??
    faixas[faixas.length - 1]
  );
}

function getCor(
  valor: number,
  index: number,
  total: number,
  cores: CoresRanking,
  minimo: number,
  maximo: number
) {
  if (cores.tipo === "gradiente") {
    const proporcao = maximo === minimo ? 1 : (valor - minimo) / (maximo - minimo);
    return interpolateColor(cores.corMinima, cores.corMaxima, proporcao);
  }
  const cor = getFaixa(valor, cores.faixas).cor;

  if (cores.opacidadePorPosicao) {
    // mesma regra do site oficial (opacidadeMonetario), mínimo de 25%
    const opacidade = Math.max(25, 100 - Math.floor((100 * (index + 1)) / 150));
    return withAlpha(cor, opacidade / 100);
  }
  return cor;
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  const int = parseInt(full, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function withAlpha(hex: string, alpha: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function interpolateColor(inicio: string, fim: string, proporcao: number) {
  const a = hexToRgb(inicio);
  const b = hexToRgb(fim);
  const [r, g, bl] = a.map((c, i) => Math.round(c + (b[i] - c) * proporcao));
  return `rgb(${r}, ${g}, ${bl})`;
}
