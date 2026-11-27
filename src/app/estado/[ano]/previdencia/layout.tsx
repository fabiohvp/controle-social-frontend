import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ESFERA_ESTADO } from "@/shared/esfera";
import { getUnidadesGestorasPrevidencia } from "@/shared/previdenciaServer";
import { ReactNode } from "react";
import BarraLateralEstado from "../_components/BarraLateralEstado";
import BreadcrumbPrevidencia from "./BreadcrumbPrevidencia";

/** Sidebar + breadcrumb (com seletor de UG); as page.tsx renderizam só o conteúdo */
export default async function Layout({ children }: { children: ReactNode }) {
  const unidadesGestoras = await getUnidadesGestorasPrevidencia(
    ESFERA_ESTADO.codigo
  );

  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={
        <BreadcrumbPrevidencia unidadesGestoras={unidadesGestoras} />
      }
      barraLateral={BarraLateralEstado}
    >
      {children}
    </DashboardLayout>
  );
}
