import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import SidebarEstado from "../../_components/SidebarEstado";
import EstadoGestaoOrcamentariaSubmenuItems from "../EstadoGestaoOrcamentariaSubmenuItems";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      submenuItems={EstadoGestaoOrcamentariaSubmenuItems}
      sidebar={SidebarEstado}
    >
      Plano plurianual: {params.ano}
    </DashboardLayout>
  );
}
