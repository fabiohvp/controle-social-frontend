import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import EducacaoSubmenuItems from "./EducacaoSubmenuItems";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="p-2"
      exibirFooter={false}
      submenuItems={EducacaoSubmenuItems}
    >
      {children}
    </DashboardLayout>
  );
}
