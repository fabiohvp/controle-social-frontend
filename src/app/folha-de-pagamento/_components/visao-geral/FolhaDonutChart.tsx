"use client";
import EChart from "@/components/charts/EChart";
import { formatFloat, formatInt } from "@/formatters/number";
import { COLOR } from "@/theme/colors";
import { PieChart } from "echarts/charts";
import { LegendComponent, TooltipComponent } from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

export type FolhaChartItem = {
  name: string;
  value: number;
};

type Props = {
  colors?: string[];
  items: FolhaChartItem[];
  tipo: "inteiro" | "moeda";
};

// paleta PadraoRange do site oficial (do mais claro para o mais escuro)
const DEFAULT_COLORS = COLOR.padraoRange;

export function formatValor(value: number, tipo: Props["tipo"]) {
  return tipo === "moeda" ? `R$ ${formatFloat(value)}` : formatInt(value);
}

export default function FolhaDonutChart({ colors, items, tipo }: Props) {
  return (
    <EChart
      components={[TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]}
      options={{
        color: colors ?? DEFAULT_COLORS,
        legend: { bottom: 0, left: "center", type: "scroll" },
        series: [
          {
            avoidLabelOverlap: true,
            center: ["50%", "42%"],
            data: items,
            label: { show: false },
            labelLine: { show: false },
            radius: ["40%", "70%"],
            type: "pie",
          },
        ],
        tooltip: {
          formatter: (p: { name: string; value: number; percent: number }) =>
            `${p.name}<br/><b>${formatValor(p.value, tipo)}</b> (${p.percent}%)`,
          trigger: "item",
        },
      }}
      style={{ height: "300px" }}
    />
  );
}
