import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import SidebarMunicipios from "../../_components/SidebarMunicipios";
import MunicipioGestaoFiscalSubmenuItems from "../MunicipioGestaoFiscalSubmenuItems";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      submenuItems={MunicipioGestaoFiscalSubmenuItems}
      sidebar={SidebarMunicipios}
    >
      receita correnta liquida: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
