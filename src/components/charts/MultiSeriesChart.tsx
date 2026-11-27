"use client";
import { useCorrecaoIpca } from "@/components/buttons/ipca/useCorrecaoIpca";
import { COLOR } from "@/theme/colors";
import { FormatoValor, MultiSerie } from "@/types/Serie";
import { BarChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import type { EChartsCoreOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { CSSProperties } from "react";
import EChart from "./EChart";
import { getFormatadorAbreviado, getFormatadorValor } from "./chartFormatters";
import NoDataChart from "./NoDataChart";

type Props = {
  /** resposta "multiseries" da API ({ labels, series: [{ name, values }] }) */
  dados: MultiSerie | null;
  /** tipo de cada série (índice de `labels`); default: todas "bar" */
  tipos?: ("line" | "bar")[];
  cores?: string[];
  formato?: FormatoValor;
  /**
   * Correção do IPCA: "categoria" usa `series[i].name` como ano (evolução
   * anual); um número usa esse ano para todos os pontos (evolução mensal);
   * false desliga. Default: "categoria" para moeda.
   */
  corrigirIpca?: "categoria" | number | false;
  style?: CSSProperties;
};

const COMPONENTS = [
  BarChart,
  LineChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  CanvasRenderer,
];

const CORES_PADRAO = [
  COLOR["chart-positivo"],
  COLOR.despesa,
  COLOR["chart-alerta"],
  COLOR["chart-muito-positivo"],
  COLOR["chart-negativo"],
  COLOR.padraoNivel2,
  COLOR.padraoNivel6,
];

export default function MultiSeriesChart({
  dados,
  tipos,
  cores = CORES_PADRAO,
  formato = "moeda",
  corrigirIpca = formato === "moeda" ? "categoria" : false,
  style,
}: Props) {
  const corrigir = useCorrecaoIpca();

  if (!dados?.series?.length) return <NoDataChart style={style} />;

  const formatarValor = getFormatadorValor(formato);
  const formatarAbreviado = getFormatadorAbreviado(formato);
  const getAno = (categoria: string) =>
    corrigirIpca === "categoria" ? Number(categoria) : Number(corrigirIpca);

  const options: EChartsCoreOption = {
    color: cores,
    grid: { bottom: 30, left: 60, right: 20, top: 40 },
    legend: { top: 0 },
    tooltip: {
      confine: true,
      trigger: "axis",
      valueFormatter: (valor: number) => formatarValor(valor),
    },
    xAxis: { type: "category", data: dados.series.map((serie) => serie.name) },
    yAxis: {
      type: "value",
      axisLabel: { formatter: (valor: number) => formatarAbreviado(valor) },
    },
    series: dados.labels.map((label, indice) => ({
      name: label,
      type: tipos?.[indice] ?? "bar",
      data: dados.series.map((serie) => {
        const valor = serie.values[indice];
        if (valor === null || valor === undefined) return null;
        const ano = getAno(serie.name);
        return corrigirIpca !== false && !Number.isNaN(ano)
          ? corrigir(valor, ano)
          : valor;
      }),
    })),
  };

  return (
    <EChart
      components={COMPONENTS}
      options={options}
      style={{ height: "280px", ...style }}
    />
  );
}
