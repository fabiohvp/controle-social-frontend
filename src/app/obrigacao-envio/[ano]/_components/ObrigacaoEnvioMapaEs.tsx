"use client";
import MapaEsChart, { SelectedRegion } from "@/components/charts/MapaEsChart";
import { getNomeNormalizadoMunicipio } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import { Municipio, MunicipiosProps } from "@/types/Municipio";
import * as echarts from "echarts/core";
import { useParams, useRouter } from "next/navigation";
import { ObrigacaoEnvioDoughnut } from "../types";

type Props = {
  doughnuts: ObrigacaoEnvioDoughnut[];
} & MunicipiosProps;

export default function ObrigacaoEnvioMapaEs({ doughnuts, municipios }: Props) {
  const { push } = useRouter();
  const routeParams = useParams();

  function onMapaInit(chart: echarts.EChartsType) {
    chart.on("click", function (params) {
      const nomeNormalizado = getNomeNormalizadoMunicipio(
        municipios,
        params.name
      );
      //TODO: fix ano inicial
      push(
        `/municipio/${
          routeParams.ano ?? 2023
        }/${nomeNormalizado}/obrigacao-envio`
      );
    });
  }

  const selectedRegions = getMapaItems(doughnuts[5], municipios);

  return (
    <MapaEsChart
      chartGeoOptions={{
        itemStyle: {
          borderColor: "#ccc",
          color: COLOR["chart-positivo"],
        },
      }}
      onInit={onMapaInit}
      municipios={municipios}
      selectedRegions={selectedRegions}
    />
  );
}

function getMapaItems(
  doughnut: ObrigacaoEnvioDoughnut,
  municipios: Municipio[]
) {
  let items: SelectedRegion[] = [];

  if (doughnut.naoObrigatorias.length !== municipios.length) {
    items = items.concat(
      doughnut.naoObrigatorias.map((d) => ({
        name: municipios.find((o) => o.codigo === d.codigo)!.nome,
        itemStyle: {
          color: "#ddd",
        },
        silent: true,
      }))
    );
  }
  items = items.concat(
    doughnut.comAtraso.map((d) => ({
      name: municipios.find((o) => o.codigo === d.codigo)!.nome,
      itemStyle: {
        color: COLOR["chart-negativo"],
      },
      silent: true,
    }))
  );
  return items;
}
