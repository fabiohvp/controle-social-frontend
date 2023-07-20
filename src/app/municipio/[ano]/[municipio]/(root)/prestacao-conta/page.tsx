import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import SidebarMunicipios from "../../_components/SidebarMunicipios";
import MunicipioSubmenuItems from "../MunicipioSubmenuItems";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      submenuItems={MunicipioSubmenuItems}
      sidebar={SidebarMunicipios}
    >
      Prestação conta: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
