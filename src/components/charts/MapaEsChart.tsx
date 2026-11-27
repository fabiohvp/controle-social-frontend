"use client";
import { getPagina } from "@/app/folha-de-pagamento/routes";
import {
  MunicipioPageProps,
  generateMunicipioUrl,
} from "@/app/municipio/[ano]/[municipio]/routes";
import { useGlobalState } from "@/providers/GlobalProvider";
import { deepMerge } from "@/shared/merge";
import { getNomeNormalizadoMunicipio } from "@/shared/municipio";
import { MapChart } from "echarts/charts";
import {
  GeoComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import type { EChartsCoreOption, EChartsType } from "echarts/core";
import { registerMap } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GeoOption } from "echarts/types/dist/shared";
import { useParams, usePathname, useRouter } from "next/navigation";
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
  /** Tooltip do município (exige `chartGeoOptions.tooltip.show`). */
  tooltip?: { formatter: string };
};

export type MapaEsProps = {
  chartOptions?: Partial<EChartsCoreOption>;
  className?: string;
  chartGeoOptions?: Partial<GeoOption>;
  getChart?: Dispatch<SetStateAction<EChartsType | null>>;
  /** Substitui o destino padrão do clique (mesma página no município clicado). */
  getUrlMunicipio?: (nomeNormalizado: string) => string;
  legends?: { color: string; name: string; value: number }[];
  onInit?: (chart: EChartsType, ref: HTMLDivElement) => void;
  selectedRegions?: SelectedRegion[];
  style?: CSSProperties;
} & HTMLAttributes<HTMLDivElement>;

function MapaEsChart({
  chartOptions,
  className,
  chartGeoOptions,
  getChart,
  getUrlMunicipio,
  legends,
  onInit,
  selectedRegions,
  style,
  ...props
}: MapaEsProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const routeParams = useParams() as MunicipioPageProps;
  const pagina = getPagina(pathname);

  const globalState = useGlobalState();
  const municipios = globalState.municipios;

  let regions: SelectedRegion[] = [];

  function onMapaInit(chart: EChartsType) {
    chart.on("click", function (params) {
      const nomeNormalizado = getNomeNormalizadoMunicipio(
        municipios,
        params.name
      )!;
      if (getUrlMunicipio) {
        if (nomeNormalizado) push(getUrlMunicipio(nomeNormalizado));
        return;
      }
      push(
        generateMunicipioUrl({
          ...routeParams,
          globalState,
          municipio: nomeNormalizado,
          pagina,
          pathname,
        })
      );
    });
  }

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

  function onChartInit(chart: EChartsType, ref: HTMLDivElement) {
    registerMap("ES", MAP_DATA as any);
    getChart && getChart(chart);
    onMapaInit(chart);
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
