"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { useParams, usePathname } from "next/navigation";
import {
  FolhaDePagamentoPageProps,
  generateFolhaDePagamentoUrl,
  getPagina,
} from "../[poder]/[ano]/[mes]/routes";

const FOLHA_DE_PAGAMENTO_PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Visão geral", createDropdownValue("visao-geral")],
  ["Ativos", createDropdownValue("ativos")],
  ["Beneficiários", createDropdownValue("beneficiarios")],
  ["Estagiários", createDropdownValue("estagiarios")],
  [
    "Ingressos e desligamentos",
    createDropdownValue("contratacoes-e-demissoes"),
  ],
  ["Consulta de vínculo", createDropdownValue("consulta-vinculo")],
]);

export default function BreadcrumbFolhaDePagamentoPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as FolhaDePagamentoPageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) =>
          generateFolhaDePagamentoUrl({
            ...routeParams,
            item,
            pathname,
            pagina: item[1].value,
          })
        }
        items={FOLHA_DE_PAGAMENTO_PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
