import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import SidebarEstado from "../../_components/SidebarEstado";
import EstadoGestaoFiscalSubmenuItems from "../EstadoGestaoFiscalSubmenuItems";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      exibirBotaoIPCA
      submenuItems={EstadoGestaoFiscalSubmenuItems}
      sidebar={SidebarEstado}
    >
      meta arrecadação: {params.ano}
    </DashboardLayout>
  );
}
