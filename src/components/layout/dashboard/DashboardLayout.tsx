import IpcaButton from "@/components/buttons/ipca/IpcaButton";
import LoadingPage from "@/components/loading/LoadingPage";
import Sidebar from "@/components/sidebar/Sidebar";
import { ElementType, ReactNode, Suspense } from "react";
import { twMerge } from "tailwind-merge";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import DashboardHeaderSubmenu from "./DashboardHeaderSubmenu";
import {
  MAX_HEIGHT_CONTENT,
  MAX_HEIGHT_WITH_SUBMENU_CONTENT,
} from "./dashboardConstants";
import "./dashboardLayout.css";

type Props = {
  barraLateral?: ElementType;
  className?: string;
  children: ReactNode;
  exibirBotaoIPCA?: boolean;
  exibirFooter?: boolean;
  itensBreadcrumb?: ElementType | ReactNode;
};

export default function DashboardLayout(props: Props) {
  const maxHeightContent = props.itensBreadcrumb
    ? MAX_HEIGHT_WITH_SUBMENU_CONTENT
    : MAX_HEIGHT_CONTENT;

  return (
    <div className="grid min-h-screen" style={{ gridTemplateRows: "auto 1fr" }}>
      <header className="sticky bg-gray-header flex flex-col text-blue-dark">
        <DashboardHeader />
        {props.itensBreadcrumb && (
          <DashboardHeaderSubmenu exibirSidebar={!!props.barraLateral}>
            {isReactNode(props.itensBreadcrumb) && props.itensBreadcrumb}
            {isElementType(props.itensBreadcrumb) && <props.itensBreadcrumb />}
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
          {props.barraLateral && (
            <Sidebar>
              <props.barraLateral />
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

function isReactNode(
  itensBreadcrumb?: ElementType | ReactNode
): itensBreadcrumb is ReactNode {
  return (itensBreadcrumb as any).type !== undefined;
}

function isElementType(
  itensBreadcrumb?: ElementType | ReactNode
): itensBreadcrumb is ElementType {
  return (itensBreadcrumb as any).type === undefined;
}
