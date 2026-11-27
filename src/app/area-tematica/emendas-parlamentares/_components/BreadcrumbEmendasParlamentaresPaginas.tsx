"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";
import { generateEmendasParlamentaresUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Emendas", createDropdownValue("emendas")],
  ["Despesas", createDropdownValue("despesas")],
  ["Comparativo de receitas", createDropdownValue("comparativo-receitas")],
]);

export default function BreadcrumbEmendasParlamentaresPaginas() {
  const pathname = usePathname();
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[250px]" }}
        generateUrl={(item) =>
          generateEmendasParlamentaresUrl({ pagina: item[1].value })
        }
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
