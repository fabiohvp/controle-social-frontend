"use client";
import { useCorrecaoIpca } from "@/components/buttons/ipca/useCorrecaoIpca";
import EChart from "@/components/charts/EChart";
import NoDataChart from "@/components/charts/NoDataChart";
import {
  getFormatadorAbreviado,
  getFormatadorValor,
} from "@/components/charts/chartFormatters";
import { formatFloat, formatMoney } from "@/formatters/number";
import { COLOR } from "@/theme/colors";
import { BarChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

const CORES_DONUT = [
  COLOR["chart-positivo"],
  COLOR.despesa,
  COLOR["chart-alerta"],
  COLOR["chart-muito-positivo"],
  COLOR["chart-negativo"],
  COLOR["chart-info"],
];

const formatarMoeda = getFormatadorValor("moeda");
const formatarAbreviado = getFormatadorAbreviado("moeda");

/** Resposta "donut" da API: { name, value }[] (valores em R$) */
export function DonutValores({
  dados,
  ano,
}: {
  dados: { name: string; value: number }[] | null;
  ano: number;
}) {
  const corrigir = useCorrecaoIpca();
  if (!dados?.length) return <NoDataChart />;

  return (
    <EChart
      components={[PieChart, TooltipComponent, LegendComponent, CanvasRenderer]}
      options={{
        color: CORES_DONUT,
        tooltip: {
          confine: true,
          trigger: "item",
          formatter: ({
            name,
            value,
            percent,
          }: {
            name: string;
            value: number;
            percent: number;
          }) => `${name}<br/><b>${formatarMoeda(value)}</b> (${percent}%)`,
        },
        legend: { bottom: 0, type: "scroll" },
        series: [
          {
            type: "pie",
            radius: ["35%", "60%"],
            center: ["50%", "42%"],
            data: dados.map((item) => ({
              name: item.name,
              value: corrigir(item.value, ano),
            })),
            label: { formatter: "{d}%" },
          },
        ],
      }}
      style={{ height: "280px" }}
    />
  );
}

/** Resposta "barras horizontais" da API: { nome, valor }[] (valores em R$) */
export function BarrasHorizontais({
  dados,
  ano,
  cores,
}: {
  dados: { nome: string; valor: number | null }[] | null;
  ano: number;
  cores?: string[];
}) {
  const corrigir = useCorrecaoIpca();
  if (!dados?.length) return <NoDataChart />;

  return (
    <EChart
      components={[BarChart, GridComponent, TooltipComponent, CanvasRenderer]}
      options={{
        grid: { bottom: 20, left: 150, right: 60, top: 10 },
        tooltip: {
          confine: true,
          trigger: "item",
          valueFormatter: (valor: number) => formatarMoeda(valor),
        },
        xAxis: {
          type: "value",
          axisLabel: { formatter: (valor: number) => formatarAbreviado(valor) },
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: dados.map((item) => item.nome),
          axisLabel: { width: 140, overflow: "truncate" },
        },
        series: [
          {
            type: "bar",
            data: dados.map((item, indice) => ({
              value: item.valor === null ? null : corrigir(item.valor, ano),
              itemStyle: {
                color: cores?.[indice] ?? COLOR["chart-positivo"],
              },
            })),
            label: {
              show: true,
              position: "right",
              formatter: ({ value }: { value: number }) =>
                formatarAbreviado(value),
            },
          },
        ],
      }}
      style={{ height: "280px" }}
    />
  );
}

/**
 * Valor principal de um card ("R$ 3,06B"), com o valor completo no title.
 * Igual ao `MoneyValue`, mas aceita valores negativos e zero (resultado
 * primário/nominal, dívida consolidada líquida).
 */
export function ValorMonetario({
  valor,
  ano,
}: {
  valor: number | null | undefined;
  ano: number;
}) {
  const corrigir = useCorrecaoIpca();
  if (valor === null || valor === undefined) {
    return (
      <span className="text-gray-light text-sm">Informação indisponível</span>
    );
  }
  const corrigido = corrigir(valor, ano);
  return (
    <span
      className={`text-2xl ${corrigido < 0 ? "text-red-700" : "text-blue-dark"}`}
      title={`R$ ${formatFloat(corrigido)}`}
      data-valor={corrigido}
    >
      R$ <span className="font-extrabold">{formatMoney(corrigido)}</span>
    </span>
  );
}
