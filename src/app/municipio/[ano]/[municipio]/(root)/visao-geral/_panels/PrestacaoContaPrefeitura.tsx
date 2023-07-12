import PanelWithTitle from "@/components/panel/PanelWithTitle";
import Link from "next/link";
import { FaUniversity } from "react-icons/fa";
import { MunicipioPanelProps } from "../../MunicipioPageProps";

export async function PrestacaoContaPrefeitura({
  height,
  ano,
  municipio,
}: MunicipioPanelProps) {
  // async function getData({ ano, municipio }: MunicipioPageProps) {
  //   "use server";
  //   const codigo = getCodigoMunicipio(municipio);
  //   const res = await fetch(
  //     `https://paineldecontrole.tcees.tc.br/api/MunicipioControllers/ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativa?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  //   );
  //   const data = await res.json();
  //   return data;
  // }

  // const data = await getData({ ano, municipio });
  return (
    <PanelWithTitle
      className="flex items-center"
      height={height}
      title="Prefeitura Municipal"
    >
      <Link
        href={`/municipio/${ano}/${municipio}/prestacao-conta`}
        className="flex flex-col gap-2 items-center text-center text-blue-dark"
      >
        <FaUniversity className="text-5xl" />
        <div>
          Prestação de Contas Anual está em atraso para a competência {ano}
        </div>
      </Link>
    </PanelWithTitle>
  );
}
