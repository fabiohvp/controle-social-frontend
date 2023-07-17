import LoadingPage from "@/components/loading/LoadingPage";
import { ElementType, ReactNode, Suspense } from "react";
import { twMerge } from "tailwind-merge";
import DashboardHeader from "./DashboardHeader";
import DashboardHeaderSubmenu from "./DashboardHeaderSubmenu";
import "./dashboard-layout.css";

type Props = {
  className?: string;
  children: ReactNode;
  menuItems?: ElementType;
};

export default function IframeLayout(props: Props) {
  return (
    <div className="grid min-h-screen" style={{ gridTemplateRows: "auto 1fr" }}>
      <header className="sticky bg-gray-header flex flex-col text-blue-dark">
        <DashboardHeader />
        <DashboardHeaderSubmenu>
          {props.menuItems && <props.menuItems />}
        </DashboardHeaderSubmenu>
      </header>
      <main
        className={twMerge("flex flex-col text-gray-dark", props.className)}
      >
        <Suspense fallback={<LoadingPage />}>{props.children}</Suspense>
      </main>
    </div>
  );
}
