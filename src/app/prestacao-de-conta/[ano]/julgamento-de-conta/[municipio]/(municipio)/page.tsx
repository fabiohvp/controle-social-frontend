import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";
import { JulgamentoDeContaPageProps } from "../../routes";
import BreadcrumbMunicipio from "./BreadcrumbMunicipio";

export default async function Page({
  params,
}: {
  params: JulgamentoDeContaPageProps;
}) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      itensBreadcrumb={BreadcrumbMunicipio}
    >
      <AlertPanel type="info">
        O Tribunal de Contas emite parecer prévio, documento que contém a
        análise técnica sobre a Prestação de Contas Anual dos chefes do poder
        executivo, opinando pela aprovação ou não das contas do Prefeito
        Municipal ou do Governador. Cabe então ao poder legislativo respectivo
        julgar as contas, seguindo ou não o parecer prévio, conforme artigo 31
        da Constituição Federal. São utilizadas as seguintes datas:
        <br />
        <strong>Recebimento TCE-ES</strong> - data em que o processo de
        prestação de contas foi iniciado (autuado).
        <br />
        <strong>Deliberação TCE-ES</strong> - data que o processo foi concluído
        (trânsito em julgado). Essa data está disponível apenas para processos
        concluídos a partir de 2016.
        <br />
        <strong>Julgamento</strong> - data em que as contas foram julgadas na
        câmara municipal de vereadores.
      </AlertPanel>
      municipio {params.ano}
      {/* //TODO: implementar gráficos */}
    </DashboardLayout>
  );
}
