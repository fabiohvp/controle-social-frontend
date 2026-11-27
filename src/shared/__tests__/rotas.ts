import { readdirSync, statSync } from "node:fs";
import path from "node:path";

/**
 * Resolução de rotas do App Router, sem dependência do Next.
 * Funções puras (padraoDeArquivo, casaPadrao, existeRota, classificarHref) e
 * uma listagem de `src/app` (listarPadroesDeRota) usada pelos testes.
 */

export type Segmento =
  | { tipo: "estatico"; valor: string }
  | { tipo: "dinamico" }
  | { tipo: "catchAll" }
  | { tipo: "catchAllOpcional" };

export type PadraoRota = Segmento[];

export type ClasseHref = "interno" | "externo" | "ancora" | "desconhecido";

const ARQUIVOS_DE_ROTA = /^(page|route)\.(tsx|ts|jsx|js)$/;

/**
 * Converte o caminho de um `page`/`route` (relativo a `src/app`) no padrão de URL.
 * Retorna null quando o arquivo não gera rota:
 * - não é page/route;
 * - está em pasta privada (`_x`);
 * - é rota interceptada (`(.)x`, `(..)x`, `(...)x`).
 * Grupos `(x)` e slots paralelos `@x` não aparecem na URL.
 */
export function padraoDeArquivo(relativo: string): PadraoRota | null {
  const partes = relativo.split(/[\\/]/);
  const arquivo = partes.pop();
  if (!arquivo || !ARQUIVOS_DE_ROTA.test(arquivo)) return null;

  const padrao: PadraoRota = [];
  for (const parte of partes) {
    if (parte.startsWith("_")) return null;
    if (/^\(\.{1,3}\)/.test(parte)) return null;
    if (/^\(.+\)$/.test(parte)) continue;
    if (parte.startsWith("@")) continue;

    const catchAllOpcional = /^\[\[\.\.\.[^\]]+\]\]$/.test(parte);
    if (catchAllOpcional) {
      padrao.push({ tipo: "catchAllOpcional" });
      continue;
    }
    if (/^\[\.\.\.[^\]]+\]$/.test(parte)) {
      padrao.push({ tipo: "catchAll" });
      continue;
    }
    if (/^\[[^\]]+\]$/.test(parte)) {
      padrao.push({ tipo: "dinamico" });
      continue;
    }
    padrao.push({ tipo: "estatico", valor: parte });
  }
  return padrao;
}

/** Quebra o href em segmentos, descartando query, hash e barras extras. */
export function segmentosDoHref(href: string): string[] {
  const caminho = href.split(/[?#]/)[0];
  return caminho.split("/").filter((s) => s !== "");
}

/** Indica se os segmentos casam com o padrão inteiro. */
export function casaPadrao(segmentos: string[], padrao: PadraoRota): boolean {
  return casa(segmentos, 0, padrao, 0);
}

function casa(
  segmentos: string[],
  i: number,
  padrao: PadraoRota,
  j: number
): boolean {
  if (j === padrao.length) return i === segmentos.length;
  const segmento = padrao[j];
  switch (segmento.tipo) {
    case "estatico":
      return (
        i < segmentos.length &&
        segmentos[i] === segmento.valor &&
        casa(segmentos, i + 1, padrao, j + 1)
      );
    case "dinamico":
      return i < segmentos.length && casa(segmentos, i + 1, padrao, j + 1);
    case "catchAll":
      for (let k = i + 1; k <= segmentos.length; k++) {
        if (casa(segmentos, k, padrao, j + 1)) return true;
      }
      return false;
    case "catchAllOpcional":
      for (let k = i; k <= segmentos.length; k++) {
        if (casa(segmentos, k, padrao, j + 1)) return true;
      }
      return false;
  }
}

/** Indica se algum dos padrões atende ao href. */
export function existeRota(href: string, padroes: PadraoRota[]): boolean {
  const segmentos = segmentosDoHref(href);
  return padroes.some((padrao) => casaPadrao(segmentos, padrao));
}

/** Classifica o href: só `/caminho` é link interno verificável. */
export function classificarHref(href: string): ClasseHref {
  if (href.startsWith("#")) return "ancora";
  if (href.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(href)) {
    return "externo";
  }
  if (href.startsWith("/")) return "interno";
  return "desconhecido";
}

/** Lista os padrões de rota de um diretório `src/app`. */
export function listarPadroesDeRota(dirApp: string): PadraoRota[] {
  const padroes: PadraoRota[] = [];
  const percorrer = (dir: string, relativo: string) => {
    for (const nome of readdirSync(dir)) {
      const absoluto = path.join(dir, nome);
      const relativoNovo = relativo ? `${relativo}/${nome}` : nome;
      if (statSync(absoluto).isDirectory()) {
        percorrer(absoluto, relativoNovo);
        continue;
      }
      const padrao = padraoDeArquivo(relativoNovo);
      if (padrao) padroes.push(padrao);
    }
  };
  percorrer(dirApp, "");
  return padroes;
}
