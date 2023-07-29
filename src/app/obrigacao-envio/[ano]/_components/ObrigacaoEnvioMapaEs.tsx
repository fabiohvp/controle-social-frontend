"use client";
import MapaEsChart, { SelectedRegion } from "@/components/charts/MapaEsChart";
import { getNomeNormalizadoMunicipio } from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import { Municipio, MunicipiosProps } from "@/types/Municipio";
import * as echarts from "echarts/core";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ObrigacaoEnvioDoughnut,
  ObrigacaoEnvioDoughnutKey,
  ObrigacaoEnvioDoughnuts,
} from "../types";

type Props = {
  doughnuts: ObrigacaoEnvioDoughnuts;
} & MunicipiosProps;

export default function ObrigacaoEnvioMapaEs({ doughnuts, municipios }: Props) {
  const { push } = useRouter();
  const routeParams = useParams();
  const [selectedMode, setSelectedMode] =
    useState<ObrigacaoEnvioDoughnutKey>("PCM");

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

  const selectedRegions = getMapaItems(doughnuts[selectedMode]!, municipios);

  return (
    <>
      <div className="center flex-wrap gap-1">
        {Object.keys(doughnuts).map((key: string) => (
          <button
            key={key}
            className={`button text-xs ${key === selectedMode ? "active" : ""}`}
            onClick={() => setSelectedMode(key as ObrigacaoEnvioDoughnutKey)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="h-[460px] md:h-[700px] lg:h-full lg:min-h-[530px] xl:min-h-[700px]">
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
      </div>
    </>
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
