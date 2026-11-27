"use client";
import EChart from "@/components/charts/EChart";
import { formatFloat, formatInt } from "@/formatters/number";
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

const DEFAULT_COLORS = [
  "#2a333b",
  "#3d4c57",
  "#607d8b",
  "#8aa2ad",
  "#c5d7e0",
  "#F4B351",
];

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
