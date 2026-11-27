"use client";
import SidebarItem from "@/components/sidebar/SidebarItem";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import {
  FaChartBar,
  FaDollarSign,
  FaGraduationCap,
  FaHeartbeat,
  FaUsers,
} from "react-icons/fa";
import { FaArrowTrendDown, FaTriangleExclamation } from "react-icons/fa6";
import { CategoriaRankingSlug, getCategoriasComRankings } from "../rankingsConfig";
import { RankingsPageProps, generateRankingsUrl } from "../routes";

const ICONES: Record<CategoriaRankingSlug, ReactNode> = {
  despesa: <FaArrowTrendDown className="text-xl" />,
  educacao: <FaGraduationCap className="text-xl" />,
  "gestao-fiscal": <FaTriangleExclamation className="text-xl" />,
  pessoal: <FaUsers className="text-xl" />,
  receita: <FaChartBar className="text-xl" />,
  resultado: <FaDollarSign className="text-xl" />,
  saude: <FaHeartbeat className="text-xl" />,
};

const CATEGORIAS = getCategoriasComRankings();

export default function BarraLateralRankings() {
  const routeParams = useParams() as RankingsPageProps;

  return (
    <>
      {CATEGORIAS.map((categoria) => (
        <SidebarItem
          key={categoria.slug}
          icon={ICONES[categoria.slug]}
          text={categoria.titulo}
          tooltip={categoria.titulo}
        >
          {categoria.rankings.map((ranking) => (
            <SidebarItem
              key={ranking.slug}
              href={generateRankingsUrl({
                ano: routeParams.ano,
                categoria: categoria.slug,
                slug: ranking.slug,
              })}
              text={ranking.titulo}
              tooltip={ranking.tituloCompleto}
            />
          ))}
        </SidebarItem>
      ))}
    </>
  );
}
