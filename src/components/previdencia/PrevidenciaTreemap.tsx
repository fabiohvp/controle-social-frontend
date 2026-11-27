"use client";
import { useCorrecaoIpca } from "@/components/buttons/ipca/useCorrecaoIpca";
import EChart from "@/components/charts/EChart";
import NoDataChart from "@/components/charts/NoDataChart";
import { formatFloat } from "@/formatters/number";
import { TreemapChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import type { EChartsCoreOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

/** Nó dos treemaps da API (`GetTreemap*`): `label`, `value` e filhos em `data` */
export type NoTreemap = {
  codigo: string;
  label: string;
  value: number;
  data?: NoTreemap[];
};

type Props = {
  dados: NoTreemap[] | null;
  /** ano dos valores, para a correção do IPCA */
  ano: number;
};

const COMPONENTS = [TreemapChart, TooltipComponent, CanvasRenderer];

/** "RECEITA PATRIMONIAL" => "Receita Patrimonial" (o site oficial usa toTitleCase) */
function toTitleCase(texto: string) {
  return texto.toLowerCase().replace(/(^|\s)\S/g, (letra) => letra.toUpperCase());
}

/** Treemap das receitas/despesas por natureza ou função (retângulo proporcional ao valor) */
export default function PrevidenciaTreemap({ dados, ano }: Props) {
  const corrigir = useCorrecaoIpca();

  if (!dados?.length) return <NoDataChart />;

  type Item = { name: string; value: number; children?: Item[] };
  const converter = (nos: NoTreemap[]): Item[] =>
    nos.map((no) => {
      const filhos = no.data?.length ? converter(no.data) : undefined;
      return {
        name: toTitleCase(no.label ?? ""),
        value: corrigir(no.value, ano),
        children: filhos,
      };
    });

  const options: EChartsCoreOption = {
    tooltip: {
      confine: true,
      formatter: ({ name, value }: { name: string; value: number }) =>
        `${name}: <b>R$ ${formatFloat(value)}</b>`,
    },
    series: [
      {
        type: "treemap",
        roam: false,
        nodeClick: "zoomToNode",
        breadcrumb: { show: true, bottom: 0 },
        label: { show: true, formatter: "{b}" },
        upperLabel: { show: true, height: 24 },
        itemStyle: { borderColor: "#fff", borderWidth: 1, gapWidth: 1 },
        levels: [
          { itemStyle: { borderWidth: 0, gapWidth: 2 } },
          { colorSaturation: [0.35, 0.6] },
        ],
        data: [
          {
            name: "Visão geral",
            value: converter(dados).reduce((soma, item) => soma + item.value, 0),
            children: converter(dados),
          },
        ],
      },
    ],
  };

  return <EChart components={COMPONENTS} options={options} style={{ height: "520px" }} />;
}
