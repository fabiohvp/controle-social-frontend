import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import MunicipioSubmenuItems from "../../(root)/MunicipioSubmenuItems";
import { MunicipioPageProps } from "../../MunicipioPageProps";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2"
      menuItems={MunicipioSubmenuItems}
    >
      Plano plurianual: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
