"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import { getCategoriasComRankings } from "../rankingsConfig";
import { RankingsPageProps, generateRankingsUrl, getCategoria } from "../routes";

const CATEGORIAS = getCategoriasComRankings();

const PAGES: Map<string, DropdownValue<string>> = new Map(
  CATEGORIAS.map((categoria) => [
    categoria.titulo,
    createDropdownValue(categoria.slug),
  ])
);

export default function BreadcrumbRankingsCategorias() {
  const pathname = usePathname();
  const routeParams = useParams() as RankingsPageProps;
  const categoria = getCategoria(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateRankingsUrl({
            ano: routeParams.ano,
            categoria: item[1].value,
            // primeiro ranking configurado da categoria
            slug: CATEGORIAS.find((c) => c.slug === item[1].value)!.rankings[0]
              .slug,
          })
        }
        items={PAGES}
        selected={createDropdownValue(categoria)}
      />
    </li>
  );
}
