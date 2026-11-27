"use client";
import EChart from "@/components/charts/EChart";
import NoDataChart from "@/components/charts/NoDataChart";
import { formatFloat } from "@/formatters/number";
import { TreemapChart as TreemapSeries } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import type { EChartsCoreOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

/** Nó da resposta de `GetTreemap*` da API (aninhado em `data`) */
export type TreemapNo = {
  codigo: string;
  label: string;
  value: number;
  data?: TreemapNo[];
};

const COMPONENTS = [TreemapSeries, TooltipComponent, CanvasRenderer];

function getNos(nos: TreemapNo[]): object[] {
  return nos
    .filter((no) => no.value > 0)
    .map((no) => ({
      name: no.label,
      value: no.value,
      children: no.data?.length ? getNos(no.data) : undefined,
    }));
}

/** Treemap com detalhamento por clique (ex.: categoria > grupo > modalidade > elemento) */
export default function TreemapChart({ dados }: { dados: TreemapNo[] | null }) {
  if (!dados?.length) return <NoDataChart style={{ minHeight: 550 }} />;

  const options: EChartsCoreOption = {
    tooltip: {
      confine: true,
      formatter: ({
        name,
        value,
        treePathInfo,
      }: {
        name: string;
        value: number;
        treePathInfo: { name: string }[];
      }) =>
        `${treePathInfo
          .slice(1)
          .map((p) => p.name)
          .join(" > ")}<br/><b>R$ ${formatFloat(value)}</b>` || name,
    },
    series: [
      {
        type: "treemap",
        data: getNos(dados),
        roam: false,
        nodeClick: "zoomToNode",
        leafDepth: 1,
        width: "100%",
        height: "88%",
        breadcrumb: { show: true, bottom: 0 },
        label: { show: true, formatter: "{b}", overflow: "truncate" },
        upperLabel: { show: true, height: 22 },
        levels: [
          {
            itemStyle: { borderColor: "#fff", borderWidth: 2, gapWidth: 2 },
            colorSaturation: [0.35, 0.6],
          },
          { colorSaturation: [0.3, 0.55], itemStyle: { gapWidth: 1 } },
        ],
      },
    ],
  };

  return (
    <EChart
      components={COMPONENTS}
      options={options}
      style={{ height: "550px" }}
    />
  );
}
