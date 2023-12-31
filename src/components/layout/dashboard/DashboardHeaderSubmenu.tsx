import { ReactNode } from "react";
import DashboardSidebarButton from "./DashboardSidebarButton";

type Props = {
  children?: ReactNode;
  exibirSidebar: boolean;
};

export default function DashboardHeaderSubmenu(props: Props) {
  if (props.children) {
    return (
      <div
        className="border-t border-b flex items-center"
        style={{ height: 42 }}
      >
        {props.exibirSidebar && <DashboardSidebarButton />}
        <ul className="flex dashboard-menu submenu w-full">{props.children}</ul>
      </div>
    );
  }
  return <></>;
}
