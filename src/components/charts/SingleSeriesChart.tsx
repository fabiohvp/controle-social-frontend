"use client";
import { useCorrecaoIpca } from "@/components/buttons/ipca/useCorrecaoIpca";
import { COLOR } from "@/theme/colors";
import { FormatoValor, SerieItem } from "@/types/Serie";
import { BarChart, LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import type { EChartsCoreOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { CSSProperties } from "react";
import EChart from "./EChart";
import { getFormatadorAbreviado, getFormatadorValor } from "./chartFormatters";
import NoDataChart from "./NoDataChart";

type Props = {
  /** resposta "singleseries" da API ({ ano, nome, valor }[]) */
  dados: SerieItem[] | null;
  tipo?: "line" | "bar";
  formato?: FormatoValor;
  /** aplica a correção do IPCA pelo `ano` de cada ponto (default: true para moeda) */
  corrigirIpca?: boolean;
  /** pinta de vermelho valores negativos (barras) */
  negativoVermelho?: boolean;
  cor?: string;
  style?: CSSProperties;
};

const COMPONENTS = [
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  CanvasRenderer,
];

export default function SingleSeriesChart({
  dados,
  tipo = "line",
  formato = "moeda",
  corrigirIpca = formato === "moeda",
  negativoVermelho,
  cor = COLOR["chart-positivo"],
  style,
}: Props) {
  const corrigir = useCorrecaoIpca();

  if (!dados?.length) return <NoDataChart style={style} />;

  const formatarValor = getFormatadorValor(formato);
  const formatarAbreviado = getFormatadorAbreviado(formato);
  const valores = dados.map((item) =>
    item.valor === null
      ? null
      : corrigirIpca
        ? corrigir(item.valor, item.ano)
        : item.valor
  );

  const options: EChartsCoreOption = {
    grid: { bottom: 30, left: 60, right: 20, top: 30 },
    tooltip: {
      confine: true,
      trigger: "item",
      valueFormatter: (valor: number) => formatarValor(valor),
    },
    xAxis: {
      type: "category",
      data: dados.map((item) => item.nome ?? String(item.ano)),
    },
    yAxis: {
      type: "value",
      axisLabel: { formatter: (valor: number) => formatarAbreviado(valor) },
    },
    series: [
      {
        type: tipo,
        data: valores.map((valor) => ({
          value: valor,
          itemStyle: {
            color:
              negativoVermelho && valor !== null && valor < 0
                ? COLOR.negativo
                : cor,
          },
        })),
        itemStyle: { color: cor },
        lineStyle: { color: cor },
        label: {
          show: dados.length <= 13,
          position: "top",
          formatter: ({ value }: { value: number }) => formatarAbreviado(value),
        },
      },
    ],
  };

  return (
    <EChart
      components={COMPONENTS}
      options={options}
      style={{ height: "260px", ...style }}
    />
  );
}
