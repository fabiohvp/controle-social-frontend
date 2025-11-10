import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BarraLateralEstado from "../../_components/BarraLateralEstado";
import BreadcrumbGestaoOrcamentaria from "../BreadcrumbGestaoOrcamentaria";

export default async function Page({ params }: { params: Promise<EstadoPageProps> }) {
	const resolvedParams = await params;

  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      itensBreadcrumb={BreadcrumbGestaoOrcamentaria}
      barraLateral={BarraLateralEstado}
    >
      Planejamento governamental: {resolvedParams.ano}
    </DashboardLayout>
  );
}
