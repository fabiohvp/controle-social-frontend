"use client";
import EChart from "@/components/charts/EChart";
import { formatFloat } from "@/formatters/number";
import { SankeyChart as SankeySeries } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import type { EChartsCoreOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { getNomeLimpo } from "./nomes";

export type SankeyNo = { name: string };
export type SankeyLink = { source: string; target: string; value: number };

const COMPONENTS = [SankeySeries, TooltipComponent, CanvasRenderer];

function quebrarPalavras(texto: string, limite: number) {
  const linhas: string[] = [];
  let atual = "";
  for (const palavra of texto.split(" ")) {
    if (atual && (atual + " " + palavra).length > limite) {
      linhas.push(atual);
      atual = palavra;
    } else {
      atual = atual ? `${atual} ${palavra}` : palavra;
    }
  }
  if (atual) linhas.push(atual);
  return linhas.join("\n");
}

/** Sankey do site oficial (programas/ações e destino do dinheiro) */
export default function SankeyChart({
  nos,
  links,
}: {
  nos: SankeyNo[];
  links: SankeyLink[];
}) {
  const options: EChartsCoreOption = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      confine: true,
      formatter: (e: {
        value: number;
        data: { name?: string; source?: string; target?: string };
      }) =>
        e.data.name
          ? `${getNomeLimpo(e.data.name)}: <b>R$ ${formatFloat(e.value)}</b>`
          : `${getNomeLimpo(e.data.source ?? "")} > ${getNomeLimpo(e.data.target ?? "")}: <b>R$ ${formatFloat(e.value)}</b>`,
    },
    series: [
      {
        type: "sankey",
        data: nos,
        links,
        emphasis: { focus: "adjacency" },
        left: 0,
        top: 30,
        nodeGap: 30,
        layoutIterations: 64,
        label: {
          fontSize: 10,
          formatter: (e: { data: { name: string } }) =>
            quebrarPalavras(getNomeLimpo(e.data.name), 40),
        },
        lineStyle: { color: "gradient", curveness: 0.5 },
      },
    ],
  };

  return (
    <EChart
      components={COMPONENTS}
      options={options}
      settings={{ notMerge: true }}
      style={{ height: `${280 + 30 * nos.length}px` }}
    />
  );
}
