import ComparadorIcon from "@/components/images/icones/ComparadorIcon";
import IndicadoresIcon from "@/components/images/icones/IndicadoresIcon";
import RankingIcon from "@/components/images/icones/RankingIcon";
import { Municipio, getMunicipios } from "@/shared/municipio";
import Link from "next/link";
import MapaESChart from "../../charts/MapaESChart";
import DropdownMenu from "./DropdownMenu";

const municipios: Municipio[][] = [[], [], [], []];

for (const municipio of getMunicipios()) {
  const firstLetter = municipio.nomeNormalizado[0];

  if (firstLetter < "d") {
    municipios[0].push(municipio);
  } else if (firstLetter < "l") {
    municipios[1].push(municipio);
  } else if (firstLetter < "s") {
    municipios[2].push(municipio);
  } else {
    municipios[3].push(municipio);
  }
}

export default function DropdownMunicipios() {
  return (
    <DropdownMenu title="Municípios">
      <div className="border border-b-gray-200 flex gap-16 items-center px-2 py-3">
        <Link href="/comparar/2023/municipios" className="flex gap-1">
          <ComparadorIcon /> Comparação entre municípios
        </Link>
        <Link
          href="/indicadores/consolidados/2021/receita-orcamentaria/antecipacao"
          className="flex gap-1"
        >
          <IndicadoresIcon /> Indicadores consolidados
        </Link>
        <Link
          href="/rankings/2023/municipios/receita-receita-arrecadada"
          className="flex gap-1"
        >
          <RankingIcon /> Rankings
        </Link>
      </div>
      <input
        type="text"
        className="border font-normal m-2 px-2 py-1 rounded-md w-1/4"
        placeholder="Filtrar por município"
      />
      <div className="body flex font-normal p-2">
        <div className="flex">
          {municipios.map((municipios, index) => (
            <div key={index}>{RenderMunicipioList(municipios)}</div>
          ))}
          <div className="center h-full w-[300px]">
            <MapaESChart />
          </div>
        </div>
      </div>
    </DropdownMenu>
  );
}

function RenderMunicipioList(municipios: Municipio[]) {
  return (
    <ul>
      {municipios.map((municipio) => (
        <li key={municipio.nome} className="px-2 leading-relaxed">
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
