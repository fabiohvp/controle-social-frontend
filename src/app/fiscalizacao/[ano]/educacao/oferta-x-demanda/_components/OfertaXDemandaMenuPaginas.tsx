"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams, usePathname } from "next/navigation";

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

export default function OfertaXDemandaMenuPaginas() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[5];

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[350px]" }}
        generateUrl={([_, value]) =>
          `/fiscalizacao/${routeParams.ano}/educacao/oferta-x-demanda/${value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
