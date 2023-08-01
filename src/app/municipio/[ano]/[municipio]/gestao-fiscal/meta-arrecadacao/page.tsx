import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BarraLateralMunicipios from "../../_components/BarraLateralMunicipios";
import { MunicipioPageProps } from "../../routes";
import GestaoFiscalItensSubmenu from "../BreadcrumbGestaoFiscal";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={GestaoFiscalItensSubmenu}
      barraLateral={BarraLateralMunicipios}
    >
      meta arrecadação: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
