"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import {
  DesigualdadeEducacionalPageProps,
  generateDesigualdadeEducacionalUrl,
  getPagina,
} from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Manifestação técnica", createDropdownValue("manifestacao-tecnica")],
  ["Relatório", createDropdownValue("relatorio")],
]);

export default function BreadcrumbDesigualdadeEducacionalPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as DesigualdadeEducacionalPageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateDesigualdadeEducacionalUrl({
            ...routeParams,
            pathname,
            pagina: item[1].value,
          })
        }
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
