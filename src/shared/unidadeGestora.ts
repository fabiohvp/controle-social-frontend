import UNIDADES_GESTORAS from "@/data/unidades-gestoras.json";
import { makeSortedMapByValue } from "@/types/Array";

export type UnidadeGestora = (typeof UNIDADES_GESTORAS)[0];

export const CODIGO_UNIDADE_GESTORA_CONSORCIO = "501";
export const CODIGO_UNIDADE_GESTORA_ESTADUAL = "500";

export function getUnidadesGestoras(): UnidadeGestora[] {
  return UNIDADES_GESTORAS;
}

export function getUnidadesGestorasConsorcios(): UnidadeGestora[] {
  return UNIDADES_GESTORAS.filter((ug) =>
    ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_CONSORCIO)
  );
}

export function getUnidadesGestorasEstaduais(): UnidadeGestora[] {
  return UNIDADES_GESTORAS.filter((ug) =>
    ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL)
  );
}

export function getUnidadesGestorasMunicipais(): UnidadeGestora[] {
  return UNIDADES_GESTORAS.filter(
    (ug) =>
      !ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL) &&
      !ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_CONSORCIO)
  );
}

export function getTipoUnidadesGestorasEstaduais(): Map<string, string> {
  const unidadesGestoras = UNIDADES_GESTORAS.filter((ug) =>
    ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL)
  );
  const tiposUnidadesGestoras = new Map<string, string>();

  for (const unidadeGestora of unidadesGestoras) {
    tiposUnidadesGestoras.set(
      unidadeGestora.codigo.substring(4, 6),
      unidadeGestora.tipoUnidadeGestora
    );
  }
  makeSortedMapByValue(tiposUnidadesGestoras, ([_, value]) => value);
  return tiposUnidadesGestoras;
}

export function getTipoUnidadesGestorasMunicipais(): Map<string, string> {
  const unidadesGestoras = UNIDADES_GESTORAS.filter(
    (ug) =>
      !ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_ESTADUAL) &&
      !ug.codigo.startsWith(CODIGO_UNIDADE_GESTORA_CONSORCIO)
  );
  const tiposUnidadesGestoras = new Map<string, string>();

  for (const unidadeGestora of unidadesGestoras) {
    tiposUnidadesGestoras.set(
      unidadeGestora.codigo.substring(4, 6),
      unidadeGestora.tipoUnidadeGestora
    );
  }
  makeSortedMapByValue(tiposUnidadesGestoras, ([_, value]) => value);
  return tiposUnidadesGestoras;
}
