"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import {
  ObrigacaoEnvioPageProps,
  generateObrigacaoEnvioUrl,
  getPagina,
} from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Municípios", createDropdownValue("municipios")],
  ["Estado", createDropdownValue("estado")],
]);

export default function BreadcrumbObrigacaoEnvioPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as ObrigacaoEnvioPageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateObrigacaoEnvioUrl({
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
