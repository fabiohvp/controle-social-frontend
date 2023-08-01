"use client";
import ItemBarraLateral from "@/components/barraLateral/ItemBarraLateral";
import { useParams } from "next/navigation";
import { FaUniversity } from "react-icons/fa";
import {
  FaCheck,
  FaDollarSign,
  FaEye,
  FaTriangleExclamation,
} from "react-icons/fa6";

export default function BarraLateralEstado() {
  const routeParams = useParams();
  return (
    <>
      <ItemBarraLateral
        href={`/estado/${routeParams.ano}/visao-geral`}
        icon={<FaEye />}
        text="Visão geral"
        tooltip="Visão geral do município"
      />
      <ItemBarraLateral
        href={`/estado/${routeParams.ano}/obrigacao-envio`}
        icon={<FaCheck className="text-xl" />}
        text="Obrigações"
        tooltip="Obrigações junto ao TCE-ES"
      />

      <ItemBarraLateral
        icon={<FaDollarSign className="text-xl" />}
        text="Gestão orçamentária"
        tooltip="Gestão orçamentária"
      >
        <ItemBarraLateral
          href={`/estado/${routeParams.ano}/gestao-orcamentaria/planejamento-governamental`}
          text="Planejamento governamental"
          tooltip="Planejamento governamental"
        />
        <ItemBarraLateral
          href={`/estado/${routeParams.ano}/gestao-orcamentaria/plano-plurianual`}
          text="Plano plurianual"
          tooltip="Plano plurianual"
        />
      </ItemBarraLateral>

      <ItemBarraLateral
        icon={<FaTriangleExclamation />}
        text="Gestão fiscal"
        tooltip="Gestão fiscal"
      >
        <ItemBarraLateral
          href={`/estado/${routeParams.ano}/gestao-fiscal/meta-arrecadacao`}
          text="Metas de arrecadação"
          tooltip="Metas de arrecadação"
        />
        <ItemBarraLateral
          href={`/estado/${routeParams.ano}/gestao-fiscal/receita-corrente-liquida`}
          text="RCL"
          tooltip="Receita corrente líquida"
        />
      </ItemBarraLateral>

      <ItemBarraLateral
        href={`/estado/${routeParams.ano}/prestacao-conta`}
        icon={<FaUniversity className="text-xl" />}
        text="Prestações de contas"
        tooltip="Prestações de contas"
      />
    </>
  );
}
