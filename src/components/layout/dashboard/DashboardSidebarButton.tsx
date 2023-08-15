"use client";
import HamburguerButton from "@/components/buttons/HamburguerButton";
import { HAMBURGUER_MENU_SIZE } from "@/components/menu/menuConstants";
import { CLASS_CLOSED_WIDTH } from "@/components/sidebar/sidebarConstants";
import { useAtom } from "jotai";
import { sidebarOpen } from "../../sidebar/sidebarState";

export default function DashboardSidebarButton() {
  const [open, setOpen] = useAtom(sidebarOpen);

  return (
    <div
      className={`bg-blue-menu h-full hidden items-center justify-center overflow-hidden shrink-0 ${CLASS_CLOSED_WIDTH} hover:opacity-90 md:flex`}
      onClick={() => setOpen((o) => !o)}
    >
      <HamburguerButton
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
