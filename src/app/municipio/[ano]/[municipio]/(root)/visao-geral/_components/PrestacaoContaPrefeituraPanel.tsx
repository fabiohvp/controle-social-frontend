import PanelWithTitle from "@/components/panel/PanelWithTitle";
import Link from "next/link";
import { FaUniversity } from "react-icons/fa";
import { MunicipioPanelProps } from "../../../MunicipioPageProps";
import SituacaoPrestacaoContaPanel from "../../../_components/panels/SituacaoPrestacaoContaPanel";

export async function PrestacaoContaPrefeituraPanel({
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
        <SituacaoPrestacaoContaPanel
          codigoFiltro="E07"
          ano={ano}
          municipio={municipio}
        />
      </Link>
    </PanelWithTitle>
  );
}
