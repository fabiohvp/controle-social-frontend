import LoadingPage from "@/components/loading/LoadingPage";
import Sidebar from "@/components/sidebar/Sidebar";
import dynamic from "next/dynamic";
import { ElementType, ReactNode, Suspense } from "react";
import { twMerge } from "tailwind-merge";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import DashboardHeaderSubmenu from "./DashboardHeaderSubmenu";
import {
  MAX_HEIGHT_CONTENT,
  MAX_HEIGHT_WITH_SUBMENU_CONTENT,
} from "./dashboard-constants";
import "./dashboard-layout.css";

type Props = {
  className?: string;
  children: ReactNode;
  exibirBotaoIPCA?: boolean;
  exibirFooter?: boolean;
  submenuItems?: ElementType;
  sidebar?: ElementType;
};

const IpcaButton = dynamic(() => import("../ipca/IpcaButton"), { ssr: false });

export default function DashboardLayout(props: Props) {
  const maxHeightContent = props.submenuItems
    ? MAX_HEIGHT_WITH_SUBMENU_CONTENT
    : MAX_HEIGHT_CONTENT;
  return (
    <div className="grid min-h-screen" style={{ gridTemplateRows: "auto 1fr" }}>
      <header className="sticky bg-gray-header flex flex-col text-blue-dark">
        <DashboardHeader />
        {props.submenuItems && (
          <DashboardHeaderSubmenu exibirSidebar={!!props.sidebar}>
            <props.submenuItems />
            {props.exibirBotaoIPCA && (
              <li className="ml-auto px-2">
                <IpcaButton />
              </li>
            )}
          </DashboardHeaderSubmenu>
        )}
      </header>
      <main className="grid">
        <div className="basis-full flex">
          {props.sidebar && (
            <Sidebar>
              <props.sidebar />
            </Sidebar>
          )}
          <div
            className={twMerge(
              "basis-full flex flex-col overflow-y-auto text-gray-dark",
              props.className
            )}
            style={{ height: maxHeightContent }}
          >
            <Suspense fallback={<LoadingPage />}>{props.children}</Suspense>
            {props.exibirFooter !== false && <DashboardFooter />}
          </div>
        </div>
      </main>
    </div>
  );
}
