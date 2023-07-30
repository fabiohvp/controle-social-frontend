"use client";
import { deepMerge } from "@/shared/merge";
import { MunicipiosProps } from "@/types/Municipio";
import { EChartsOption } from "echarts";
import { MapChart } from "echarts/charts";
import {
  GeoComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GeoOption } from "echarts/types/dist/shared";
import { useParams } from "next/navigation";
import {
  CSSProperties,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  memo,
} from "react";
import EChart from "./EChart";
import MAP_DATA from "./mapa-es.json";

export type SelectedRegion = {
  name: string;
  itemStyle: { color: string };
  silent: boolean;
};

export type MapaEsProps = {
  chartOptions?: Partial<EChartsOption>;
  className?: string;
  chartGeoOptions?: Partial<GeoOption>;
  getChart?: Dispatch<SetStateAction<echarts.EChartsType | null>>;
  legends?: { color: string; name: string; value: number }[];
  onInit?: (chart: echarts.EChartsType, ref: HTMLDivElement) => void;
  selectedRegions?: SelectedRegion[];
  style?: CSSProperties;
} & MunicipiosProps &
  HTMLAttributes<HTMLDivElement>;

function MapaEsChart({
  chartOptions,
  className,
  chartGeoOptions,
  getChart,
  legends,
  municipios,
  onInit,
  selectedRegions,
  style,
  ...props
}: MapaEsProps) {
  const routeParams = useParams();

  let regions: SelectedRegion[] = [];

  if (selectedRegions) {
    regions = [...selectedRegions];
  } else {
    const municipio = municipios.find(
      (o) => o.nomeNormalizado === routeParams.municipio
    );

    if (municipio) {
      regions.push({
        name: municipio.nome,
        itemStyle: {
          color: "#C5D7E0",
        },
        silent: true,
      });
    }
  }

  const options = deepMerge(
    {
      geo: deepMerge(
        {
          emphasis: {
            label: { show: false },
            borderColor: "red",
          },
          itemStyle: {
            color: "#015699",
            borderColor: "#6090a6",
          },
          label: {
            show: false,
          },
          map: "ES",
          regions,
          select: {
            label: {
              show: false,
            },
          },
          selectedMode: "multiple",
          type: "map",
        },
        chartGeoOptions
      ),
      title: { show: false },
      tooltip: {
        showDelay: 0,
        transitionDuration: 0.2,
        trigger: "item",
      },
      visualMap: {
        bottom: "0",
        formatter: function (value: number) {
          if (!legends?.length) return "";
          return legends![value].name;
        },
        left: "center",
        max: 1,
        min: 0,
        orient: "horizontal",
        pieces: legends!,
        type: "piecewise",
        selectedMode: false,
        show: !!legends?.length,
      },
    },
    chartOptions
  );

  function onChartInit(chart: echarts.EChartsType, ref: HTMLDivElement) {
    echarts.registerMap("ES", MAP_DATA as any);
    getChart && getChart(chart);
    onInit && onInit(chart, ref);
  }

  return (
    <EChart
      components={[
        CanvasRenderer,
        GeoComponent,
        MapChart,
        TitleComponent,
        TooltipComponent,
        VisualMapComponent,
      ]}
      onInit={onChartInit}
      options={options}
      {...props}
    />
  );
}

export default memo(MapaEsChart);

function round(value: number) {
  return Math.round(value * 100) / 100;
}