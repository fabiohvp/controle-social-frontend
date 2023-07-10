"use client";
import { useAtom } from "jotai";
import { CSSProperties, ReactNode } from "react";
import { SidebarList } from "./SidebarHelper";
import { sidebarOpen } from "./sidebar-state";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Sidebar(props: Props) {
  const [open, setOpen] = useAtom(sidebarOpen);

  return (
    <SidebarList
      className={`bg-blue-menu h-screen overflow-y-auto py-1 text-white ${
        open ? "w-[230px]" : "w-[50px]"
      } ${props.className ?? ""}`}
      style={props.style}
    >
      {props.children}
    </SidebarList>
  );
}
