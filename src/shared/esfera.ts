import { CSSProperties, cache } from "react";
import { ENV } from "./env";
import { getMunicipios } from "./municipio";

export type TipoEsfera = "municipio" | "estado";

/**
 * Ente consultado na API. Município e Estado usam os mesmos métodos, mas em
 * controllers diferentes (`MunicipioControllers/*` x `EstadoControllers/*`) e
 * com `idEsferaAdministrativa` diferente (município = código numérico, ex.:
 * Vitória "077" => 77; Estado = 81). É o mesmo critério do site oficial.
 */
export type Esfera = {
  tipo: TipoEsfera;
  idEsferaAdministrativa: number;
  /** código com 3 dígitos (prefixo dos códigos de UG), ex.: "077", "500" */
  codigo: string;
  nome: string;
};

/** Props de componentes compartilhados entre município e estado */
export type EsferaProps = {
  esfera: Esfera;
  anoExercicio: number;
  style?: CSSProperties;
};

export const ESFERA_ESTADO: Esfera = {
  tipo: "estado",
  idEsferaAdministrativa: 81,
  codigo: "500",
  nome: "Estado do Espírito Santo",
};

const CONTROLLERS: Record<TipoEsfera, string> = {
  municipio: "MunicipioControllers",
  estado: "EstadoControllers",
};

export async function getEsferaMunicipio(
  nomeNormalizado: string
): Promise<Esfera | null> {
  const municipios = await getMunicipios();
  const municipio = municipios.find(
    (m) => m.nomeNormalizado === nomeNormalizado
  );
  if (!municipio) return null;
  return {
    tipo: "municipio",
    idEsferaAdministrativa: Number(municipio.codigo),
    codigo: municipio.codigo,
    nome: municipio.nome,
  };
}

type Parametros = Record<string, string | number | boolean | undefined>;

/**
 * URL de `<Municipio|Estado>Controllers/<recurso>` com idEsferaAdministrativa,
 * anoExercicio e a versão da API. Ex.: recurso = "Receita/GetEvolucaoMensalReceitaCorrenteLiquida".
 */
export function getUrlApiEsfera(
  esfera: Esfera,
  anoExercicio: number,
  recurso: string,
  parametros: Parametros = {}
) {
  const query = new URLSearchParams();
  query.set("idEsferaAdministrativa", String(esfera.idEsferaAdministrativa));
  query.set("anoExercicio", String(anoExercicio));
  for (const [chave, valor] of Object.entries(parametros)) {
    if (valor !== undefined) query.set(chave, String(valor));
  }
  query.set("v", ENV.apiVersion);
  return `${ENV.apiUrl}/${CONTROLLERS[esfera.tipo]}/${recurso}?${query}`;
}

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

/** GET na API do ente; retorna null em erro/resposta vazia (a página mostra "sem dados") */
export async function getDadosApiEsfera<T>(
  esfera: Esfera,
  anoExercicio: number,
  recurso: string,
  parametros?: Parametros
): Promise<T | null> {
  return (await getJson(
    getUrlApiEsfera(esfera, anoExercicio, recurso, parametros)
  )) as T | null;
}
