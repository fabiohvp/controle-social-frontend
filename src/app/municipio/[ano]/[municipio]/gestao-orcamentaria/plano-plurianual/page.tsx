import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BarraLateralMunicipios from "../../_components/BarraLateralMunicipios";
import { MunicipioPageProps } from "../../routes";
import BreadcrumbGestaoOrcamentaria from "../BreadcrumbGestaoOrcamentaria";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      itensBreadcrumb={BreadcrumbGestaoOrcamentaria}
      barraLateral={BarraLateralMunicipios}
    >
      Plano plurianual: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
