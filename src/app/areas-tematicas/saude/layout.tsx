import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import SaudeSubmenuItems from "./SaudeSubmenuItems";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="p-2"
      exibirFooter={false}
      submenuItems={SaudeSubmenuItems}
    >
      {children}
    </DashboardLayout>
  );
}
