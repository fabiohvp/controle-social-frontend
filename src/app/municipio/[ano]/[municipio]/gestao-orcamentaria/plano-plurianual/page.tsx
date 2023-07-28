import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import MunicipiosBarraLateral from "../../_components/MunicipiosBarraLateral";
import GestaoOrcamentariaItensSubmenu from "../GestaoOrcamentariaItensSubmenu";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      itensSubmenu={GestaoOrcamentariaItensSubmenu}
      barraLateral={MunicipiosBarraLateral}
    >
      Plano plurianual: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
