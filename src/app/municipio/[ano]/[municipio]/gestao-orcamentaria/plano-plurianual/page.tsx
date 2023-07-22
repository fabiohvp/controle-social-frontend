import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import SidebarMunicipios from "../../_components/SidebarMunicipios";
import MunicipioGestaoOrcamentariaSubmenuItems from "../MunicipioGestaoOrcamentariaSubmenuItems";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      submenuItems={MunicipioGestaoOrcamentariaSubmenuItems}
      sidebar={SidebarMunicipios}
    >
      Plano plurianual: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
