import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { MultiSerie } from "@/types/Serie";
import BreadcrumbMonitoramento from "./BreadcrumbMonitoramento";
import { MonitoramentoPageProps } from "./routes";
import MonitoramentoConteudo, {
  ProvidenciaItem,
  QuantidadesDeliberacoes,
  ResultadoProvidenciaTotalItem,
} from "../_components/MonitoramentoConteudo";

async function getMonitoramentoData(
  ano: string,
  tipoEsferaAdministrativa: string,
  municipioRaw?: string | string[]
) {
  const isEstado = tipoEsferaAdministrativa === "estado";
  const abaSelecionada = isEstado ? "estado" : "municipios";
  const municipio = Array.isArray(municipioRaw) ? municipioRaw[0] : municipioRaw;

  let idEsferaAdministrativa = "Todos";
  if (!isEstado && municipio && municipio !== "todos") {
    const municipios = await getMunicipios();
    const codigo = getCodigoMunicipio(municipios, municipio);
    if (codigo) {
      idEsferaAdministrativa = String(Number(codigo));
    }
  }

  try {
    const base = `${ENV.apiUrl}/PrestacaoContaControllers/EsferaAdministrativa`;
    const query = `anoExercicio=${ano}&abaSelecionada=${abaSelecionada}&idEsferaAdministrativa=${idEsferaAdministrativa}&v=${ENV.apiVersion}`;

    const [quantidadesRes, totalRes, evolucaoRes, tabelaRes] = await Promise.all([
      fetch(`${base}/GetQuantidadesDeliberacoes?${query}`),
      fetch(`${base}/GetResultadoProvidenciaTotal?${query}`),
      fetch(`${base}/GetResultadoProvidencia?${query}`),
      fetch(`${base}/GetModalProvidencia?${query}`),
    ]);

    const [quantidades, totalSituacao, evolucao, providencias] = await Promise.all([
      quantidadesRes.ok ? ((await quantidadesRes.json()) as QuantidadesDeliberacoes) : null,
      totalRes.ok ? ((await totalRes.json()) as ResultadoProvidenciaTotalItem[]) : null,
      evolucaoRes.ok ? ((await evolucaoRes.json()) as MultiSerie) : null,
      tabelaRes.ok ? ((await tabelaRes.json()) as ProvidenciaItem[]) : null,
    ]);

    return { quantidades, totalSituacao, evolucao, providencias };
  } catch {
    return {
      quantidades: null,
      totalSituacao: null,
      evolucao: null,
      providencias: null,
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<MonitoramentoPageProps>;
}) {
  const resolvedParams = await params;
  const { quantidades, totalSituacao, evolucao, providencias } =
    await getMonitoramentoData(
      resolvedParams.ano,
      resolvedParams.tipoEsferaAdministrativa,
      resolvedParams.municipio
    );

  return (
    <DashboardLayout
      className="gap-2 p-2"
      itensBreadcrumb={BreadcrumbMonitoramento}
    >
      <AlertPanel type="info">
        Providências a serem tomadas pelos órgãos a partir das deliberações do
        TCEES. O painel permite identificar quais determinações já foram
        cumpridas e quais ainda não foram.
      </AlertPanel>
      <MonitoramentoConteudo
        quantidades={quantidades}
        totalSituacao={totalSituacao}
        evolucao={evolucao}
        providencias={providencias}
      />
    </DashboardLayout>
  );
}
