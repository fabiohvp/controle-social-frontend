"use client";
import EChart from "@/components/charts/EChart";
import { formatInt } from "@/formatters/number";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { FolhaChartItem } from "./FolhaDonutChart";

type Props = {
  items: FolhaChartItem[];
};

const COLORS = ["#2a333b", "#3d4c57", "#636f78", "#607d8b", "#8aa2ad", "#c5d7e0"];

export default function FolhaBarChart({ items }: Props) {
  // eixo Y de baixo para cima: inverte para o maior valor ficar no topo
  const ordered = [...items].reverse();

  return (
    <EChart
      components={[TooltipComponent, GridComponent, BarChart, CanvasRenderer]}
      options={{
        grid: { bottom: 8, containLabel: true, left: 8, right: 24, top: 8 },
        series: [
          {
            data: ordered.map((item, index) => ({
              itemStyle: { color: COLORS[ordered.length - 1 - index] ?? COLORS[0] },
              value: item.value,
            })),
            label: {
              formatter: (p: { value: number }) => formatInt(p.value),
              position: "right",
              show: true,
            },
            type: "bar",
          },
        ],
        tooltip: {
          formatter: (p: { name: string; value: number }) =>
            `${p.name}<br/><b>${formatInt(p.value)}</b> vínculos`,
          trigger: "item",
        },
        xAxis: { show: false, type: "value" },
        yAxis: {
          axisTick: { show: false },
          data: ordered.map((item) => item.name),
          type: "category",
        },
      }}
      style={{ height: "300px" }}
    />
  );
}
