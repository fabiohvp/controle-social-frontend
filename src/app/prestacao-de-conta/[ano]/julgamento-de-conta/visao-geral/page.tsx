import DoughnutChart, { DoughnutChartItem } from "@/components/charts/DoughnutChart";
import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { ENV } from "@/shared/env";
import { COLOR } from "@/theme/colors";
import { MultiSerie } from "@/types/Serie";
import { JulgamentoDeContaPageProps } from "../routes";
import BreadcrumbVisaoGeral from "./BreadcrumbVisaoGeral";

async function getDadosJulgamento(ano: number) {
  try {
    const base = `${ENV.apiUrl}/PrestacaoContaControllers/JulgamentoConta`;
    const [
      resTiposVotos,
      resSituacaoConta,
      resPrazo,
      resEvolucaoJulgamento,
      resEvolucaoApreciada,
    ] = await Promise.all([
      fetch(`${base}/GetQuantidadeVotoAbertoFechadoContaNaoJulgada?anoExercicio=${ano}`),
      fetch(`${base}/GetQuantidadeSituacaoConta?anoExercicio=${ano}`),
      fetch(`${base}/GetSituacaoPrazoJulgamento?anoExercicio=${ano}`),
      fetch(`${base}/GetEvolucaoAnualSituacaoConta?anoExercicio=${ano}`),
      fetch(`${base}/GetEvolucaoAnualSituacaoContaApreciada?anoExercicio=${ano}`),
    ]);

    const [
      tiposVotos,
      situacaoContas,
      prazoJulgamentos,
      evolucaoSituacaoConta,
      evolucaoSituacaoContaApreciada,
    ] = await Promise.all([
      resTiposVotos.ok ? ((await resTiposVotos.json()) as DoughnutChartItem[]) : [],
      resSituacaoConta.ok ? ((await resSituacaoConta.json()) as DoughnutChartItem[]) : [],
      resPrazo.ok ? ((await resPrazo.json()) as DoughnutChartItem[]) : [],
      resEvolucaoJulgamento.ok ? ((await resEvolucaoJulgamento.json()) as MultiSerie) : null,
      resEvolucaoApreciada.ok ? ((await resEvolucaoApreciada.json()) as MultiSerie) : null,
    ]);

    return {
      tiposVotos,
      situacaoContas,
      prazoJulgamentos,
      evolucaoSituacaoConta,
      evolucaoSituacaoContaApreciada,
    };
  } catch {
    return {
      tiposVotos: [],
      situacaoContas: [],
      prazoJulgamentos: [],
      evolucaoSituacaoConta: null,
      evolucaoSituacaoContaApreciada: null,
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<JulgamentoDeContaPageProps>;
}) {
  const resolvedParams = await params;
  const ano = Number(resolvedParams.ano);

  const {
    tiposVotos,
    situacaoContas,
    prazoJulgamentos,
    evolucaoSituacaoConta,
    evolucaoSituacaoContaApreciada,
  } = await getDadosJulgamento(ano);

  return (
    <DashboardLayout
      className="gap-4 p-4 flex flex-col"
      itensBreadcrumb={BreadcrumbVisaoGeral}
    >
      <AlertPanel type="info">
        O Tribunal de Contas emite parecer prévio, documento que contém a
        análise técnica sobre a Prestação de Contas Anual dos chefes do poder
        executivo, opinando pela aprovação ou não das contas do Prefeito
        Municipal ou do Governador. Cabe então ao poder legislativo respectivo
        julgar as contas, seguindo ou não o parecer prévio, conforme artigo 31
        da Constituição Federal.
      </AlertPanel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PanelWithDescription
          titulo="Tipos de votos nas câmaras"
          descricao="Consideramos um julgamento para cada prefeito (responsável). Assim, um município pode ter mais de um julgamento para as contas de determinado ano."
        >
          {tiposVotos.length ? (
            <DoughnutChart
              items={tiposVotos}
              colors={COLOR.padraoRange}
              style={{ height: "300px" }}
            />
          ) : (
            <div className="m-auto opacity-60 p-8 text-center">Sem dados para o ano</div>
          )}
        </PanelWithDescription>

        <PanelWithDescription
          titulo="Resultados dos julgamentos nas câmaras"
          descricao="Demonstra os resultados dos julgamentos realizados pelas câmaras de vereadores."
        >
          {situacaoContas.length ? (
            <DoughnutChart
              items={situacaoContas}
              colors={COLOR.padraoRange}
              style={{ height: "300px" }}
            />
          ) : (
            <div className="m-auto opacity-60 p-8 text-center">Sem dados para o ano</div>
          )}
        </PanelWithDescription>

        <PanelWithDescription
          titulo="Prazos para julgamentos nas câmaras"
          descricao="A legislação municipal pode estabelecer prazo para a realização do julgamento das contas."
        >
          {prazoJulgamentos.length ? (
            <DoughnutChart
              items={prazoJulgamentos}
              colors={COLOR.padraoRange}
              style={{ height: "300px" }}
            />
          ) : (
            <div className="m-auto opacity-60 p-8 text-center">Sem dados para o ano</div>
          )}
        </PanelWithDescription>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PanelWithDescription
          titulo="Evolução anual do julgamento das contas nas câmaras"
          descricao="Evolução ao longo dos anos da situação de julgamento das contas municipais pelas Câmaras."
        >
          <MultiSeriesChart
            dados={evolucaoSituacaoConta}
            tipos={["line", "line"]}
            formato="numero"
            corrigirIpca={false}
          />
        </PanelWithDescription>

        <PanelWithDescription
          titulo="Evolução anual da apreciação das contas pelo TCE-ES"
          descricao="Evolução anual dos pareceres prévios emitidos pelo Tribunal de Contas."
        >
          <MultiSeriesChart
            dados={evolucaoSituacaoContaApreciada}
            tipos={["line", "line"]}
            formato="numero"
            corrigirIpca={false}
          />
        </PanelWithDescription>
      </div>
    </DashboardLayout>
  );
}
