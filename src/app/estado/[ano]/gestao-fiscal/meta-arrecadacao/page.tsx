import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import BarraLateralEstado from "../../_components/EstadoBarraLateral";
import EstadoGestaoFiscalItensSubmenu from "../EstadoGestaoFiscalItensSubmenu";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      exibirBotaoIPCA
      itensSubmenu={EstadoGestaoFiscalItensSubmenu}
      barraLateral={BarraLateralEstado}
    >
      meta arrecadação: {params.ano}
    </DashboardLayout>
  );
}
