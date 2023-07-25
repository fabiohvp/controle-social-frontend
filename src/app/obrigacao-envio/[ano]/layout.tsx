import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import BoletinsSubmenuItems from "./BoletinsSubmenuItems";
import SidebarBoletins from "./_components/SidebarBoletins";

//TODO: trocar texto do alerta de acordo com o ano
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      submenuItems={BoletinsSubmenuItems}
      sidebar={SidebarBoletins}
    >
      {children}
    </DashboardLayout>
  );
}
