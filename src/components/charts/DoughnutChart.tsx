"use client";
import { EChart } from "@/components/charts/EChart";
import { mdc } from "@/shared/math";
import { GaugeChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { CSSProperties } from "react";

export type DoughnutChartProps = {
  items: {
    color: string;
    title: string;
    value: number;
  }[];
  selectedValue: number;
  style?: CSSProperties;
  title: string;
};

export default function DoughnutChart(props: DoughnutChartProps) {
  return (
    <EChart
      style={props.style}
      components={[
        GridComponent,
        TooltipComponent,
        LegendComponent,
        PieChart,
        GaugeChart,
        CanvasRenderer,
        LabelLayout,
      ]}
      option={{
        grid: {
          bottom: 0,
          left: 20,
          right: 20,
          top: 0,
        },
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "50%"],
            min: 0,
            max: 1,
            splitNumber: Math.min(
              100 / mdc(props.items.map((item) => item.value * 100)),
              100
            ),
            axisLine: {
              lineStyle: {
                width: 30,
                color: props.items.map((item) => [item.value, item.color]),
              },
            },
            pointer: {
              width: 5,
              itemStyle: {
                color: "black",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              fontSize: 12,
              distance: -30,
              rotate: "tangential",
              formatter: function (value) {
                for (const item of props.items) {
                  if (item.value === value) return item.title;
                }
                return "";
              },
            },
            title: {
              fontSize: 14,
              offsetCenter: [0, "40%"],
            },
            detail: {
              show: false,
            },
            data: [
              {
                name: props.title,
                value: props.selectedValue,
              },
            ],
          },
        ],
      }}
    />
  );
}
