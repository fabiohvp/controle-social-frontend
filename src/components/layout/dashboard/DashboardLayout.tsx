import SidebarMunicipios from "@/app/municipio/[ano]/[municipio]/_components/SidebarMunicipios";
import Sidebar from "@/components/sidebar/Sidebar";
import { ElementType, ReactNode } from "react";
import { FaCog } from "react-icons/fa";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import DashboardHeaderMenu from "./DashboardHeaderMenu";
import { MAX_HEIGHT_CONTENT } from "./dashboard-constants";
import "./dashboard-layout.css";

type Props = {
  className?: string;
  children: ReactNode;
  exibirBotaoIPCA?: boolean;
  menuItems: ElementType;
};

export default function DashboardLayout(props: Props) {
  return (
    <>
      <header className="sticky bg-gray-header flex flex-col text-blue-dark">
        <DashboardHeader />
        <DashboardHeaderMenu>
          {<props.menuItems />}
          {props.exibirBotaoIPCA && (
            <li className="basis-8 ml-auto px-1 sm:basis-auto">
              <div className="hidden md:block">
                <input type="checkbox" className="mr-1" />
                Correção pelo IPCA
              </div>
              <div className="md:hidden">
                <FaCog />
              </div>
            </li>
          )}
        </DashboardHeaderMenu>
      </header>
      <main
        className="text-sky-700 md:grid overflow-hidden"
        style={{
          gridTemplateColumns: "auto 1fr",
        }}
      >
        <Sidebar style={{ height: MAX_HEIGHT_CONTENT }}>
          <SidebarMunicipios />
        </Sidebar>
        <div
          className={`p-2 overflow-y-auto text-gray-dark ${
            props.className ?? ""
          }`}
          style={{ height: MAX_HEIGHT_CONTENT }}
        >
          {props.children}
          <DashboardFooter />
        </div>
      </main>
    </>
  );
}
