import PanelWithTitle from "@/components/panel/PanelWithTitle";
import Image from "next/image";
import Link from "next/link";
import { MunicipioPanelProps } from "../../../../routes";
import SituacaoPrestacaoContaWidget from "./SituacaoPrestacaoContaWidget";

export async function PrestacaoContaCamaraWidget({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  return (
    <PanelWithTitle
      bodyProps={{ className: "flex items-center", style }}
      header=" Câmara Municipal de Vereadores"
    >
      <Link
        href={`/municipio/${ano}/${municipio}/prestacao-conta`}
        className="center flex-col gap-2 text-center w-full"
      >
        <Image
          src="/icons/vereadores.png"
          alt="Câmara dos vereadores"
          height={44}
          width={46}
        />
        <SituacaoPrestacaoContaWidget
          codigoFiltro="L02"
          ano={ano}
          municipio={municipio}
        />
      </Link>
    </PanelWithTitle>
  );
}
