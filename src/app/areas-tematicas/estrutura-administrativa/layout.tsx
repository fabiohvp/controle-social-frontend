import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import EstruturaAdministrativaSubmenuItems from "./EstruturaAdministrativaSubmenuItems";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="p-2"
      exibirFooter={false}
      submenuItems={EstruturaAdministrativaSubmenuItems}
    >
      {children}
    </DashboardLayout>
  );
}
