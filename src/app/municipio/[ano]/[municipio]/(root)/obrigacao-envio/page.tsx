import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import MunicipioGestaoOrcamentariaSubmenuItems from "../../gestao-orcamentaria/MunicipioGestaoOrcamentariaSubmenuItems";

export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <DashboardLayout menuItems={MunicipioGestaoOrcamentariaSubmenuItems}>
      Obrigação Envio: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
