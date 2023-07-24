import ComparadorIcon from "@/components/images/icons/ComparadorIcon";
import IndicadoresIcon from "@/components/images/icons/IndicadoresIcon";
import RankingIcon from "@/components/images/icons/RankingIcon";
import MapaESIcon from "@/components/images/icons/header/MapaESIcon";
import Input from "@/components/inputs/Input";
import { normalize } from "@/formatters/string";
import { Municipio, getMunicipios } from "@/shared/municipio";
import * as echarts from "echarts/core";
import Link from "next/link";
import { useState } from "react";
import MapaESChart from "../charts/MapaESChart";
import DropdownMenu from "../dropdowns/dropdown/DropdownMenu";

type MunicipioFilterable = {
  filtered: boolean;
} & Municipio;

function getMunicipiosFilterable() {
  return getMunicipios().map((municipio) => ({
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
  const [chart, setChart] = useState<echarts.EChartsType | null>(null);
  const [municipios, setMunicipios] = useState(getMunicipiosFilterable());

  function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const searchText = normalize(event.currentTarget.value);

    if (searchText) {
      const municipiosAfterSearch = [...municipios];
      municipiosAfterSearch.forEach((municipio) => {
        municipio.filtered = municipio.nomeNormalizado.includes(searchText);
      });
      setMunicipios(municipiosAfterSearch);
    } else {
      setMunicipios(getMunicipiosFilterable());
    }
  }

  function onMouseOver(municipio: Municipio) {
    chart!.dispatchAction({
      type: "highlight",
      geoIndex: 0,
      name: municipio.nome,
    });
  }

  function onMouseOut(municipio: Municipio) {
    chart!.dispatchAction({
      type: "downplay",
      geoIndex: 0,
      name: municipio.nome,
    });
  }

  return (
    <DropdownMenu icon={<MapaESIcon />} title="Municípios">
      <div className="border border-b-gray-200 flex gap-16 items-center px-2 py-3">
        <Link href="/comparar/2023/municipios" className="flex gap-1">
          <ComparadorIcon small /> Comparação entre municípios
        </Link>
        <Link
          href="/indicadores/consolidados/2021/receita-orcamentaria/antecipacao"
          className="flex gap-1"
        >
          <IndicadoresIcon height={20} width={20} /> Indicadores consolidados
        </Link>
        <Link
          href="/rankings/2023/municipios/receita-receita-arrecadada"
          className="flex gap-1"
        >
          <RankingIcon height={20} width={20} /> Rankings
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
          {getMunicipiosGroups(municipios).map((municipios, index) => (
            <div key={index}>
              {
                <RenderMunicipioGroups
                  municipios={municipios}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                />
              }
            </div>
          ))}
          <div className="center h-full w-[300px]">
            <MapaESChart getChart={setChart} />
          </div>
        </div>
      </div>
    </DropdownMenu>
  );
}

function RenderMunicipioGroups(props: {
  municipios: MunicipioFilterable[];
  onMouseOver: (municipio: Municipio) => void;
  onMouseOut: (municipio: Municipio) => void;
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
          >
            {municipio.nome}
          </Link>
        </li>
      ))}
    </ul>
  );
}
