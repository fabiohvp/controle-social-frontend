import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import SidebarEstado from "../../_components/SidebarEstado";
import MunicipioSubmenuItems from "../MunicipioSubmenuItems";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      submenuItems={MunicipioSubmenuItems}
      sidebar={SidebarEstado}
    >
      Obrigação Envio: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
