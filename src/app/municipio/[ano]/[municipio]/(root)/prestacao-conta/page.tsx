import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import MunicipiosBarraLateral from "../../_components/MunicipiosBarraLateral";
import MunicipioSubmenuItems from "../MunicipioSubmenuItems";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensSubmenu={MunicipioSubmenuItems}
      barraLateral={MunicipiosBarraLateral}
    >
      Prestação conta: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
