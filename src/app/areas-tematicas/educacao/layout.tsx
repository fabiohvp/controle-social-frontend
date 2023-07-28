import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import EducacaoSubmenuItems from "./EducacaoSubmenuItems";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      itensSubmenu={EducacaoSubmenuItems}
    >
      {children}
    </DashboardLayout>
  );
}
