"use client";
import EChart from "@/components/charts/EChart";
import NoDataChart from "@/components/charts/NoDataChart";
import { COLOR } from "@/theme/colors";
import { SerieItem } from "@/types/Serie";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

const COMPONENTS = [LineChart, GridComponent, TooltipComponent, CanvasRenderer];

const FORMATO = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

/** Evolução de um índice (razão sem unidade, 4 casas decimais: cobertura de PMBC, solvência) */
export default function IndiceChart({ dados }: { dados: SerieItem[] | null }) {
  if (!dados?.length) return <NoDataChart />;

  return (
    <EChart
      components={COMPONENTS}
      style={{ height: "260px" }}
      options={{
        grid: { bottom: 30, left: 60, right: 20, top: 30 },
        tooltip: {
          confine: true,
          trigger: "item",
          valueFormatter: (valor: number) => FORMATO.format(valor),
        },
        xAxis: {
          type: "category",
          data: dados.map((item) => item.nome ?? String(item.ano)),
        },
        yAxis: { type: "value" },
        series: [
          {
            type: "line",
            data: dados.map((item) => item.valor),
            itemStyle: { color: COLOR["chart-positivo"] },
            lineStyle: { color: COLOR["chart-positivo"] },
            label: {
              show: dados.length <= 13,
              position: "top",
              formatter: ({ value }: { value: number }) => FORMATO.format(value),
            },
          },
        ],
      }}
    />
  );
}
