"use client";
import EChart, { LabelFormatter } from "@/components/charts/EChart";
import { PieChart } from "echarts/charts";
import {
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { TooltipFormatterCallback } from "echarts/types/dist/shared";
import { CSSProperties } from "react";

export type DoughnutChartItem = {
  name: string;
  value: number;
  extra?: any;
};

export type DoughnutChartProps = {
  colors: string[];
  label?: LabelFormatter;
  legend?: LegendComponentOption;
  items: DoughnutChartItem[];
  position?: {
    left: string;
    top: string;
  };
  tooltip?: {
    formatter: string | TooltipFormatterCallback<any>;
  };
  style?: CSSProperties;
};

export default function DoughnutChart({
  tooltip,
  ...props
}: DoughnutChartProps) {
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
          formatter: tooltip?.formatter ?? "{b0}: <b>{c0}%</b>",
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
              disabled: true,
            },
            label: {
              fontSize: 24,
              fontWeight: "bold",
              formatter: "{c}%",
              position: "center",
              ...props.label,
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
