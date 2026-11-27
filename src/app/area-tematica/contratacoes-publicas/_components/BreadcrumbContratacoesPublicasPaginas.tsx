"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { usePathname } from "next/navigation";
import { generateContratacoesPublicasUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Contratações", createDropdownValue("contratacoes")],
  ["Instrumentos", createDropdownValue("instrumentos")],
  ["Atas de Registro de Preços", createDropdownValue("atas-registro-precos")],
  [
    "Obras e serviços de engenharia",
    createDropdownValue("obras-servicos-engenharia"),
  ],
]);

export default function BreadcrumbContratacoesPublicasPaginas() {
  const pathname = usePathname();
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[280px]" }}
        generateUrl={(item) =>
          generateContratacoesPublicasUrl({ pagina: item[1].value })
        }
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
