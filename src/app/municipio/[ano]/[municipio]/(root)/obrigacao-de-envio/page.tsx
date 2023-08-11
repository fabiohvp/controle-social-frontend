import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BarraLateralMunicipios from "../../_components/BarraLateralMunicipios";
import { MunicipioPageProps } from "../../routes";
import BreadcrumbMunicipio from "../BreadcrumbMunicipio";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={BreadcrumbMunicipio}
      barraLateral={BarraLateralMunicipios}
    >
      Obrigação Envio: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
