import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BarraLateralEstado from "../../_components/BarraLateralEstado";
import BreadcrumbGestaoFiscal from "../BreadcrumbGestaoFiscal";

export default async function Page({ params }: { params: Promise<EstadoPageProps> }) {
	const resolvedParams = await params;

  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={BreadcrumbGestaoFiscal}
      barraLateral={BarraLateralEstado}
    >
      meta arrecadação: {resolvedParams.ano}
    </DashboardLayout>
  );
}
