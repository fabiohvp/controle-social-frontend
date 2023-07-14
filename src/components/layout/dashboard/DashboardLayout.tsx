import SidebarMunicipios from "@/app/municipio/[ano]/[municipio]/_components/SidebarMunicipios";
import DropdownLinksAnos from "@/app/municipio/[ano]/[municipio]/_components/dropdowns/DropdownLinksAnos";
import DropdownLinksMunicipios from "@/app/municipio/[ano]/[municipio]/_components/dropdowns/DropdownLinksMunicipios";
import DropdownLinksRootPages from "@/app/municipio/[ano]/[municipio]/_components/dropdowns/DropdownLinksRootPages";
import { MAX_HEIGHT_CONTENT } from "@/app/municipio/[ano]/[municipio]/municipio-constants";
import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";
import { FaCog } from "react-icons/fa";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import DashboardHeaderMenu from "./DashboardHeaderMenu";
import "./dashboard-layout.css";

type Props = {
  className?: string;
  children: ReactNode;
  exibirBotaoIPCA?: boolean;
};

export default function DashboardLayout(props: Props) {
  return (
    <>
      <header className="sticky bg-gray-header flex flex-col text-blue-dark">
        <DashboardHeader />
        <DashboardHeaderMenu>
          <li className="flex min-w-0">
            <DropdownLinksMunicipios />
          </li>
          <li className="flex min-w-0">
            <DropdownLinksRootPages />
          </li>
          <li className="flex min-w-0">
            <DropdownLinksAnos />
          </li>
          {props.exibirBotaoIPCA && (
            <li className="center min-w-0 px-1 md:flex-1 md:justify-end">
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
          className={`p-2 overflow-y-auto ${props.className ?? ""}`}
          style={{ height: MAX_HEIGHT_CONTENT }}
        >
          {props.children}
          <DashboardFooter />
        </div>
      </main>
    </>
  );
}
