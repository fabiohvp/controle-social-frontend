import { ENV } from "@/shared/env";
import { Esfera } from "@/shared/esfera";
import { cache } from "react";

type Parametros = Record<string, string | number | undefined>;

const getJson = cache(async (url: string): Promise<unknown> => {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const texto = await res.text();
    return texto ? JSON.parse(texto) : null;
  } catch {
    return null;
  }
});

/**
 * GET em controllers que não seguem o padrão `<Municipio|Estado>Controllers`
 * (ex.: `CAPAGControllers/CAPAG`, `IVFControllers/IVF`), sempre com
 * `anoExercicio` e `idEsferaAdministrativa`. Retorna null em erro/resposta vazia.
 */
export async function getDadosApiController<T>(
  recurso: string,
  esfera: Esfera,
  anoExercicio: number,
  parametros: Parametros = {}
): Promise<T | null> {
  const query = new URLSearchParams();
  query.set("idEsferaAdministrativa", String(esfera.idEsferaAdministrativa));
  query.set("anoExercicio", String(anoExercicio));
  for (const [chave, valor] of Object.entries(parametros)) {
    if (valor !== undefined) query.set(chave, String(valor));
  }
  query.set("v", ENV.apiVersion);
  return (await getJson(`${ENV.apiUrl}/${recurso}?${query}`)) as T | null;
}

/** "15,00%" => 15 */
export function percentualParaNumero(valor: string | null | undefined) {
  if (!valor) return null;
  const numero = Number(valor.replace("%", "").replace(/\./g, "").replace(",", "."));
  return Number.isNaN(numero) ? null : numero;
}
