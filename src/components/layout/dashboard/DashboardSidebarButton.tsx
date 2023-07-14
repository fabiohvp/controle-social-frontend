"use client";
import HamburguerButton from "@/components/buttons/hambuguer/HamburguerButton";
import { useAtom } from "jotai";
import { sidebarOpen } from "../../sidebar/sidebar-state";

export default function DashboardSidebarButton() {
  const [, setSidebarOpen] = useAtom(sidebarOpen);

  return (
    <div
      className="bg-blue-menu cursor-pointer h-full hidden items-center justify-center w-menu-small hover:opacity-90 md:flex"
      onClick={() => setSidebarOpen((o) => !o)}
    >
      <HamburguerButton />
    </div>
  );
}
