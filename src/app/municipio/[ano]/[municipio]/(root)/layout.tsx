import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import BarraLateralMunicipios from "../_components/BarraLateralMunicipios";
import BreadcrumbMunicipio from "./BreadcrumbMunicipio";

/** Sidebar + breadcrumb das páginas da raiz; as page.tsx renderizam só o conteúdo */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={BreadcrumbMunicipio}
      barraLateral={BarraLateralMunicipios}
    >
      {children}
    </DashboardLayout>
  );
}
