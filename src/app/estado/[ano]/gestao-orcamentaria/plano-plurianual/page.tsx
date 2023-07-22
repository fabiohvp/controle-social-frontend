import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import MunicipioGestaoOrcamentariaSubmenuItems from "../MunicipioGestaoOrcamentariaSubmenuItems";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      submenuItems={MunicipioGestaoOrcamentariaSubmenuItems}
    >
      Plano plurianual: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
