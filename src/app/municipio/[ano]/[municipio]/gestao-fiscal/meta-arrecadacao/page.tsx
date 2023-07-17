import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import MunicipioGestaoFiscalSubmenuItems from "../MunicipioGestaoFiscalSubmenuItems";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2"
      exibirBotaoIPCA
      menuItems={MunicipioGestaoFiscalSubmenuItems}
    >
      meta arrecadação: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
