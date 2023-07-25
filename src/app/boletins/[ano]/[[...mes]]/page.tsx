import { cache } from "react";
import { BoletinsPageProps } from "../BoletinsPageProps";
import BoletimAlertPanel, {
  BoletimAlertPanelProps,
} from "./_components/BoletimAlertPanel";
import "./boletimMensal.css";

function getUrl(ano: string, mes: string | undefined) {
  return `https://paineldecontrole.tcees.tc.br/api/EstadoControllers/ResumoExecutivo/GetResumoExecutivo?idEsferaAdministrativa=81&anoExercicio=${ano}&mes=${mes}&v=18-07-2023-5.2.14`;
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
  const data: BoletimAlertPanelProps = {} as any;

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

export default async function Page({ params }: { params: BoletinsPageProps }) {
  const data = await getData({ ...params });

  return <BoletimAlertPanel {...data} {...params} />;
}
