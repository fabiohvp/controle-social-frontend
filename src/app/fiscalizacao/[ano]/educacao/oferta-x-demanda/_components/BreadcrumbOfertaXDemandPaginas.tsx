"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";
import {
  OfertaXDemandaLabelPageProps,
  generateOfertaXDemandaUrl,
  getPagina,
} from "../routes";

const PAGES: Map<string, DropdownValue<string>> = new Map([
  ["Distribuição das escolas", createDropdownValue("escolas")],
  ["Distribuição das matrículas", createDropdownValue("matriculas")],
  ["Geolocalização das escolas", createDropdownValue("geolocalizacao")],
  ["Indicadores de desempenho", createDropdownValue("desempenho")],
  ["Índice da educação básica por municípios", createDropdownValue("ideb")],
  ["Percentual de ocupação", createDropdownValue("ocupacao")],
  ["Relatório", createDropdownValue("relatorio")],
  [
    "Sistema informatizado de gestão da educação",
    createDropdownValue("sistema-informatizado"),
  ],
]);

export default function BreadcrumbOfertaXDemandPaginas() {
  const pathname = usePathname();
  const routeParams = useParams() as OfertaXDemandaLabelPageProps;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[340px]" }}
        generateUrl={(item) =>
          generateOfertaXDemandaUrl({
            ...routeParams,
            pathname,
            pagina: item[1].value,
          })
        }
        items={PAGES}
        selected={createDropdownValue(pagina)}
      />
    </li>
  );
}
