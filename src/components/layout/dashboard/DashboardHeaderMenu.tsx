import { ReactNode } from "react";
import DashboardSidebarButton from "./DashboardSidebarButton";

type Props = {
  children?: ReactNode;
};

export default function DashboardHeaderMenu(props: Props) {
  return (
    <div className="border-t border-b flex items-center" style={{ height: 42 }}>
      <DashboardSidebarButton />
      <ul className="flex dashboard-menu submenu w-full">{props.children}</ul>
    </div>
  );
}
