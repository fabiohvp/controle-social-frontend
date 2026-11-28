import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import DadosAcumuladosAte from "@/components/panel/DadosAcumuladosAte";
import { ReactNode, Suspense } from "react";
import BarraLateralEstado from "../_components/BarraLateralEstado";
import BreadcrumbGestaoFiscal from "./BreadcrumbGestaoFiscal";

/** Sidebar + breadcrumb da seção; as page.tsx renderizam só o conteúdo */
export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ ano: string }>;
}) {
  const { ano } = await params;
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={BreadcrumbGestaoFiscal}
      barraLateral={BarraLateralEstado}
    >
      <Suspense fallback={null}>
        <DadosAcumuladosAte ano={ano} controller="EstadoControllers" codigoUnidadeGestora="500E0100001" />
      </Suspense>
      {children}
    </DashboardLayout>
  );
}
