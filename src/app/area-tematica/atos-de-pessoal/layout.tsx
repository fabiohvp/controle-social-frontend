import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import BreadcrumbAtosPessoal from "./BreadcrumbAtosPessoal";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbAtosPessoal}
    >
      {children}
    </DashboardLayout>
  );
}
