import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import BreadcrumbBoletins from "./BreadcrumbBoletins";
import BarraLateralBoletins from "./_components/BarraLateralBoletins";

//TODO: trocar texto do alerta de acordo com o ano
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      itensBreadcrumb={BreadcrumbBoletins}
      barraLateral={BarraLateralBoletins}
    >
      {children}
    </DashboardLayout>
  );
}
