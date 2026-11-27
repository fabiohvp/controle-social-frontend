"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { ANO_CORRENTE } from "@/shared/paginas";
import { usePathname } from "next/navigation";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  [
    "Assistência social",
    createDropdownValue("/area-tematica/assistencia-social/referenciamento"),
  ],
  [
    "Atos de pessoal",
    createDropdownValue("/area-tematica/atos-de-pessoal/admissao"),
  ],
  [
    "Desestatizações",
    createDropdownValue("/area-tematica/concessao-publica/visao-geral"),
  ],
  [
    "Contratações públicas",
    createDropdownValue("/area-tematica/contratacoes-publicas/contratacoes"),
  ],
  ["Educação", createDropdownValue("/area-tematica/educacao/visao-geral")],
  [
    "Emendas parlamentares",
    createDropdownValue("/area-tematica/emendas-parlamentares/emendas"),
  ],
  [
    "Estrutura administrativa",
    createDropdownValue("/area-tematica/estrutura-administrativa"),
  ],
  [
    "Pessoal",
    createDropdownValue(
      `/folha-de-pagamento/executivo-municipal/${ANO_CORRENTE}/1/visao-geral`
    ),
  ],
  ["Patrimônio", createDropdownValue("/area-tematica/patrimonio/visao-geral")],
  [
    "Previdência",
    createDropdownValue("/area-tematica/previdencia/visao-geral"),
  ],
  [
    "Saneamento básico",
    createDropdownValue("/area-tematica/saneamento-basico/agua-esgoto"),
  ],
  ["Saúde", createDropdownValue("/area-tematica/saude/estabelecimentos")],
]);

export default function BreadcrumbAreaTematicaPaginas() {
  const area = usePathname().split("/")[2].split("/")[0];

  return (
    <li>
      <DropdownLinks
        comparer={dropdownStartsWithComparer}
        generateUrl={([_, value]) => value.value}
        items={PAGES}
        selected={createDropdownValue(`/area-tematica/${area}`)}
      />
    </li>
  );
}
