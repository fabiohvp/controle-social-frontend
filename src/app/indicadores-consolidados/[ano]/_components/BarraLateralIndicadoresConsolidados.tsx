"use client";
import SidebarItem from "@/components/sidebar/SidebarItem";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import {
  FaChartBar,
  FaDollarSign,
  FaGraduationCap,
  FaHeartbeat,
  FaPiggyBank,
  FaUsers,
} from "react-icons/fa";
import {
  FaArrowTrendDown,
  FaGaugeHigh,
  FaScaleBalanced,
  FaShieldHalved,
  FaTriangleExclamation,
} from "react-icons/fa6";
import {
  GRUPOS_INDICADOR,
  GrupoIndicadorSlug,
  getIndicadoresPorGrupo,
} from "../indicadoresConfig";
import { IndicadoresPageProps, generateIndicadoresUrl } from "../routes";

const ICONES: Record<GrupoIndicadorSlug, ReactNode> = {
  alertas: <FaTriangleExclamation className="text-xl" />,
  capag: <FaScaleBalanced className="text-xl" />,
  despesa: <FaArrowTrendDown className="text-xl" />,
  educacao: <FaGraduationCap className="text-xl" />,
  iegm: <FaGaugeHigh className="text-xl" />,
  ivf: <FaShieldHalved className="text-xl" />,
  pessoal: <FaUsers className="text-xl" />,
  previdencia: <FaPiggyBank className="text-xl" />,
  receita: <FaChartBar className="text-xl" />,
  resultado: <FaDollarSign className="text-xl" />,
  saude: <FaHeartbeat className="text-xl" />,
};

export default function BarraLateralIndicadoresConsolidados() {
  const routeParams = useParams() as IndicadoresPageProps;

  return (
    <>
      {GRUPOS_INDICADOR.map((grupo) => (
        <SidebarItem
          key={grupo.slug}
          icon={ICONES[grupo.slug]}
          text={grupo.titulo}
          tooltip={grupo.titulo}
        >
          {getIndicadoresPorGrupo(grupo.slug).map((indicador) => (
            <SidebarItem
              key={indicador.slug}
              href={generateIndicadoresUrl({
                ano: routeParams.ano,
                slug: indicador.slug,
              })}
              text={indicador.titulo}
              tooltip={indicador.tituloCompleto}
            />
          ))}
        </SidebarItem>
      ))}
    </>
  );
}
