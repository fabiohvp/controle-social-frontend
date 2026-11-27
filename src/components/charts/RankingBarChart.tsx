"use client";
import EChart from "@/components/charts/EChart";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import type { EChartsCoreOption, EChartsType } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useRouter } from "next/navigation";

export type RankingBarChartItem = {
  color: string;
  label: string;
  link?: string;
  value: number;
};

type Props = {
  items: RankingBarChartItem[];
  labelWidth?: number;
  maxValue?: number;
  rowHeight?: number;
  unit?: string;
};

export default function RankingBarChart({
  items,
  labelWidth = 230,
  maxValue = 100,
  rowHeight = 22,
  unit = "%",
}: Props) {
  const { push } = useRouter();

  const options = {
    grid: { bottom: 5, left: labelWidth, right: 60, top: 5 },
    tooltip: {
      axisPointer: { type: "shadow" },
      formatter: (d: any) => `${d.name}: <b>${formatNumber(d.value)}${unit}</b>`,
      trigger: "item",
    },
    xAxis: {
      max: maxValue,
      min: 0,
      splitLine: { show: false },
      type: "value",
      show: false,
    },
    yAxis: {
      axisLabel: {
        overflow: "truncate",
        width: labelWidth - 10,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      data: items.map((o) => o.label),
      inverse: true,
      type: "category",
    },
    series: [
      {
        barCategoryGap: "20%",
        data: items.map((o) => ({
          itemStyle: { color: o.color },
          link: o.link,
          name: o.label,
          value: o.value,
        })),
        label: {
          formatter: (d: any) => `${formatNumber(d.value)}${unit}`,
          position: "right",
          show: true,
        },
        type: "bar",
      },
    ],
  } as EChartsCoreOption;

  function onInit(chart: EChartsType) {
    chart.on("click", (params: any) => {
      const link = params?.data?.link;
      if (link) {
        push(link);
      }
    });
  }

  return (
    <EChart
      components={[BarChart, CanvasRenderer, GridComponent, TooltipComponent]}
      onInit={onInit}
      options={options}
      style={{ height: `${items.length * rowHeight + 10}px` }}
    />
  );
}

function formatNumber(value: number) {
  return value.toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}
