"use client";
import EChart from "@/components/charts/EChart";
import { mdc } from "@/shared/math";
import { GaugeChart as EGaugeChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { CSSProperties } from "react";

export type GaugeChartProps = {
  items: {
    color: string;
    name: string;
    value: number;
  }[];
  selectedValue: number;
  style?: CSSProperties;
  title: string;
};

/** posições (0..1) dos pontos de corte em milésimos, para achar o passo dos rótulos */
function calcularDivisoes(values: number[]) {
  const pontos = [...values, 1].map((v) => Math.round(v * 1000)).filter((v) => v > 0);
  const divisor = mdc(pontos) || 1;
  return Math.min(1000 / divisor, 1000);
}

export default function GaugeChart(props: GaugeChartProps) {
  return (
    <EChart
      style={props.style}
      components={[
        GridComponent,
        TooltipComponent,
        LegendComponent,
        PieChart,
        EGaugeChart,
        CanvasRenderer,
        LabelLayout,
      ]}
      options={{
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
            splitNumber: calcularDivisoes(props.items.map((item) => item.value)),
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
              formatter: function (value: any) {
                for (const item of props.items) {
                  if (Math.abs(item.value - value) < 0.0006) return item.name;
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
