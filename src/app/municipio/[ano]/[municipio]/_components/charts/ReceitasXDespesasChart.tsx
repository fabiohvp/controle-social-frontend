"use client";
import { EChart } from "@/components/charts/EChart";
import { formatCurrency } from "@/formatters/number";
import { COLOR } from "@/theme/colors";
import { BarChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

type Props = {
  despesa: {
    empenhada: number;
    previsaoInicial: number;
    liquidada: number;
    paga: number;
  };
  receita: {
    arrecadada: number;
    previsaoInicial: number;
  };
};

export default function ReceitasXDespesasChart(props: Props) {
  return (
    <EChart
      style={{ height: "130px" }}
      components={[
        DatasetComponent,
        GridComponent,
        VisualMapComponent,
        BarChart,
        CanvasRenderer,
      ]}
      option={{
        grid: {
          bottom: 0,
          left: 120,
          right: 20,
          top: 10,
        },
        yAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          type: "category",
          data: [
            "Receita prevista",
            "Receita arrecadada",
            "Despesa prevista",
            "Despesa liquidada",
          ].reverse(),
        },
        xAxis: {
          splitLine: { show: false },
          type: "value",
        },
        series: [
          {
            label: {
              formatter: (d: any) => formatCurrency(d.value),
              position: "right",
              show: true,
              valueAnimation: true,
            },
            data: [
              {
                value: props.receita.previsaoInicial,
                itemStyle: {
                  color: COLOR.receita,
                },
              },
              {
                value: props.receita.arrecadada,
                itemStyle: {
                  color: COLOR.receita,
                },
              },
              {
                value: props.despesa.previsaoInicial,
                itemStyle: {
                  color: COLOR.despesa,
                },
              },
              {
                value: props.despesa.liquidada,
                itemStyle: {
                  color: COLOR.despesa,
                },
              },
            ].reverse(),
            type: "bar",
          },
        ],
      }}
    />
  );
}
