import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import BreadcrumbIndicadoresConsolidados from "./BreadcrumbIndicadoresConsolidados";
import BarraLateralIndicadoresConsolidados from "./_components/BarraLateralIndicadoresConsolidados";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      barraLateral={BarraLateralIndicadoresConsolidados}
      itensBreadcrumb={BreadcrumbIndicadoresConsolidados}
    >
      {children}
    </DashboardLayout>
  );
}
