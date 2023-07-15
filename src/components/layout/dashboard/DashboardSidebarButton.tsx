"use client";
import HamburguerButton from "@/components/buttons/hambuguer/HamburguerButton";
import { CLASS_CLOSED_WIDTH } from "@/components/sidebar/sidebar-constants";
import { useAtom } from "jotai";
import { sidebarOpen } from "../../sidebar/sidebar-state";

export default function DashboardSidebarButton() {
  const [, setSidebarOpen] = useAtom(sidebarOpen);

  return (
    <div
      className={`bg-blue-menu cursor-pointer h-full hidden items-center justify-center shrink-0 ${CLASS_CLOSED_WIDTH} hover:opacity-90 md:flex`}
      onClick={() => setSidebarOpen((o) => !o)}
    >
      <HamburguerButton />
    </div>
  );
}
