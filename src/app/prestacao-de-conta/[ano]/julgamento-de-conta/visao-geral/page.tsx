import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";
import { JulgamentoDeContaPageProps } from "../routes";
import BreadcrumbVisaoGeral from "./BreadcrumbVisaoGeral";

export default async function Page({
  params,
}: {
  params: JulgamentoDeContaPageProps;
}) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
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
      visão geral {params.ano}
      {/* //TODO: implementar gráficos */}
    </DashboardLayout>
  );
}
