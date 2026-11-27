import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import BarraLateralEstado from "../_components/BarraLateralEstado";
import BreadcrumbEstado from "./BreadcrumbEstado";

/** Sidebar + breadcrumb da seção; as page.tsx renderizam só o conteúdo */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={BreadcrumbEstado}
      barraLateral={BarraLateralEstado}
    >
      {children}
    </DashboardLayout>
  );
}
