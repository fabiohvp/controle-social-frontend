import ComparadorIcon from "@/components/images/icons/ComparadorIcon";
import IndicadoresIcon from "@/components/images/icons/IndicadoresIcon";
import RankingIcon from "@/components/images/icons/RankingIcon";
import MapaESIcon from "@/components/images/icons/header/MapaESIcon";
import Input from "@/components/inputs/Input";
import { normalize } from "@/formatters/string";
import { Municipio, MunicipiosProps } from "@/shared/municipio";
import * as echarts from "echarts/core";
import Link from "next/link";
import { useState } from "react";
import MapaESChart from "../charts/MapaESChart";
import DropdownMenu from "../dropdowns/dropdown/DropdownMenu";

type MunicipioFilterable = {
  filtered: boolean;
} & Municipio;

function getMunicipiosFilterable(municipios: Municipio[]) {
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
            <MapaESChart getChart={setChart} municipios={municipios} />
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
            prefetch={false}
          >
            {municipio.nome}
          </Link>
        </li>
      ))}
    </ul>
  );
}
