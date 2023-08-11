"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { dropdownStartsWithComparer } from "@/components/dropdowns/dropdown/dropdownComparers";
import { useGlobalState } from "@/providers/GlobalProvider";
import { useParams, usePathname } from "next/navigation";
import { MunicipioPageProps, generateMunicipioUrl, getPagina } from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Visão geral", createDropdownValue("visao-geral")],
  ["Obrigações junto ao TCE-ES", createDropdownValue("obrigacao-de-envio")],
  [
    "Gestão orçamentária",
    createDropdownValue("gestao-orcamentaria/planejamento-governamental"),
  ],
  ["Gestão fiscal", createDropdownValue("gestao-fiscal/meta-arrecadacao")],
  ["Previdência", createDropdownValue("previdencia")],
  ["Rankings", createDropdownValue("rankings")],
  ["Prestação de contas", createDropdownValue("prestacao-conta")],
  ["Fiscalizações", createDropdownValue("fiscalizacao")],
  ["Áreas temáticas", createDropdownValue("area-tematica")],
  ["IEGM", createDropdownValue("iegm")],
  ["Mais informações", createDropdownValue("dados-estatisticos")],
]);

export default function BreadcrumbMunicipiosPaginas() {
  const globalState = useGlobalState();
  const pathname = usePathname();
  const routeParams = useParams() as MunicipioPageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[220px]" }}
        comparer={dropdownStartsWithComparer}
        generateUrl={(item) =>
          generateMunicipioUrl({
            ...routeParams,
            globalState,
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
