"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import { generateMunicipioUrl } from "../../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Visão geral", createDropdownValue("visao-geral")],
  ["Obrigações junto ao TCE-ES", createDropdownValue("obrigacao-envio")],
  ["Gestão orçamentária", createDropdownValue("gestao-orcamentaria")],
  ["Gestão fiscal", createDropdownValue("gestao-fiscal")],
  ["Previdência", createDropdownValue("previdencia")],
  ["Rankings", createDropdownValue("rankings")],
  ["Prestação de contas", createDropdownValue("prestacao-conta")],
  ["Fiscalizações", createDropdownValue("fiscalizacao")],
  ["Áreas temáticas", createDropdownValue("area-tematica")],
  ["IEGM", createDropdownValue("iegm")],
  ["Mais informações", createDropdownValue("dados-estatisticos")],
]);

export default function BreadcrumbMunicipiosPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as any;
  const segment = usePathname().split("/")[4];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateMunicipioUrl({ ...routeParams, item, pathname })
        }
        items={PAGES}
        selected={createDropdownValue(segment)}
      />
    </li>
  );
}
