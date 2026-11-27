"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import BreadcrumbIndicadoresGrupos from "./_components/BreadcrumbIndicadoresGrupos";
import BreadcrumbIndicadoresLabel from "./_components/BreadcrumbIndicadoresLabel";
import BreadcrumbIndicadoresPaginas from "./_components/BreadcrumbIndicadoresPaginas";
import {
  generateIndicadoresUrl,
  getAnosIndicadores,
  getSlugIndicador,
} from "./routes";

export default function BreadcrumbIndicadoresConsolidados() {
  return (
    <>
      <BreadcrumbIndicadoresLabel />
      <BreadcrumbIndicadoresGrupos />
      <BreadcrumbIndicadoresPaginas />
      <BreadcrumbAno
        anos={getAnosIndicadores()}
        generateUrl={({ ano, pathname }) =>
          generateIndicadoresUrl({ ano, slug: getSlugIndicador(pathname) })
        }
      />
    </>
  );
}
