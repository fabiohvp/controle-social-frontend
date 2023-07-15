import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import MunicipioSubmenuItems from "../MunicipioSubmenuItems";

export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <DashboardLayout menuItems={MunicipioSubmenuItems}>
      Prestação conta: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
