import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import MunicipioGestaoFiscalSubmenuItems from "../MunicipioGestaoFiscalSubmenuItems";

export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2"
      menuItems={MunicipioGestaoFiscalSubmenuItems}
    >
      receita correnta liquida: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
