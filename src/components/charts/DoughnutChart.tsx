"use client";
import EChart from "@/components/charts/EChart";
import { PieChart } from "echarts/charts";
import {
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { CSSProperties } from "react";

export type DoughnutChartProps = {
  colors: string[];
  legend?: LegendComponentOption;
  items: {
    name: string;
    value: number;
  }[];
  position?: {
    left: string;
    top: string;
  };
  style?: CSSProperties;
};

export default function DoughnutChart(props: DoughnutChartProps) {
  return (
    <EChart
      style={props.style}
      components={[
        TooltipComponent,
        LegendComponent,
        PieChart,
        CanvasRenderer,
        LabelLayout,
      ]}
      options={{
        color: props.colors,
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: 0,
          left: 0,
          orient: "vertical",
          ...props.legend,
        } as any,
        series: [
          {
            center: props.position
              ? [props.position.left, props.position.top]
              : ["50%", "50%"],
            data: props.items,
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            radius: ["40%", "70%"],
            type: "pie",
          },
        ],
      }}
    />
  );
}
