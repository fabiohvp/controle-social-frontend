"use client";
import BreadcrumbUnidadeGestora from "@/components/previdencia/BreadcrumbUnidadeGestora";
import { UnidadeGestoraPrevidencia } from "@/shared/previdencia";
import BreadcrumbMunicipioSecao from "../_components/BreadcrumbMunicipioSecao";
import { INDICE_SEGMENTO_SUBPAGINA } from "../routes";
import { PAGINAS_PREVIDENCIA } from "./routes";

type Props = { unidadesGestoras: UnidadeGestoraPrevidencia[] };

export default function BreadcrumbPrevidencia({ unidadesGestoras }: Props) {
  return (
    <BreadcrumbMunicipioSecao paginas={PAGINAS_PREVIDENCIA}>
      <BreadcrumbUnidadeGestora
        unidadesGestoras={unidadesGestoras}
        paginas={PAGINAS_PREVIDENCIA}
        indiceSegmentoPagina={INDICE_SEGMENTO_SUBPAGINA}
      />
    </BreadcrumbMunicipioSecao>
  );
}
