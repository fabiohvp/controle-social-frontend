"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import { BoletinsPageProps, generateBoletinsUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Boletim de macrogestão", createDropdownValue("*")],
  ["Boletim extraordinário", createDropdownValue("extraordinario")],
  ["Informativos", createDropdownValue("informativo")],
]);

export default function BreadcrumbBoletinsPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as BoletinsPageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateBoletinsUrl({
            ...routeParams,
            pagina: item[1].value,
            pathname,
          })
        }
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
