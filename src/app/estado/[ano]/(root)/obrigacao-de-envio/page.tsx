import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BarraLateralEstado from "../../_components/BarraLateralEstado";
import { EstadoPageProps } from "../../routes";
import BreadcrumbEstado from "../BreadcrumbEstado";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={BreadcrumbEstado}
      barraLateral={BarraLateralEstado}
    >
      Obrigação Envio: {params.ano}
    </DashboardLayout>
  );
}
