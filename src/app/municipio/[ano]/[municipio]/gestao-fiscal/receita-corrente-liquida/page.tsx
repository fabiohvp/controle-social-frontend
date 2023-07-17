import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import MunicipioGestaoFiscalSubmenuItems from "../MunicipioGestaoFiscalSubmenuItems";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2"
      menuItems={MunicipioGestaoFiscalSubmenuItems}
    >
      receita correnta liquida: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
