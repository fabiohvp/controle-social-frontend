import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import SidebarMunicipios from "../../_components/SidebarMunicipios";
import MunicipioSubmenuItems from "../MunicipioSubmenuItems";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      menuItems={MunicipioSubmenuItems}
      sidebar={<SidebarMunicipios />}
    >
      Prestação conta: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
