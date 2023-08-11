"use client";
import {
  MunicipioPageProps,
  generateMunicipioUrl,
} from "@/app/municipio/[ano]/[municipio]/routes";
import ComparadorIcon from "@/components/images/icons/ComparadorIcon";
import IndicadoresIcon from "@/components/images/icons/IndicadoresIcon";
import RankingIcon from "@/components/images/icons/RankingIcon";
import MapaEsIcon from "@/components/images/icons/header/MapaEsIcon";
import Input from "@/components/inputs/Input";
import { normalize } from "@/formatters/string";
import { useGlobalState } from "@/providers/GlobalProvider";
import { GlobalState } from "@/shared/globalState";
import { EsferaAdministrativa } from "@/types/EsferaAdministrativa";
import type { EChartsType } from "echarts/core";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { use, useState } from "react";
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

export default function MegaMenuMunicipios() {
  const globalState = use(useGlobalState());
  const municipios = globalState.municipios;
  const [chart, setChart] = useState<EChartsType | null>(null);
  const [municipiosFilterable, setMunicipiosFilterable] = useState(
    getMunicipiosFilterable(municipios)
  );
  const pathname = usePathname();
  const routeParams = useParams() as MunicipioPageProps;

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
        <Link
          href="/comparar/2023/municipios"
          className="flex gap-1"
          prefetch={false}
        >
          <ComparadorIcon small /> Comparação entre municípios
        </Link>
        <Link
          href="/indicadores/consolidados/2021/receita-orcamentaria/antecipacao"
          className="flex gap-1"
          prefetch={false}
        >
          <IndicadoresIcon small /> Indicadores consolidados
        </Link>
        <Link
          href="/rankings/2023/municipios/receita-receita-arrecadada"
          className="flex gap-1"
          prefetch={false}
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
                    globalState={globalState}
                    municipios={municipios}
                    pathname={pathname}
                    onMouseOut={onMouseOut}
                    onMouseOver={onMouseOver}
                    routeParams={routeParams}
                  />
                }
              </div>
            )
          )}
          <div className="center h-full w-[300px]">
            <MapaEsChart getChart={setChart} />
          </div>
        </div>
      </div>
    </DropdownMenu>
  );
}

function RenderMunicipioGroups({
  globalState,
  municipios,
  onMouseOut,
  onMouseOver,
  pathname,
  routeParams,
}: {
  globalState: GlobalState;
  municipios: MunicipioFilterable[];
  onMouseOver: (municipio: EsferaAdministrativa) => void;
  onMouseOut: (municipio: EsferaAdministrativa) => void;
  pathname: string;
  routeParams: MunicipioPageProps;
}) {
  return (
    <ul>
      {municipios.map((municipio) => (
        <li
          key={municipio.nome}
          className={`px-2 leading-relaxed ${
            municipio.filtered ? "bg-yellow-300" : ""
          }`}
          onMouseOver={() => onMouseOver(municipio)}
          onMouseOut={() => onMouseOut(municipio)}
        >
          <Link
            href={generateMunicipioUrl({
              ...routeParams,
              globalState,
              municipio: municipio.nomeNormalizado,
              pathname,
            })}
            prefetch={false}
          >
            {municipio.nome}
          </Link>
        </li>
      ))}
    </ul>
  );
}
