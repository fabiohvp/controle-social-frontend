import { ENV } from "@/shared/env";
import { cache } from "react";

export type FolhaDePagamentoFiltros = {
  ano: string;
  mes: string;
  poder: string;
  unidadeGestora?: string[];
};

type FiltrosApi = {
  anoExercicio: string;
  codigoTipoUnidadeGestora: string;
  codigoUnidadeGestora: string;
  idEsferaAdministrativa: string;
  isMunicipio: string;
  mes: string;
  poder: string;
};

// poder da rota -> { isMunicipio, poder } esperados pela API oficial
const PODERES: Record<string, { isMunicipio: boolean; poder: string }> = {
  "assembleia-legislativa": { isMunicipio: false, poder: "legislativo" },
  "defensoria-publica": { isMunicipio: false, poder: "defensoriaPublica" },
  "executivo-estadual": { isMunicipio: false, poder: "executivo" },
  "executivo-municipal": { isMunicipio: true, poder: "executivo" },
  "judiciario-estadual": { isMunicipio: false, poder: "judiciario" },
  "legislativo-municipal": { isMunicipio: true, poder: "legislativo" },
  "ministerio-publico": { isMunicipio: false, poder: "mp" },
  municipios: { isMunicipio: true, poder: "null" },
  "tribunal-de-contas": { isMunicipio: false, poder: "tc" },
};

/**
 * Converte os parâmetros da rota para os filtros da API.
 * O último segmento de unidadeGestora pode ser: "todos", código da esfera
 * (3 caracteres), código do tipo de UG (2 caracteres) ou código da UG.
 */
export function getFiltrosApi({
  ano,
  mes,
  poder,
  unidadeGestora,
}: FolhaDePagamentoFiltros): FiltrosApi {
  const codigo = unidadeGestora?.[0] ?? "todos";
  const { isMunicipio, poder: poderApi } = PODERES[poder] ?? {
    isMunicipio: false,
    poder: "null",
  };
  const filtros: FiltrosApi = {
    anoExercicio: ano,
    codigoTipoUnidadeGestora: "null",
    codigoUnidadeGestora: "null",
    idEsferaAdministrativa: "null",
    isMunicipio: String(isMunicipio),
    mes,
    poder: poderApi,
  };

  if (codigo === "todos") {
    return filtros;
  }
  if (codigo.length === 2) {
    filtros.codigoTipoUnidadeGestora = codigo;
  } else if (codigo.length === 3) {
    filtros.idEsferaAdministrativa = codigo;
  } else {
    filtros.codigoUnidadeGestora = codigo;
  }
  return filtros;
}

const getApi = cache(
  async (controller: string, acao: string, query: string): Promise<unknown> => {
    try {
      const res = await fetch(`${ENV.apiUrl}/${controller}/${acao}?${query}`);
      return res.ok && res.status !== 204 ? await res.json() : null;
    } catch {
      return null;
    }
  }
);

export async function getFolhaDePagamento<T>(
  acao: string,
  filtros: FolhaDePagamentoFiltros,
  controller = "FolhaPagamentoControllers/FolhaPagamento"
) {
  const query = new URLSearchParams(getFiltrosApi(filtros)).toString();
  return (await getApi(controller, acao, query)) as T | null;
}
