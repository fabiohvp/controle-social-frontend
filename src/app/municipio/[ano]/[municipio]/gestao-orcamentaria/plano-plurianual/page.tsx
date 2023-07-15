import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import MunicipioSubmenuItems from "../../(root)/MunicipioSubmenuItems";

export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2"
      menuItems={MunicipioSubmenuItems}
    >
      Plano plurianual: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
