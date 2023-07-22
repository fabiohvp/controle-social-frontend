import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import SaudeSubmenuItems from "./SaudeSubmenuItems";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      submenuItems={SaudeSubmenuItems}
    >
      {children}
    </DashboardLayout>
  );
}
