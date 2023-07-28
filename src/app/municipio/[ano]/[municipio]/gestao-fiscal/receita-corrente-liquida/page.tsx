import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import MunicipiosBarraLateral from "../../_components/MunicipiosBarraLateral";
import GestaoFiscalItensSubmenu from "../GestaoFiscalItensSubmenu";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      itensSubmenu={GestaoFiscalItensSubmenu}
      barraLateral={MunicipiosBarraLateral}
    >
      receita correnta liquida: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
