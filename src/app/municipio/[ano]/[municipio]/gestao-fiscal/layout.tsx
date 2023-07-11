import DashboardFooter from "@/components/layout/dashboard/DashboardFooter";
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader";
import DashboardHeaderMenu from "@/components/layout/dashboard/DashboardHeaderMenu";
import "@/components/layout/dashboard/dashboard-layout.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";
import SidebarMunicipios from "../_components/SidebarMunicipios";
import DropdownLinksAnos from "../_components/dropdowns/DropdownLinksAnos";
import DropdownLinksGestaoFiscal from "../_components/dropdowns/DropdownLinksGestaoFiscal";
import DropdownLinksMunicipios from "../_components/dropdowns/DropdownLinksMunicipios";
import DropdownLinksRootPages from "../_components/dropdowns/DropdownLinksRootPages";
import { MAX_HEIGHT_CONTENT } from "../municipio-constants";

export default function MunicipioGestaoFiscalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <header className="sticky bg-gray-header flex flex-col text-blue-dark">
        <DashboardHeader />
        <DashboardHeaderMenu>
          <li className="active">
            <DropdownLinksMunicipios />
          </li>
          <li>
            <DropdownLinksRootPages />
          </li>
          <li>
            <DropdownLinksGestaoFiscal />
          </li>
          <li>
            <DropdownLinksAnos />
          </li>
        </DashboardHeaderMenu>
      </header>
      <main
        className="text-sky-700 grid gap-2 overflow-hidden"
        style={{
          gridTemplateColumns: "auto 1fr",
        }}
      >
        <Sidebar style={{ height: MAX_HEIGHT_CONTENT }}>
          <SidebarMunicipios />
        </Sidebar>
        <div
          className="p-2 overflow-y-auto"
          style={{ height: MAX_HEIGHT_CONTENT }}
        >
          {children}
          <DashboardFooter />
        </div>
      </main>
    </>
  );
}
