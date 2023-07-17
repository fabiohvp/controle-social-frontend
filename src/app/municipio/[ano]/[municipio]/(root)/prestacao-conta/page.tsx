import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import MunicipioSubmenuItems from "../MunicipioSubmenuItems";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout menuItems={MunicipioSubmenuItems}>
      Prestação conta: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
