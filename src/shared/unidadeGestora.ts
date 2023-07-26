import UNIDADES_GESTORAS from "@/data/unidades-gestoras.json";

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
