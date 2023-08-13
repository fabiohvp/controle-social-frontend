import DashboardFooter from "@/components/layout/dashboard/DashboardFooter";
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader";
import { MAX_HEIGHT_CONTENT } from "@/components/layout/dashboard/dashboardConstants";
import "@/components/layout/dashboard/dashboardLayout.css";
import LoadingPage from "@/components/loading/LoadingPage";
import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

export default function WikiLayout({ children, title }: Props) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <DashboardHeader />
      <div className="overflow-y-auto" style={{ height: MAX_HEIGHT_CONTENT }}>
        <div className="wrapper py-2 text-sm">
          <h2 className="my-1">{title}</h2>
          <hr className="mb-3" />
          {children}
        </div>
        <DashboardFooter />
      </div>
    </Suspense>
  );
}
