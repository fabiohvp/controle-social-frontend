import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import SidebarEstado from "../../_components/SidebarEstado";
import EstadoSubmenuItems from "../EstadoSubmenuItems";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      submenuItems={EstadoSubmenuItems}
      sidebar={SidebarEstado}
    >
      Prestação conta: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
