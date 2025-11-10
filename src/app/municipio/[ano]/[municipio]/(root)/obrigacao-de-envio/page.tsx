import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BarraLateralMunicipios from "../../_components/BarraLateralMunicipios";
import { MunicipioPageProps } from "../../routes";
import BreadcrumbMunicipio from "../BreadcrumbMunicipio";

export default async function Page({ params }: { params: Promise<MunicipioPageProps> }) {
	const resolvedParams = await params;
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={BreadcrumbMunicipio}
      barraLateral={BarraLateralMunicipios}
    >
      Obrigação Envio: {resolvedParams.ano} {resolvedParams.municipio}
    </DashboardLayout>
  );
}
