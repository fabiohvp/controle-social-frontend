import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import SidebarEstado from "../../_components/SidebarEstado";
import MunicipioGestaoOrcamentariaSubmenuItems from "../MunicipioGestaoOrcamentariaSubmenuItems";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      submenuItems={MunicipioGestaoOrcamentariaSubmenuItems}
      sidebar={SidebarEstado}
    >
      Planejamento governamental: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
