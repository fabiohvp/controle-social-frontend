import { redirect } from "next/navigation";
import { cache } from "react";
import {
  CODIGO_UNIDADE_GESTORA_MILITARES,
  PaginaPrevidencia,
  UnidadeGestoraPrevidencia,
  filtrarUnidadesGestorasDaPagina,
} from "./previdencia";
import { readJsonFile } from "./serverJson";
import { UnidadeGestora } from "./unidadeGestora";

/* Funções de previdência só para Server Components (lêem public/data com fs). */

const getUnidadesGestoras = cache(() =>
  readJsonFile<UnidadeGestora[]>("data/unidades-gestoras.json")
);

function getTitulo(ug: UnidadeGestora) {
  const sufixo = ug.codigo.substring(3);
  if (sufixo.startsWith("E08"))
    return ug.codigo.startsWith("500") ? "IPAJM" : "IPAM";
  if (sufixo === "E0900001") return "Fundo Financeiro";
  if (sufixo === "E0900002") return "Fundo Previdenciário";
  return ug.sigla || ug.nome;
}

function toUnidadeGestoraPrevidencia(
  ug: UnidadeGestora
): UnidadeGestoraPrevidencia {
  return { codigo: ug.codigo, nome: ug.nome, titulo: getTitulo(ug) };
}

/**
 * UGs de RPPS do ente (código "E08*" = instituto, "E09*" = fundos da
 * segregação de massa), na mesma regra do site oficial. Instituto primeiro.
 * `codigoEsfera`: "077" (Vitória), "500" (Estado).
 */
export async function getUnidadesGestorasPrevidencia(codigoEsfera: string) {
  const unidadesGestoras = await getUnidadesGestoras();
  return unidadesGestoras
    .filter(
      (ug) =>
        ug.codigo.startsWith(codigoEsfera) &&
        /^E0[89]/.test(ug.codigo.substring(3))
    )
    .sort((a, b) => a.codigo.localeCompare(b.codigo))
    .map(toUnidadeGestoraPrevidencia);
}

export async function getUnidadesGestorasPrevidenciaMilitares() {
  const unidadesGestoras = await getUnidadesGestoras();
  return unidadesGestoras
    .filter((ug) => ug.codigo === CODIGO_UNIDADE_GESTORA_MILITARES)
    .map((ug) => ({ ...toUnidadeGestoraPrevidencia(ug), titulo: "Militares" }));
}

type UnidadeGestoraDaPaginaProps = {
  pagina: PaginaPrevidencia | undefined;
  unidadesGestoras: UnidadeGestoraPrevidencia[];
  /** param `[[...unidadeGestora]]` da rota */
  unidadeGestora: string[] | undefined;
  /** URL da página sem o código da UG, ex.: /municipio/2024/vitoria/previdencia/receitas */
  urlPagina: string;
};

/**
 * Para as page.tsx de previdência: devolve a UG da URL; se ausente ou
 * inválida para a página, redireciona para a primeira UG válida (como o site
 * oficial). Retorna null quando o ente não tem RPPS (a página exibe aviso).
 */
export function getUnidadeGestoraDaPagina({
  pagina,
  unidadesGestoras,
  unidadeGestora,
  urlPagina,
}: UnidadeGestoraDaPaginaProps): UnidadeGestoraPrevidencia | null {
  const validas = filtrarUnidadesGestorasDaPagina(pagina, unidadesGestoras);
  const selecionada = validas.find((ug) => ug.codigo === unidadeGestora?.[0]);

  if (selecionada && unidadeGestora?.length === 1) return selecionada;
  if (!validas.length) return null;
  redirect(`${urlPagina}/${(selecionada ?? validas[0]).codigo}`);
}
