import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import BarraLateralEstado from "../../_components/EstadoBarraLateral";
import EstadoGestaoOrcamentariaItensSubmenu from "../EstadoGestaoOrcamentariaItensSubmenu";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      itensSubmenu={EstadoGestaoOrcamentariaItensSubmenu}
      barraLateral={BarraLateralEstado}
    >
      Planejamento governamental: {params.ano}
    </DashboardLayout>
  );
}
