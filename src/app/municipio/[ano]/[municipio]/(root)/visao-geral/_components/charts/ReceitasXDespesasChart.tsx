"use client";
import { Ipca, ipcaState } from "@/components/buttons/ipca/ipcaState";
import EChart from "@/components/charts/EChart";
import { formatCurrency, formatCurrencyKMB } from "@/formatters/number";
import { calculateIpca } from "@/shared/math";
import { COLOR } from "@/theme/colors";
import { BarChart } from "echarts/charts";
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import type { EChartsCoreOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useAtom } from "jotai";
import { MunicipioPageProps } from "../../../../routes";

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
} & MunicipioPageProps;

function getOptions(props: Props, ipca: Ipca) {
  return {
    grid: {
      bottom: 25,
      left: 130,
      top: 10,
      right: 60,
      containLabel: false,
    },
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const val = ipca.enabled
          ? calculateIpca(params.value, parseInt(props.ano), ipca.values)
          : params.value;
        return `${params.name}: <b>${formatCurrency(val)}</b>`;
      },
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
      axisLabel: {
        formatter: (value: number) => formatCurrencyKMB(value),
      },
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
  } as EChartsCoreOption;
}

export default function ReceitasXDespesasChart(props: Props) {
  const [ipca] = useAtom(ipcaState);
  const options = getOptions(props, ipca);

  return (
    <EChart
      style={{ height: "140px" }}
      components={[
        DatasetComponent,
        GridComponent,
        TooltipComponent,
        VisualMapComponent,
        BarChart,
        CanvasRenderer,
      ]}
      options={options}
    />
  );
}
