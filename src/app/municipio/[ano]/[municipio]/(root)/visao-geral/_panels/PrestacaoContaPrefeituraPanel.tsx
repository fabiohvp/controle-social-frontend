import PanelWithTitle from "@/components/panel/PanelWithTitle";
import Link from "next/link";
import { FaUniversity } from "react-icons/fa";
import { MunicipioPanelProps } from "../../../MunicipioPageProps";
import SituacaoPrestacaoConta from "../../../_components/widgets/SituacaoPrestacaoConta";

export async function PrestacaoContaPrefeituraPanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  return (
    <PanelWithTitle
      className="flex items-center"
      style={style}
      title="Prefeitura Municipal"
    >
      <Link
        href={`/municipio/${ano}/${municipio}/prestacao-conta`}
        className="center flex-col gap-2 text-center w-full"
      >
        <FaUniversity className="text-5xl text-blue-dark" />
        <SituacaoPrestacaoConta
          codigoFiltro="E07"
          ano={ano}
          municipio={municipio}
        />
      </Link>
    </PanelWithTitle>
  );
}
