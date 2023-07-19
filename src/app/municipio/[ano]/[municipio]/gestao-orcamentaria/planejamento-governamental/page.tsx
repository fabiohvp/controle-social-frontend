import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import SidebarMunicipios from "../../_components/SidebarMunicipios";
import MunicipioGestaoOrcamentariaSubmenuItems from "../MunicipioGestaoOrcamentariaSubmenuItems";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2"
      menuItems={MunicipioGestaoOrcamentariaSubmenuItems}
      sidebar={<SidebarMunicipios />}
    >
      Planejamento governamental: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
