import { ENV } from "@/shared/env";
import {
  Esfera,
  EsferaProps,
  getDadosApiEsfera,
  getUrlApiEsfera,
} from "@/shared/esfera";
import { cache } from "react";

/**
 * Props dos componentes de previdência: independentes do ente (município ou
 * Estado), recebem a esfera e o código da UG (ex.: "077E0900001").
 */
export type PrevidenciaProps = EsferaProps & {
  codigoUnidadeGestora: string;
};

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

function getUrl(controller: string, recurso: string, parametros: Parametros) {
  const query = new URLSearchParams();
  for (const [chave, valor] of Object.entries(parametros)) {
    if (valor !== undefined) query.set(chave, String(valor));
  }
  query.set("v", ENV.apiVersion);
  return `${ENV.apiUrl}/${controller}/${recurso}?${query}`;
}

/** `PrevidenciaControllers/<recurso>`: mesmos métodos para município e Estado (só muda a UG) */
export async function getDadosPrevidencia<T>(
  recurso: string,
  parametros: Parametros
): Promise<T | null> {
  return (await getJson(
    getUrl("PrevidenciaControllers", recurso, parametros)
  )) as T | null;
}

/** `<Municipio|Estado>Controllers/Previdencia/<metodo>`; a API usa `anoReferencia` e `codigoUnidadeGestora` */
export async function getDadosPrevidenciaEnte<T>(
  { esfera, anoExercicio, codigoUnidadeGestora }: PrevidenciaProps,
  metodo: string,
  parametros: Parametros = {}
): Promise<T | null> {
  return (await getJson(
    getUrl(getControllerEsfera(esfera), `Previdencia/${metodo}`, {
      anoReferencia: anoExercicio,
      codigoUnidadeGestora,
      ...parametros,
    })
  )) as T | null;
}

function getControllerEsfera(esfera: Esfera) {
  return esfera.tipo === "estado" ? "EstadoControllers" : "MunicipioControllers";
}

/** `<Municipio|Estado>Controllers/<recurso>` filtrado por `codigosUnidadesGestoras` (ex.: ReceitaDespesa/...) */
export function getDadosUnidadeGestora<T>(
  { esfera, anoExercicio, codigoUnidadeGestora }: PrevidenciaProps,
  recurso: string,
  parametros: Parametros = {}
) {
  return getDadosApiEsfera<T>(esfera, anoExercicio, recurso, {
    codigosUnidadesGestoras: codigoUnidadeGestora,
    ...parametros,
  });
}

/**
 * Valor por classificação de natureza (receita/despesa) de uma UG. A API recebe
 * os códigos como parâmetro repetido (`codigosCompletos=a&codigosCompletos=b`).
 */
export async function getValorPorNatureza(
  { esfera, anoExercicio, codigoUnidadeGestora }: PrevidenciaProps,
  recurso: string,
  codigosCompletos: string[]
): Promise<number | null> {
  const url =
    getUrlApiEsfera(esfera, anoExercicio, recurso, {
      codigosUnidadesGestoras: codigoUnidadeGestora,
    }) + codigosCompletos.map((c) => `&codigosCompletos=${encodeURIComponent(c)}`).join("");
  const resposta = (await getJson(url)) as { valor: number } | null;
  return resposta?.valor ?? null;
}

/** `<Municipio|Estado>Controllers/<recurso>` com `anoExercicio` e `codigoUnidadeGestora` (Receita/Despesa de previdência) */
export async function getDadosPrevidenciaReceitaDespesa<T>(
  { esfera, anoExercicio, codigoUnidadeGestora }: PrevidenciaProps,
  recurso: string
): Promise<T | null> {
  return (await getJson(
    getUrl(getControllerEsfera(esfera), recurso, {
      anoExercicio,
      codigoUnidadeGestora,
    })
  )) as T | null;
}

/** Variação percentual em relação ao ano anterior (gráfico "em relação ao ano anterior") */
export function getComparacaoAnual(
  serie: { ano: number; nome: string; valor: number | null }[] | null
) {
  if (!serie) return null;
  return serie.slice(1).flatMap((item, indice) => {
    const anterior = serie[indice].valor;
    if (!anterior || item.valor === null) return [];
    return [
      {
        ano: item.ano,
        nome: item.nome,
        valor: (item.valor / anterior - 1) * 100,
      },
    ];
  });
}

export const MESES_ABREVIADOS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
