"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import { SaudePageProps, generateSaudeUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Ações sobre a pandemia", createDropdownValue("acoes-pandemia")],
  ["Câncer de colo de útero", createDropdownValue("cancer-colo-de-utero")],
  [
    "Doenças crônicas não transmissíveis",
    createDropdownValue("doencas-cronicas-nao-transmissiveis"),
  ],
]);

export default function BreadcrumbSaudePaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as SaudePageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateSaudeUrl({
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
