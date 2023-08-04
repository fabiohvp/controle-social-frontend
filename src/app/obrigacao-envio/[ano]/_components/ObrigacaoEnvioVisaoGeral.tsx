"use client";
import MapaEsChart, { SelectedRegion } from "@/components/charts/MapaEsChart";
import PainelDeAlerta from "@/components/paineis/PainelDeAlerta";
import { normalize } from "@/formatters/string";
import {
  QUANTIDADE_ESTADO,
  QUANTIDADE_MUNICIPIOS,
  getNomeNormalizadoMunicipio,
} from "@/shared/municipio";
import { COLOR } from "@/theme/colors";
import {
  EsferaAdministrativa,
  EsferaAdministrativaProps,
} from "@/types/EsferaAdministrativa";
import type { EChartsType } from "echarts/core";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ObrigacaoEnvioDoughnut,
  ObrigacaoEnvioDoughnutKey,
  ObrigacaoEnvioDoughnuts,
} from "../types";

type Props = {
  doughnuts: ObrigacaoEnvioDoughnuts;
  exibirMapa: boolean;
  isMunicipio: boolean;
} & EsferaAdministrativaProps;

export default function ObrigacaoEnvioVisaoGeral({
  doughnuts,
  esferasAdministrativas,
  exibirMapa,
  isMunicipio,
}: Props) {
  const { push } = useRouter();
  const routeParams = useParams();
  const [selectedMode, setSelectedMode] =
    useState<ObrigacaoEnvioDoughnutKey>("PCM");
  const [selectedDoughnut, setSelectedDoughnut] =
    useState<ObrigacaoEnvioDoughnut>(doughnuts[selectedMode]!);

  useEffect(() => {
    setSelectedDoughnut(doughnuts[selectedMode]!);
  }, [selectedMode]);

  function onMapaInit(chart: EChartsType) {
    chart.on("click", function (params) {
      const nomeNormalizado = getNomeNormalizadoMunicipio(
        esferasAdministrativas,
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

  const selectedRegions = getMapaItems(
    doughnuts[selectedMode]!,
    esferasAdministrativas
  );

  return (
    <>
      <RenderButtons
        doughnuts={doughnuts}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
      />
      {exibirMapa && selectedDoughnut.comAtraso.length > 0 && (
        <MapaEsChart
          chartGeoOptions={{
            itemStyle: {
              borderColor: "#ccc",
              color: COLOR["chart-positivo"],
            },
          }}
          legends={
            selectedRegions.length
              ? [
                  {
                    color: COLOR["chart-positivo"],
                    name: "Remessas em dia",
                    value: 0,
                  },
                  {
                    color: COLOR["chart-negativo"],
                    name: "Remessas em atraso",
                    value: 1,
                  },
                ]
              : []
          }
          onInit={onMapaInit}
          selectedRegions={selectedRegions}
        />
      )}
      <RenderAlerts
        ano={routeParams.ano}
        isMunicipio={isMunicipio}
        selectedDoughnut={selectedDoughnut}
      />
    </>
  );
}

function RenderAlerts({
  ano,
  isMunicipio,
  selectedDoughnut,
}: {
  ano: string;
  isMunicipio: boolean;
  selectedDoughnut: ObrigacaoEnvioDoughnut;
}) {
  if (
    isMunicipio
      ? selectedDoughnut.naoObrigatorias.length === QUANTIDADE_MUNICIPIOS
      : selectedDoughnut.naoObrigatorias.length === QUANTIDADE_ESTADO
  ) {
    return (
      <PainelDeAlerta className="mt-2" type="info">
        Remessas ainda não exigíveis
      </PainelDeAlerta>
    );
  } else if (selectedDoughnut.comAtraso.length) {
    return (
      <PainelDeAlerta type="danger" className="min-h-[90px] mt-4">
        <h5>Não enviaram remessas ou enviaram parcialmente</h5>
        <ul className="ml-4 mt-2 text-sm">
          {selectedDoughnut.comAtraso.map((doughnut, index) => (
            <li key={doughnut.codigo}>
              {index + 1}.{" "}
              <Link
                href={`/municipio/${ano}/${normalize(
                  doughnut.nome
                )}/obrigacao-envio`}
                className="text-link"
              >
                {doughnut.nome}
              </Link>
            </li>
          ))}
        </ul>
      </PainelDeAlerta>
    );
  } else if (!selectedDoughnut.comAtraso.length) {
    return (
      <PainelDeAlerta className="mt-2" type="success">
        Nenhuma remessa em atraso
      </PainelDeAlerta>
    );
  }
  return <></>;
}

function RenderButtons({
  doughnuts,
  selectedMode,
  setSelectedMode,
}: {
  doughnuts: ObrigacaoEnvioDoughnuts;
  selectedMode: ObrigacaoEnvioDoughnutKey;
  setSelectedMode: Dispatch<SetStateAction<ObrigacaoEnvioDoughnutKey>>;
}) {
  return (
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
  );
}

function getMapaItems(
  doughnut: ObrigacaoEnvioDoughnut,
  municipios: EsferaAdministrativa[]
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
