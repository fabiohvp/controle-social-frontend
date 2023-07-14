import PanelWithTitle from "@/components/panel/PanelWithTitle";
import Image from "next/image";
import Link from "next/link";
import SituacaoPrestacaoConta from "../../../_components/widgets/SituacaoPrestacaoConta";
import { MunicipioPanelProps } from "../../MunicipioPageProps";

export async function PrestacaoContaCamaraPanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  return (
    <PanelWithTitle
      className="flex items-center"
      style={style}
      title=" Câmara Municipal de Vereadores"
    >
      <Link
        href={`/municipio/${ano}/${municipio}/prestacao-conta`}
        className="center flex-col gap-2 text-center w-full"
      >
        <Image
          src="/icones/vereadores.png"
          alt="Câmara dos vereadores"
          height={44}
          width={46}
        />
        <SituacaoPrestacaoConta
          codigoFiltro="L02"
          ano={ano}
          municipio={municipio}
        />
      </Link>
    </PanelWithTitle>
  );
}
