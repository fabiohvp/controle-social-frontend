import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { RankingEstado } from "../../_components/RankingTransparencia";
import BreadcrumbPortalTransparencia from "../BreadcrumbPortalTransparencia";
import AlertaPortalTransparencia from "../_components/AlertaPortalTransparencia";

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
      itensBreadcrumb={BreadcrumbPortalTransparencia}
    >
      <AlertaPortalTransparencia />
      <RankingEstado
        acao="GetTransparenciaEstado"
        ano={ano}
        controller="TransparenciaPortal"
      />
    </DashboardLayout>
  );
}
