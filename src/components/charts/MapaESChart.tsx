"use client";
import { deepMerge } from "@/shared/merge";
import { getMunicipios, getNomeNormalizadoMunicipio } from "@/shared/municipio";
import { EChartsOption } from "echarts";
import { MapChart } from "echarts/charts";
import {
  GeoComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GeoOption } from "echarts/types/dist/shared";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CSSProperties, Dispatch, SetStateAction, memo, useState } from "react";
import EChart from "./EChart";
import MAP_DATA from "./mapa-es.json";

export type Props = {
  chartOptions?: Partial<EChartsOption>;
  className?: string;
  chartGeoOptions?: Partial<GeoOption>;
  style?: CSSProperties;

  getChart: Dispatch<SetStateAction<echarts.EChartsType | null>>;
};

function MapaESChart(props: Props) {
  const { push } = useRouter();
  const routeParams = useParams();
  const segments =
    usePathname().split(`/${routeParams.municipio}/`)[1] ?? "visao-geral";

  const municipio = getMunicipios().find(
    (o) => o.nomeNormalizado === routeParams.municipio
  );
  const regions = [];

  if (municipio) {
    regions.push({
      name: municipio.nome,
      itemStyle: {
        color: "#C5D7E0",
      },
      silent: true,
    });
  }

  const [options] = useState(
    deepMerge(
      {
        title: { show: false },
        tooltip: {
          showDelay: 0,
          transitionDuration: 0.2,
          trigger: "item",
        },
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
              itemStyle: {
                color: "red",
              },
            },
            selectedMode: "multiple",
            type: "map",
          },
          props.chartGeoOptions
        ),
      },
      props.chartOptions
    )
  );

  function onInit(chart: echarts.EChartsType) {
    echarts.registerMap("ES", MAP_DATA as any);
    props.getChart && props.getChart(chart);

    chart.on("click", function (params) {
      const nomeNormalizado = getNomeNormalizadoMunicipio(params.name);
      //TODO: fix ano inicial
      push(
        `/municipio/${routeParams.ano ?? 2023}/${nomeNormalizado}/${segments}`
      );
    });
  }

  return (
    <EChart
      className={props.className}
      components={[
        TitleComponent,
        TooltipComponent,
        GeoComponent,
        MapChart,
        CanvasRenderer,
      ]}
      onInit={onInit}
      options={options}
      style={props.style}
    />
  );
}

export default memo(MapaESChart);
