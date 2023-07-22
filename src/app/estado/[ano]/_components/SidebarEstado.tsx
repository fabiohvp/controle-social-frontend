"use client";
import SidebarItem from "@/components/sidebar/SidebarItem";
import { useParams } from "next/navigation";
import { FaUniversity } from "react-icons/fa";
import {
  FaCheck,
  FaDollarSign,
  FaEye,
  FaTriangleExclamation,
} from "react-icons/fa6";

export default function SidebarEstado() {
  const routeParams = useParams();
  return (
    <>
      <SidebarItem
        href={`/estado/${routeParams.ano}/visao-geral`}
        icon={<FaEye />}
        text="Visão geral"
        tooltip="Visão geral do município"
      />
      <SidebarItem
        href={`/estado/${routeParams.ano}/obrigacao-envio`}
        icon={<FaCheck className="text-xl" />}
        text="Obrigações"
        tooltip="Obrigações junto ao TCE-ES"
      />

      <SidebarItem
        icon={<FaDollarSign className="text-xl" />}
        text="Gestão orçamentária"
        tooltip="Gestão orçamentária"
      >
        <SidebarItem
          href={`/estado/${routeParams.ano}/gestao-orcamentaria/planejamento-governamental`}
          text="Planejamento governamental"
          tooltip="Planejamento governamental"
        />
        <SidebarItem
          href={`/estado/${routeParams.ano}/gestao-orcamentaria/plano-plurianual`}
          text="Plano plurianual"
          tooltip="Plano plurianual"
        />
      </SidebarItem>

      <SidebarItem
        icon={<FaTriangleExclamation />}
        text="Gestão fiscal"
        tooltip="Gestão fiscal"
      >
        <SidebarItem
          href={`/estado/${routeParams.ano}/gestao-fiscal/meta-arrecadacao`}
          text="Metas de arrecadação"
          tooltip="Metas de arrecadação"
        />
        <SidebarItem
          href={`/estado/${routeParams.ano}/gestao-fiscal/receita-corrente-liquida`}
          text="RCL"
          tooltip="Receita corrente líquida"
        />
      </SidebarItem>

      <SidebarItem
        href={`/estado/${routeParams.ano}/prestacao-conta`}
        icon={<FaUniversity className="text-xl" />}
        text="Prestações de contas"
        tooltip="Prestações de contas"
      />
    </>
  );
}
