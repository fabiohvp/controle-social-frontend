"use client";
import EstadoIcon from "@/components/images/icons/header/EstadoIcon";
import SidebarItem from "@/components/sidebar/SidebarItem";
import { useParams } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function SidebarObrigacaoEnvio() {
  const routeParams = useParams();
  return (
    <>
      <SidebarItem
        href={`/obrigacao-envio/${routeParams.ano}/municipios`}
        icon={<FaMapMarkerAlt className="text-xl" />}
        text="Municípios"
        tooltip="Municípios"
      />
      <SidebarItem
        href={`/obrigacao-envio/${routeParams.ano}/estado`}
        icon={<EstadoIcon color="white" />}
        text="Estado"
        tooltip="Estado"
      />
    </>
  );
}
