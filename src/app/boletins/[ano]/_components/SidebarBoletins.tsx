"use client";
import SidebarItem from "@/components/sidebar/SidebarItem";
import { useParams } from "next/navigation";
import { FaRegNewspaper } from "react-icons/fa";
import { PiFileTextBold } from "react-icons/pi";
import { TbFiles } from "react-icons/tb";

export default function SidebarBoletins() {
  const routeParams = useParams();
  return (
    <>
      <SidebarItem
        href={`/boletins/${routeParams.ano}/mensal`}
        icon={<FaRegNewspaper className="text-xl" />}
        text="Boletim de macrogestão"
        tooltip="Boletim de macrogestão"
      />
      <SidebarItem
        href={`/boletins/${routeParams.ano}/extraordinario`}
        icon={<PiFileTextBold className="text-xl" />}
        text="Boletim extraordinário"
        tooltip="Boletim extraordinário"
      />
      <SidebarItem
        href={`/boletins/${routeParams.ano}/informativo`}
        icon={<TbFiles className="text-2xl" />}
        text="Informativos"
        tooltip="Informativos"
      />
    </>
  );
}
