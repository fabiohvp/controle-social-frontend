import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import BreadcrumbConcessaoPublica from "./BreadcrumbConcessaoPublica";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbConcessaoPublica}
    >
      {children}
    </DashboardLayout>
  );
}
