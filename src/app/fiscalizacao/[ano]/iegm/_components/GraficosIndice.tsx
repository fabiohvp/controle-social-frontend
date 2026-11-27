"use client";
import EChart from "@/components/charts/EChart";
import MAP_DATA from "@/components/charts/mapa-es.json";
import { BarChart, MapChart } from "echarts/charts";
import {
  GeoComponent,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import type { EChartsType } from "echarts/core";
import { registerMap } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useMemo } from "react";
import { DadoIndice, NOTAS_IEGM, getNotaPorValor } from "../iegm";

const ALTURA_BARRA = 18;

export default function GraficosIndice({ dados }: { dados: DadoIndice[] }) {
  const ordenados = useMemo(
    () =>
      [...dados].sort(
        (a, b) =>
          a.valor - b.valor ||
          a.nomeEsferaAdministrativa.localeCompare(b.nomeEsferaAdministrativa)
      ),
    [dados]
  );

  const mapa = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
        formatter: (p: { name: string; data?: { faixa: string; nota: string } }) =>
          p.data ? `${p.name}<br/>${p.data.nota} - ${p.data.faixa}` : p.name,
      },
      series: [
        {
          type: "map",
          map: "ES",
          roam: false,
          itemStyle: { areaColor: "#F0F0F0", borderColor: "#6090a6" },
          label: { show: false },
          emphasis: { label: { show: false }, itemStyle: { borderColor: "red" } },
          data: ordenados.map((d) => {
            const nota = getNotaPorValor(d.valor);
            return {
              name: d.nomeEsferaAdministrativa,
              value: d.valor,
              nota: nota.nota,
              faixa: nota.faixa,
              itemStyle: { areaColor: nota.cor },
            };
          }),
        },
      ],
    }),
    [ordenados]
  );

  const barras = useMemo(() => {
    const itens = [...ordenados].reverse();
    return {
      grid: { left: 130, right: 24, top: 8, bottom: 8 },
      tooltip: {
        trigger: "item",
        formatter: (p: { name: string; data: { nota: string; faixa: string } }) =>
          `${p.name}<br/>${p.data.nota} - ${p.data.faixa}`,
      },
      xAxis: { type: "value", show: false, min: 0, max: 100 },
      yAxis: {
        type: "category",
        data: itens.map((d) => d.nomeEsferaAdministrativa),
        axisTick: { show: false },
        axisLabel: { interval: 0, fontSize: 11 },
      },
      series: [
        {
          type: "bar",
          barCategoryGap: "20%",
          data: itens.map((d) => {
            const nota = getNotaPorValor(d.valor);
            return {
              value: 100 - 10 * d.valor,
              nota: nota.nota,
              faixa: nota.faixa,
              itemStyle: { color: nota.cor },
              label: { show: true, position: "right", formatter: nota.nota },
            };
          }),
        },
      ],
    };
  }, [ordenados]);

  function onMapaInit(_: EChartsType) {
    registerMap("ES", MAP_DATA as any);
  }

  return (
    <div className="grid gap-2 lg:grid-cols-12">
      <div
        className="lg:col-span-7 min-w-0"
        style={{ height: Math.max(ordenados.length, 10) * ALTURA_BARRA + 16 }}
      >
        <EChart
          components={[
            BarChart,
            CanvasRenderer,
            GridComponent,
            TooltipComponent,
          ]}
          options={barras}
          aria-label="Notas por município (barras)"
        />
      </div>
      <div className="lg:col-span-5 min-w-0">
        <EChart
          components={[
            CanvasRenderer,
            GeoComponent,
            MapChart,
            TooltipComponent,
            VisualMapComponent,
          ]}
          onInit={onMapaInit}
          options={mapa}
          style={{ height: 420 }}
          aria-label="Notas por município (mapa)"
        />
        <Legenda />
      </div>
    </div>
  );
}

function Legenda() {
  return (
    <div className="mt-2 rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500">
      {NOTAS_IEGM.map((n) => (
        <p className="my-1 flex items-center gap-2" key={n.valor}>
          <span
            className="inline-flex h-5 w-5 items-center justify-center rounded-full font-bold text-black"
            style={{ backgroundColor: n.cor }}
          >
            {n.nota}
          </span>
          {n.faixa}
        </p>
      ))}
    </div>
  );
}
