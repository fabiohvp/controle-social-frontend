"use client";
import ItemBarraLateral from "@/components/barraLateral/ItemBarraLateral";
import EstadoIcon from "@/components/images/icons/header/EstadoIcon";
import { useParams } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ObrigacaoEnvioBarraLateral() {
  const routeParams = useParams();
  return (
    <>
      <ItemBarraLateral
        href={`/obrigacao-envio/${routeParams.ano}/municipios`}
        icon={<FaMapMarkerAlt className="text-xl" />}
        text="Municípios"
        tooltip="Municípios"
      />
      <ItemBarraLateral
        href={`/obrigacao-envio/${routeParams.ano}/estado`}
        icon={<EstadoIcon color="white" />}
        text="Estado"
        tooltip="Estado"
      />
    </>
  );
}
