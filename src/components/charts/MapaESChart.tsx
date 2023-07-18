"use client";
import { deepMerge } from "@/shared/merge";
import { getNomeNormalizadoMunicipio } from "@/shared/municipio";
import { EChartsOption } from "echarts";
import { MapChart } from "echarts/charts";
import {
  GeoComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CSSProperties } from "react";
import EChart from "./EChart";
import MAP_DATA from "./mapa-es.json";

export type Props = {
  className?: string;
  options?: EChartsOption;
  style?: CSSProperties;
};

export default function MapaESChart(props: Props) {
  const { push } = useRouter();
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  function onInit(chart: echarts.EChartsType) {
    echarts.registerMap("ES", MAP_DATA as any);

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
      options={deepMerge(
        {
          title: { show: false },
          tooltip: {
            showDelay: 0,
            transitionDuration: 0.2,
            trigger: "item",
          },
          series: [
            {
              emphasis: {
                label: { show: false },
              },
              itemStyle: {
                areaColor: "#015699",
                borderColor: "#6090a6",
              },
              label: {
                show: false,
              },
              map: "ES",
              select: {
                label: {
                  show: false,
                },
              },
              type: "map",
            },
          ],
        },
        props.options
      )}
      style={props.style}
    />
  );
}
