"use client";
import EChart from "@/components/charts/EChart";
import { formatFloat } from "@/formatters/number";
import { GaugeChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { CSSProperties } from "react";

export type FaixaGauge = {
  /** limite superior da faixa */
  ate: number;
  cor: string;
  nome: string;
};

type Props = {
  valor: number;
  /** faixas em ordem crescente; a última define o máximo do medidor */
  faixas: FaixaGauge[];
  legenda?: string;
  style?: CSSProperties;
};

const COMPONENTS = [GaugeChart, CanvasRenderer];

/** Medidor semicircular com faixas coloridas (índices de solvência, cobertura, ativos x inativos) */
export default function PrevidenciaGauge({ valor, faixas, legenda, style }: Props) {
  const maximo = faixas[faixas.length - 1].ate;

  return (
    <EChart
      components={COMPONENTS}
      style={{ height: "190px", ...style }}
      options={{
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "75%"],
            radius: "120%",
            min: 0,
            max: maximo,
            splitNumber: 1,
            axisLine: {
              lineStyle: {
                width: 24,
                color: faixas.map((faixa) => [faixa.ate / maximo, faixa.cor]),
              },
            },
            pointer: { width: 5, length: "70%", itemStyle: { color: "black" } },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            title: { show: false },
            detail: {
              offsetCenter: [0, "30%"],
              fontSize: 22,
              fontWeight: "bold",
              formatter: () => formatFloat(valor),
            },
            data: [{ name: legenda ?? "", value: Math.min(valor, maximo) }],
          },
        ],
      }}
    />
  );
}
