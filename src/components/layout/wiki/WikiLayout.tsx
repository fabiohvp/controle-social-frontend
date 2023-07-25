import DashboardFooter from "@/components/layout/dashboard/DashboardFooter";
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader";
import { MAX_HEIGHT_CONTENT } from "@/components/layout/dashboard/dashboard-constants";
import "@/components/layout/dashboard/dashboard-layout.css";
import { ReactNode } from "react";

export default function WikiLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <>
      <DashboardHeader />
      <div className="overflow-y-auto" style={{ height: MAX_HEIGHT_CONTENT }}>
        <div className="container py-2 text-sm">
          <h2 className="my-1">{title}</h2>
          <hr className="mb-3" />
          {children}
        </div>
        <DashboardFooter />
      </div>
    </>
  );
}
