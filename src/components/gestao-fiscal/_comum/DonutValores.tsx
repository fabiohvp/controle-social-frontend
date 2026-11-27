"use client";
import EChart from "@/components/charts/EChart";
import NoDataChart from "@/components/charts/NoDataChart";
import { formatFloat, formatMoneyKMB } from "@/formatters/number";
import { COLOR } from "@/theme/colors";
import { PieChart } from "echarts/charts";
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

type Props = {
  dados: { name: string; value: number }[] | null;
  /** exibe o total no centro do gráfico */
  exibirTotal?: boolean;
  cores?: string[];
};

const COMPONENTS = [
  PieChart,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
  LabelLayout,
];

const CORES_PADRAO = [
  COLOR["chart-negativo"],
  COLOR["chart-muito-positivo"],
  COLOR["chart-positivo"],
  COLOR["chart-alerta"],
  COLOR.despesa,
];

/** Donut "valor + percentual" do site oficial (CardEChartsDonut) */
export default function DonutValores({
  dados,
  exibirTotal,
  cores = CORES_PADRAO,
}: Props) {
  const itens = (dados ?? []).filter((item) => item.value > 0);
  if (!itens.length) return <NoDataChart />;

  const total = itens.reduce((soma, item) => soma + item.value, 0);

  return (
    <EChart
      components={COMPONENTS}
      style={{ height: "260px" }}
      options={{
        color: cores,
        title: exibirTotal
          ? {
              text: `R$ ${formatMoneyKMB(total)}`,
              left: "center",
              top: "40%",
              textStyle: { fontSize: 16, fontWeight: "bold" },
            }
          : undefined,
        tooltip: {
          trigger: "item",
          confine: true,
          formatter: ({ name, value, percent }: any) =>
            `${name}<br/><b>R$ ${formatFloat(value)}</b> (${formatFloat(percent)}%)`,
        },
        legend: { bottom: 0, left: "center" },
        series: [
          {
            type: "pie",
            radius: ["40%", "65%"],
            center: ["50%", "42%"],
            data: itens,
            label: {
              formatter: ({ percent }: any) => `${formatFloat(percent)}%`,
            },
            emphasis: { scaleSize: 4 },
          },
        ],
      }}
    />
  );
}
