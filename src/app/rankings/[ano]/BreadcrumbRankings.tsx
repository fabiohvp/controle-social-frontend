"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import BreadcrumbRankingsCategorias from "./_components/BreadcrumbRankingsCategorias";
import BreadcrumbRankingsLabel from "./_components/BreadcrumbRankingsLabel";
import BreadcrumbRankingsPaginas from "./_components/BreadcrumbRankingsPaginas";
import { generateRankingsUrl, getAnosRankings } from "./routes";

export default function BreadcrumbRankings() {
  return (
    <>
      <BreadcrumbRankingsLabel />
      <BreadcrumbRankingsCategorias />
      <BreadcrumbRankingsPaginas />
      <BreadcrumbAno
        anos={getAnosRankings()}
        generateUrl={({ ano, pathname }) =>
          generateRankingsUrl({ ano, pathname })
        }
      />
    </>
  );
}
