"use client";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, DropdownValue<string>>[] = [
  {
    key: "Distribuição das escolas",
    value: createDropdownValue("escolas"),
  },
  {
    key: "Distribuição das matrículas",
    value: createDropdownValue("matriculas"),
  },
  {
    key: "Geolocalização das escolas",
    value: createDropdownValue("geolocalizacao"),
  },
  {
    key: "Indicadores de desempenho",
    value: createDropdownValue("desempenho"),
  },
  {
    key: "Índice da educação básica por municípios",
    value: createDropdownValue("ideb"),
  },
  {
    key: "Percentual de ocupação",
    value: createDropdownValue("ocupacao"),
  },
  {
    key: "Relatório",
    value: createDropdownValue("relatorio"),
  },
  {
    key: "Sistema informatizado de gestão da educação",
    value: createDropdownValue("sistema-informatizado"),
  },
];

export default function MenuFiscalizacaoOfertaXDemandaPages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[5];

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[350px]" }}
        generateUrl={(item) =>
          `/fiscalizacao/${routeParams.ano}/educacao/oferta-x-demanda/${item.value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
