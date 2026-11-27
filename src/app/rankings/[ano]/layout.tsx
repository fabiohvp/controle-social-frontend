import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import BreadcrumbRankings from "./BreadcrumbRankings";
import BarraLateralRankings from "./_components/BarraLateralRankings";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      barraLateral={BarraLateralRankings}
      itensBreadcrumb={BreadcrumbRankings}
    >
      {children}
    </DashboardLayout>
  );
}
