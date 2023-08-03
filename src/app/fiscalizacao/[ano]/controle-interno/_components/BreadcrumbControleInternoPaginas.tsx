"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import {
  ControleInternoPageProps,
  generateControleInternoUrl,
  getPagina,
} from "../routes";

const CONTROLE_INTERNO_PAGINAS: Map<string, DropdownValue<string>> = new Map([
  ["Câmaras", createDropdownValue("camaras")],
  ["Prefeituras", createDropdownValue("prefeituras")],
]);

export default function BreadcrumbControleInternoPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as ControleInternoPageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generateControleInternoUrl({
            ...routeParams,
            item,
            pagina: item[1].value,
            pathname,
          })
        }
        items={CONTROLE_INTERNO_PAGINAS}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
