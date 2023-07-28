import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import BoletinsItensSubmenu from "./BoletinsItensSubmenu";
import BoletinsBarraLateral from "./_components/BoletinsBarraLateral";

//TODO: trocar texto do alerta de acordo com o ano
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      itensSubmenu={BoletinsItensSubmenu}
      barraLateral={BoletinsBarraLateral}
    >
      {children}
    </DashboardLayout>
  );
}
