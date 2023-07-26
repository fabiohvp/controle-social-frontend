import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import ObrigacaoEnvioSubmenuItems from "./ObrigacaoEnvioSubmenuItems";
import SidebarObrigacaoEnvio from "./_components/SidebarObrigacaoEnvio";

//TODO: trocar texto do alerta de acordo com o ano
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      submenuItems={ObrigacaoEnvioSubmenuItems}
      sidebar={SidebarObrigacaoEnvio}
    >
      {children}
    </DashboardLayout>
  );
}
