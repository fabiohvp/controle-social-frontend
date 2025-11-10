import BoletimMacroGestaoGovernamentalImage from "@/components/images/images/BoletimMacroGestaoGovernamentalImage";
import { ENV } from "@/shared/env";
import Link from "next/link";
import { cache } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { BoletinsPageProps } from "../routes";
import AlertaBoletins, {
	BoletinsAlertPanelProps,
} from "./_components/AlertaBoletins";
import TituloMesBoletim from "./_components/TituloMesBoletim";
import "./boletimMensal.css";

function getUrl(ano: string, mes: string | undefined) {
  return `${ENV.apiUrl}/EstadoControllers/ResumoExecutivo/GetResumoExecutivo?idEsferaAdministrativa=81&anoExercicio=${ano}&mes=${mes}&v=18-07-2023-5.2.14`;
}

async function getDataMes(ano: string, mes: string | undefined) {
  const res = await fetch(getUrl(ano, mes));
  const data: {
    conteudo: string;
    mesUltimoEnvio: number;
  } = await res.json();
  return data;
}

const getData = cache(async ({ ano, mes }: BoletinsPageProps) => {
  const data: BoletinsAlertPanelProps = {} as any;

  const ultimoEnvio = await getDataMes(ano, undefined);
  data.mesUltimoEnvio = ultimoEnvio.mesUltimoEnvio;

  if (mes) {
    const mesSelecionado = mes[0];
    const envioSelecionado = await getDataMes(ano, mesSelecionado);
    data.mesSelecionado = parseInt(mesSelecionado);
    data.conteudo = envioSelecionado.conteudo;
  } else {
    data.conteudo = ultimoEnvio.conteudo;
  }
  return data;
});

export default async function Page({ params }: { params: Promise<BoletinsPageProps> }) {
  const resolvedParams = await params;

  const data = await getData({ ...resolvedParams });
  const { urlPDF } = extractData(data.conteudo);

  return (
    <>
      <AlertaBoletins {...data} {...resolvedParams} />

      <section className="center flex-col gap-2 mt-2">
        <BoletimMacroGestaoGovernamentalImage className="mt-2" />
        <TituloMesBoletim
          ano={parseInt(resolvedParams.ano)}
          mesSelecionado={data.mesSelecionado}
          mesUltimoEnvio={data.mesUltimoEnvio}
        />
        <hr className="w-full md:w-2/3 xl:w-3/5" />
        <div className="mt-2 px-12 text-sm">
          Você também pode fazer o download da ...
        </div>
        <Link
          href={urlPDF ?? "/teste"}
          className="button primary text-sm"
          target="_blank"
        >
          <FaRegFilePdf className="mr-1" /> Versão em PDF
        </Link>
      </section>
    </>
  );
}

function extractData(html: string): {
  ano: string;
  mes: string;
  urlPDF: string;
} {
  const inputs = html.matchAll(/<input type="hidden".*?\/>/gim);
  const data: { ano: string; mes: string; urlPDF: string } = {} as any;

  for (const [input] of inputs) {
    const name = extractProperty(input, "name")!;
    const value = extractProperty(input, "value")!;
    (data as any)[name] = value;
  }
  return data;
}

function extractProperty(input: string, propertyName: string) {
  const regex = new RegExp(`${propertyName}="(.*?)"`, "gi");
  const property = input.matchAll(regex);

  for (const [_, propertyValue] of property) {
    return propertyValue;
  }
}
