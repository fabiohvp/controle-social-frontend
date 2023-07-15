import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import MunicipioGestaoOrcamentariaSubmenuItems from "../MunicipioGestaoOrcamentariaSubmenuItems";

export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2"
      menuItems={MunicipioGestaoOrcamentariaSubmenuItems}
    >
      Planejamento governamental: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
