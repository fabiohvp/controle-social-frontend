"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import { getRankingsPorCategoria } from "../rankingsConfig";
import {
  RankingsPageProps,
  generateRankingsUrl,
  getCategoria,
  getSlug,
} from "../routes";

export default function BreadcrumbRankingsPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as RankingsPageProps;
  const categoria = getCategoria(pathname);
  const rankings = getRankingsPorCategoria(categoria);

  if (!rankings.length) return null;

  const pages: Map<string, DropdownValue<string>> = new Map(
    rankings.map((ranking) => [ranking.titulo, createDropdownValue(ranking.slug)])
  );

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateRankingsUrl({
            ano: routeParams.ano,
            categoria,
            slug: item[1].value,
          })
        }
        items={pages}
        selected={createDropdownValue(getSlug(pathname))}
      />
    </li>
  );
}
