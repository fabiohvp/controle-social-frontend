"use client";
import { CLASS_CLOSED_WIDTH } from "@/components/barraLateral/barraLateralConstants";
import BotaoHamburguer from "@/components/botoes/BotaoHamburguer";
import { HAMBURGUER_MENU_SIZE } from "@/components/menu/menuConstants";
import { useAtom } from "jotai";
import { barraLateralOpen } from "../../barraLateral/barraLateralState";

export default function DashboardSidebarButton() {
  const [open, setSidebarOpen] = useAtom(barraLateralOpen);

  return (
    <div
      className={`bg-blue-menu h-full hidden items-center justify-center overflow-hidden shrink-0 ${CLASS_CLOSED_WIDTH} hover:opacity-90 md:flex`}
      onClick={() => setSidebarOpen((o) => !o)}
    >
      <BotaoHamburguer
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
