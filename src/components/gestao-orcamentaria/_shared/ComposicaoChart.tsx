"use client";
import { useCorrecaoIpca } from "@/components/buttons/ipca/useCorrecaoIpca";
import EChart from "@/components/charts/EChart";
import NoDataChart from "@/components/charts/NoDataChart";
import { formatFloat } from "@/formatters/number";
import { COLOR } from "@/theme/colors";
import { PieChart } from "echarts/charts";
import { LegendComponent, TooltipComponent } from "echarts/components";
import type { EChartsCoreOption } from "echarts/core";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

type Props = {
  /** `{ name, value }[]` com valores monetários */
  dados: { name: string; value: number }[] | null;
  ano: number;
};

const COMPONENTS = [
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
];

const CORES = [
  COLOR["chart-positivo"],
  COLOR.despesa,
  COLOR["chart-alerta"],
  COLOR["chart-muito-positivo"],
  COLOR["chart-negativo"],
  COLOR["chart-info"],
];

/** `CardEChartsDonut` do site oficial: percentual no gráfico e valor no tooltip */
export default function ComposicaoChart({ dados, ano }: Props) {
  const corrigir = useCorrecaoIpca();

  if (!dados?.length) return <NoDataChart />;

  const itens = dados.map((item) => ({
    name: item.name,
    value: corrigir(item.value, ano),
  }));

  const options: EChartsCoreOption = {
    color: CORES,
    tooltip: {
      trigger: "item",
      confine: true,
      formatter: ({
        marker,
        name,
        value,
        percent,
      }: {
        marker: string;
        name: string;
        value: number;
        percent: number;
      }) =>
        `${marker}${name}<br/><b>${formatFloat(percent)}%</b> (R$ ${formatFloat(value)})`,
    },
    legend: { bottom: 0, left: 0, orient: "vertical" },
    series: [
      {
        type: "pie",
        radius: ["40%", "65%"],
        center: ["65%", "40%"],
        data: itens,
        emphasis: { disabled: true },
        label: { show: false },
        labelLine: { show: false },
      },
    ],
  };

  return (
    <EChart
      components={COMPONENTS}
      options={options}
      style={{ height: "280px" }}
    />
  );
}
