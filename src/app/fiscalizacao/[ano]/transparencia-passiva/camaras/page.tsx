import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { RankingMunicipios } from "../../_components/RankingTransparencia";
import BreadcrumbTransparenciaPassiva from "../BreadcrumbTransparenciaPassiva";
import AlertaTransparenciaPassiva from "../_components/AlertaTransparenciaPassiva";

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
      itensBreadcrumb={BreadcrumbTransparenciaPassiva}
    >
      <AlertaTransparenciaPassiva />
      <RankingMunicipios
        acao="GetTransparenciaLegislativo"
        ano={ano}
        controller="TransparenciaPassiva"
      />
    </DashboardLayout>
  );
}
