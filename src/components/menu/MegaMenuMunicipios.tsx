"use client";
import ComparadorIcon from "@/components/images/icons/ComparadorIcon";
import IndicadoresIcon from "@/components/images/icons/IndicadoresIcon";
import RankingIcon from "@/components/images/icons/RankingIcon";
import MapaEsIcon from "@/components/images/icons/header/MapaEsIcon";
import Input from "@/components/inputs/Input";
import { normalize } from "@/formatters/string";
import { getNomeNormalizadoMunicipio } from "@/shared/municipio";
import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import { MunicipiosProps } from "@/types/Municipio";
import * as echarts from "echarts/core";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import MapaEsChart from "../charts/MapaEsChart";
import DropdownMenu from "../dropdowns/dropdown/DropdownMenu";

type MunicipioFilterable = {
  filtered: boolean;
} & EsferaAdministrativa;

function getMunicipiosFilterable(municipios: EsferaAdministrativa[]) {
  return municipios.map((municipio) => ({
    ...municipio,
    filtered: false,
  }));
}

function getMunicipiosGroups(municipios: MunicipioFilterable[]) {
  const groups: MunicipioFilterable[][] = [[], [], [], []];

  for (const municipio of municipios) {
    const firstLetter = municipio.nomeNormalizado[0];

    if (firstLetter < "d") {
      groups[0].push(municipio);
    } else if (firstLetter < "l") {
      groups[1].push(municipio);
    } else if (firstLetter < "s") {
      groups[2].push(municipio);
    } else {
      groups[3].push(municipio);
    }
  }
  return groups;
}

export default function MegaMenuMunicipios({ municipios }: MunicipiosProps) {
  const [chart, setChart] = useState<echarts.EChartsType | null>(null);
  const [municipiosFilterable, setMunicipiosFilterable] = useState(
    getMunicipiosFilterable(municipios)
  );
  const { push } = useRouter();
  const routeParams = useParams();
  const segments =
    usePathname().split(`/${routeParams.municipio}/`)[1] ?? "visao-geral";

  function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const searchText = normalize(event.currentTarget.value);

    if (searchText) {
      const municipiosAfterSearch = [...municipiosFilterable];
      municipiosAfterSearch.forEach((municipio) => {
        municipio.filtered = municipio.nomeNormalizado.includes(searchText);
      });
      setMunicipiosFilterable(municipiosAfterSearch);
    } else {
      setMunicipiosFilterable(getMunicipiosFilterable(municipios));
    }
  }

  function onMapaInit(chart: echarts.EChartsType) {
    chart.on("click", function (params) {
      const nomeNormalizado = getNomeNormalizadoMunicipio(
        municipios,
        params.name
      );
      //TODO: fix ano inicial
      push(
        `/municipio/${routeParams.ano ?? 2023}/${nomeNormalizado}/${segments}`
      );
    });
  }

  function onMouseOver(municipio: EsferaAdministrativa) {
    chart!.dispatchAction({
      type: "highlight",
      geoIndex: 0,
      name: municipio.nome,
    });
  }

  function onMouseOut(municipio: EsferaAdministrativa) {
    chart!.dispatchAction({
      type: "downplay",
      geoIndex: 0,
      name: municipio.nome,
    });
  }

  return (
    <DropdownMenu icon={<MapaEsIcon />} title="Municípios">
      <div className="border border-b-gray-200 flex gap-16 items-center px-2 py-3">
        <Link href="/comparar/2023/municipios" className="flex gap-1">
          <ComparadorIcon small /> Comparação entre municípios
        </Link>
        <Link
          href="/indicadores/consolidados/2021/receita-orcamentaria/antecipacao"
          className="flex gap-1"
        >
          <IndicadoresIcon small /> Indicadores consolidados
        </Link>
        <Link
          href="/rankings/2023/municipios/receita-receita-arrecadada"
          className="flex gap-1"
        >
          <RankingIcon small /> Rankings
        </Link>
      </div>
      <Input
        type="text"
        autoFocus
        className="m-2 w-1/4"
        placeholder="Filtrar por município"
        onKeyUp={onKeyUp}
      />
      <div className="body flex font-normal p-2">
        <div className="flex">
          {getMunicipiosGroups(municipiosFilterable).map(
            (municipios, index) => (
              <div key={index}>
                {
                  <RenderMunicipioGroups
                    municipios={municipios}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                  />
                }
              </div>
            )
          )}
          <div className="center h-full w-[300px]">
            <MapaEsChart
              getChart={setChart}
              onInit={onMapaInit}
              municipios={municipios}
            />
          </div>
        </div>
      </div>
    </DropdownMenu>
  );
}

function RenderMunicipioGroups(props: {
  municipios: MunicipioFilterable[];
  onMouseOver: (municipio: EsferaAdministrativa) => void;
  onMouseOut: (municipio: EsferaAdministrativa) => void;
}) {
  return (
    <ul>
      {props.municipios.map((municipio) => (
        <li
          key={municipio.nome}
          className={`px-2 leading-relaxed ${
            municipio.filtered ? "bg-yellow-300" : ""
          }`}
          onMouseOver={() => props.onMouseOver(municipio)}
          onMouseOut={() => props.onMouseOut(municipio)}
        >
          <Link
            href={`/municipio/2023/${municipio.nomeNormalizado}/visao-geral`}
            prefetch={false}
          >
            {municipio.nome}
          </Link>
        </li>
      ))}
    </ul>
  );
}
