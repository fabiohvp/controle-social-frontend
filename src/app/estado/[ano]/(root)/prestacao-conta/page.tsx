import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import BarraLateralEstado from "../../_components/EstadoBarraLateral";
import EstadoItensSubmenu from "../EstadoItensSubmenu";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensSubmenu={EstadoItensSubmenu}
      barraLateral={BarraLateralEstado}
    >
      Prestação conta: {params.ano}
    </DashboardLayout>
  );
}
