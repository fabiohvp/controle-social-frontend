"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Distribuição das escolas",
    value: "escolas",
  },
  {
    key: "Distribuição das matrículas",
    value: "matriculas",
  },
  {
    key: "Geolocalização das escolas",
    value: "geolocalizacao",
  },
  {
    key: "Indicadores de desempenho",
    value: "desempenho",
  },
  {
    key: "Índice da educação básica por municípios",
    value: "ideb",
  },
  {
    key: "Percentual de ocupação",
    value: "ocupacao",
  },
  {
    key: "Relatório",
    value: "relatorio",
  },
  {
    key: "Sistema informatizado de gestão da educação",
    value: "sistema-informatizado",
  },
];

export default function MenuFiscalizacaoOfertaXDemanda() {
  const routeParams = useParams();
  const segments = usePathname().split(`/`)[5];

  return (
    <li>
      <DropdownLinks
        bodyClassName="!min-w-[350px]"
        generateUrl={(item) =>
          `/fiscalizacao/${routeParams.ano}/educacao/oferta-x-demanda/${item.value}`
        }
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
