import { ESFERA_ESTADO, getDadosApiEsfera } from "@/shared/esfera";

/**
 * Helpers das páginas de gestão orçamentária/fiscal do Estado (#14).
 * Todas chamam `EstadoControllers/<Recurso>/<Metodo>` com idEsferaAdministrativa=81,
 * como o site oficial. Alguns métodos do site oficial (ex.: DespesasReceitas)
 * usam `MunicipioControllers` com o id do Estado: ver `getDadosLimiteDespesaReceita`.
 */
type Parametros = Record<string, string | number | boolean | undefined>;

export function getDadosEstado<T>(
  anoExercicio: number,
  recurso: string,
  parametros?: Parametros
) {
  return getDadosApiEsfera<T>(ESFERA_ESTADO, anoExercicio, recurso, parametros);
}

/**
 * Alguns métodos do site oficial, para o Estado, usam `MunicipioControllers/*`
 * com idEsferaAdministrativa=81 (ex.: LimiteDespesaReceita e as composições do FUNDEB).
 */
export function getDadosMunicipioNoEstado<T>(
  anoExercicio: number,
  recurso: string
) {
  return getDadosApiEsfera<T>(
    { ...ESFERA_ESTADO, tipo: "municipio" },
    anoExercicio,
    recurso
  );
}

export function getDadosLimiteDespesaReceita<T>(
  anoExercicio: number,
  metodo: string
) {
  return getDadosMunicipioNoEstado<T>(
    anoExercicio,
    `LimiteDespesaReceita/${metodo}`
  );
}

/** Módulos (`tipoModulo`) exigidos pelo Estado em algumas séries de pessoal */
export const TIPO_MODULO_PESSOAL = {
  consolidado: 503,
  executivo: 504,
  judiciario: 505,
  legislativo: 506,
  ministerioPublico: 507,
  tribunalContas: 508,
  defensoriaPublica: 511,
} as const;
