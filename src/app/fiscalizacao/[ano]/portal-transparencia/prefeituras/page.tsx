import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { RankingMunicipios } from "../../_components/RankingTransparencia";
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
      <RankingMunicipios
        acao="GetTransparenciaExecutivo"
        ano={ano}
        controller="TransparenciaPortal"
      />
    </DashboardLayout>
  );
}
