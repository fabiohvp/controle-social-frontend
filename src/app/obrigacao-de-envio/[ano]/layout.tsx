import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import BreadcrumbObrigacaoEnvio from "./BreadcrumbObrigacaoEnvio";
import BarraLateralObrigacaoEnvio from "./_components/BarraLateralObrigacaoEnvio";

//TODO: trocar texto do alerta de acordo com o ano
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      itensBreadcrumb={BreadcrumbObrigacaoEnvio}
      barraLateral={BarraLateralObrigacaoEnvio}
    >
      {children}
    </DashboardLayout>
  );
}
