"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";
import { generatePatrimonioUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Visão geral", createDropdownValue("visao-geral")],
  ["Balanço patrimonial", createDropdownValue("balanco-patrimonial")],
  ["Variação patrimonial", createDropdownValue("variacao-patrimonial")],
]);

export default function BreadcrumbPatrimonioPaginas() {
  const pathname = usePathname();
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[250px]" }}
        generateUrl={(item) => generatePatrimonioUrl({ pagina: item[1].value })}
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
