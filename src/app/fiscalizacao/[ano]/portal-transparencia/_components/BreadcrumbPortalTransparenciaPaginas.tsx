"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import {
  PortalTransparenciaPageProps,
  generatePortalTransparenciaUrl,
  getPagina,
} from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Câmaras", createDropdownValue("camaras")],
  ["Prefeituras", createDropdownValue("prefeituras")],
  ["Estado", createDropdownValue("estado")],
]);

export default function BreadcrumbPortalTransparenciaPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as PortalTransparenciaPageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          generatePortalTransparenciaUrl({
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
