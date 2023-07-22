"use client";
import EChart from "@/components/charts/EChart";
import { Ipca, ipcaState } from "@/components/layout/ipca/ipca-state";
import { formatCurrencyKMB } from "@/formatters/number";
import { calculateIpca } from "@/shared/math";
import { COLOR } from "@/theme/colors";
import { EChartsOption } from "echarts";
import { BarChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useAtom } from "jotai";
import { EstadoPageProps } from "../../EstadoPageProps";

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
} & EstadoPageProps;

function getOptions(props: Props, ipca: Ipca) {
  return {
    grid: {
      bottom: 0,
      left: 120,
      top: 10,
      right: 60,
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
          formatter: (d: any) => {
            const value = ipca.enabled
              ? calculateIpca(d.value, parseInt(props.ano), ipca.values)
              : d.value;
            return formatCurrencyKMB(value);
          },
          position: "right",
          show: true,
          valueAnimation: true,
        },
        data: [
          {
            value: props.receita?.previsaoInicial,
            itemStyle: {
              color: COLOR.receita,
            },
          },
          {
            value: props.receita?.arrecadada,
            itemStyle: {
              color: COLOR.receita,
            },
          },
          {
            value: props.despesa?.previsaoInicial,
            itemStyle: {
              color: COLOR.despesa,
            },
          },
          {
            value: props.despesa?.liquidada,
            itemStyle: {
              color: COLOR.despesa,
            },
          },
        ].reverse(),
        type: "bar",
      },
    ],
  } as EChartsOption;
}

export default function ReceitasXDespesasChart(props: Props) {
  const [ipca] = useAtom(ipcaState);
  const options = getOptions(props, ipca);

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
      options={options}
    />
  );
}
