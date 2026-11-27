"use client";
import { useCorrecaoIpca } from "@/components/buttons/ipca/useCorrecaoIpca";
import EChart from "@/components/charts/EChart";
import {
  getFormatadorAbreviado,
  getFormatadorValor,
} from "@/components/charts/chartFormatters";
import NoDataChart from "@/components/charts/NoDataChart";
import { COLOR } from "@/theme/colors";
import { SerieItem } from "@/types/Serie";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import type { EChartsCoreOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

type Props = {
  /** `{ nome, valor }[]` (ex.: Receita prevista, arrecadada, despesa empenhada...) */
  dados: SerieItem[] | null;
  /** ano para a correção do IPCA */
  ano: number;
  /** cor de cada barra, na ordem dos dados */
  cores?: string[];
};

const COMPONENTS = [BarChart, GridComponent, TooltipComponent, CanvasRenderer];

/** `CardEChartsBarrasHorizontais` do site oficial */
export default function BarrasHorizontaisChart({
  dados,
  ano,
  cores = [
    COLOR.receita,
    COLOR.receita,
    COLOR.despesa,
    COLOR.despesa,
    COLOR.despesa,
    COLOR.despesa,
  ],
}: Props) {
  const corrigir = useCorrecaoIpca();

  if (!dados?.length) return <NoDataChart />;

  const formatarValor = getFormatadorValor("moeda");
  const formatarAbreviado = getFormatadorAbreviado("moeda");
  const itens = [...dados].reverse();
  const coresInvertidas = [...cores].slice(0, dados.length).reverse();

  const options: EChartsCoreOption = {
    grid: { bottom: 10, left: 10, right: 60, top: 10, containLabel: true },
    tooltip: {
      confine: true,
      trigger: "item",
      valueFormatter: (valor: number) => formatarValor(valor),
    },
    xAxis: { type: "value", show: false },
    yAxis: { type: "category", data: itens.map((item) => item.nome) },
    series: [
      {
        type: "bar",
        data: itens.map((item, indice) => ({
          value: item.valor === null ? null : corrigir(item.valor, ano),
          itemStyle: { color: coresInvertidas[indice] ?? COLOR.receita },
        })),
        label: {
          show: true,
          position: "right",
          formatter: ({ value }: { value: number }) => formatarAbreviado(value),
        },
      },
    ],
  };

  return (
    <EChart
      components={COMPONENTS}
      options={options}
      style={{ height: "260px" }}
    />
  );
}
