import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import ObrigacaoEnvioItensSubmenu from "./ObrigacaoEnvioItensSubmenu";
import ObrigacaoEnvioBarraLateral from "./_components/ObrigacaoEnvioBarraLateral";

//TODO: trocar texto do alerta de acordo com o ano
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      itensSubmenu={ObrigacaoEnvioItensSubmenu}
      barraLateral={ObrigacaoEnvioBarraLateral}
    >
      {children}
    </DashboardLayout>
  );
}
