import Loading from "@/app/loading";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode, Suspense } from "react";
import ConcessaoPublicaSubmenuItems from "./ConcessaoPublicaSubmenuItems";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="p-2"
      exibirFooter={false}
      submenuItems={ConcessaoPublicaSubmenuItems}
    >
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </DashboardLayout>
  );
}
