import { ENV } from "@/shared/env";
import { Esfera } from "@/shared/esfera";
import { cache } from "react";

/*
 * Chamadas da gestão orçamentária que não cabem em `getDadosApiEsfera`:
 * - PlanejamentoGovernamental (controller próprio, parâmetro `esferaAdministrativa` com o código "077");
 * - endpoints com parâmetro repetido (`codigosDetalhamento`).
 */

type Parametro = string | number | string[] | undefined;

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

function getUrl(caminho: string, parametros: Record<string, Parametro>) {
  const query = new URLSearchParams();
  for (const [chave, valor] of Object.entries(parametros)) {
    if (valor === undefined) continue;
    if (Array.isArray(valor)) valor.forEach((v) => query.append(chave, v));
    else query.set(chave, String(valor));
  }
  query.set("v", ENV.apiVersion);
  return `${ENV.apiUrl}/${caminho}?${query}`;
}

/** `EsferaAdministrativaControllers/PlanejamentoGovernamental/<metodo>` (município e estado) */
export async function getDadosPlanejamento<T>(
  esfera: Esfera,
  metodo: string,
  parametros: Record<string, Parametro> = {}
): Promise<T | null> {
  return (await getJson(
    getUrl(`EsferaAdministrativaControllers/PlanejamentoGovernamental/${metodo}`, {
      ...parametros,
      esferaAdministrativa: esfera.codigo,
    })
  )) as T | null;
}

/** `<Municipio|Estado>Controllers/Despesa/GetSankeyFonteRecurso`: usa o código ("077") como id */
export async function getSankeyFonteRecurso<T>(
  esfera: Esfera,
  anoExercicio: number,
  codigoFonte: string,
  codigosDetalhamento: string[]
): Promise<T | null> {
  const controller =
    esfera.tipo === "estado" ? "EstadoControllers" : "MunicipioControllers";
  return (await getJson(
    getUrl(`${controller}/Despesa/GetSankeyFonteRecurso`, {
      idEsferaAdministrativa: esfera.codigo,
      anoExercicio,
      codigosFonteReduzida: codigoFonte,
      codigosDetalhamento,
    })
  )) as T | null;
}
