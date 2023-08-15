import PanelWithTitle from "@/components/panel/PanelWithTitle";
import Link from "next/link";
import { FaUniversity } from "react-icons/fa";
import { MunicipioPanelProps } from "../../../../routes";
import SituacaoPrestacaoContaWidget from "./SituacaoPrestacaoContaWidget";

export async function PrestacaoContaPrefeituraWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  return (
    <PanelWithTitle
      bodyProps={{ className: "flex items-center", style }}
      header="Prefeitura Municipal"
    >
      <Link
        href={`/municipio/${ano}/${municipio}/prestacao-conta`}
        className="center flex-col gap-2 text-center w-full"
      >
        <FaUniversity className="text-5xl text-blue-dark" />
        <SituacaoPrestacaoContaWidget
          codigoFiltro="E07"
          ano={ano}
          municipio={municipio}
        />
      </Link>
    </PanelWithTitle>
  );
}
