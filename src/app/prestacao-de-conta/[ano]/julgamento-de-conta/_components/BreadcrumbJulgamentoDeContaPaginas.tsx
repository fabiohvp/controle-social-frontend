"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useGlobalState } from "@/providers/GlobalProvider";
import { useParams, usePathname } from "next/navigation";
import {
  JulgamentoDeContaPageProps,
  generateJulgamentoDeContaUrl,
  getPagina,
} from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Município", createDropdownValue("municipio")],
  ["Sessão", createDropdownValue("sessao")],
  ["Visão geral", createDropdownValue("visao-geral")],
]);

export default function BreadcrumbJulgamentoDeContaPaginas() {
  const globalState = useGlobalState();
  const pathname = usePathname();
  const routeParams = useParams() as JulgamentoDeContaPageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateJulgamentoDeContaUrl({
            ...routeParams,
            pathname,
            globalState,
            pagina: item[1].value,
          })
        }
        items={PAGES}
        selected={createDropdownValue(pagina ?? "municipio")}
      />
    </li>
  );
}
