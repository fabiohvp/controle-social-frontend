import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { RankingMunicipios } from "../../_components/RankingTransparencia";
import BreadcrumbControleInterno from "../BreadcrumbControleInterno";
import AlertaControleInterno from "../_components/AlertaControleInterno";

export default async function Page({
  params,
}: {
  params: Promise<{ ano: string }>;
}) {
  const { ano } = await params;

  return (
    <DashboardLayout
      className="pt-2 px-2 gap-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbControleInterno}
    >
      <AlertaControleInterno />
      <RankingMunicipios
        acao="GetTransparenciaExecutivo"
        ano={ano}
        controller="TransparenciaControleInterno"
      />
    </DashboardLayout>
  );
}
