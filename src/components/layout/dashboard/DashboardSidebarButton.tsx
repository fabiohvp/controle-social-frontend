"use client";
import HamburgerButton from "@/components/buttons/hamburguer/HamburguerButton";
import { HAMBURGUER_MENU_SIZE } from "@/components/menu/menuConstants";
import { CLASS_CLOSED_WIDTH } from "@/components/sidebar/sidebarConstants";
import { useAtom } from "jotai";
import { sidebarOpen } from "../../sidebar/sidebarState";

export default function DashboardSidebarButton() {
  const [open, setSidebarOpen] = useAtom(sidebarOpen);

  return (
    <div
      className={`bg-blue-menu h-full hidden items-center justify-center overflow-hidden shrink-0 ${CLASS_CLOSED_WIDTH} hover:opacity-90 md:flex`}
      onClick={() => setSidebarOpen((o) => !o)}
    >
      <HamburgerButton
        hamburguer={{
          color: "white",
          toggled: open,
          size: HAMBURGUER_MENU_SIZE,
        }}
      />
    </div>
  );
}
//https://hamburger-react.netlify.app/
