import path from "node:path";
import { describe, expect, it } from "vitest";
import { extrairHrefsDeJson, extrairHrefsDeTsx, type LinkEncontrado } from "./fontes-links";
import { classificarHref, existeRota, listarPadroesDeRota } from "./rotas";

const RAIZ = process.cwd();
const DIR_APP = path.join(RAIZ, "src", "app");

const FONTES_TSX = [
  "src/components/layout/dashboard/DashboardHeaderMenu.tsx",
];
const DIR_PAINEL = "src/app/(home)/_components/widgets/painel";

/**
 * Links internos que o teste aceita sem rota, com o motivo.
 * Chave: href já resolvido com os valores de exemplo.
 * Se a rota for criada ou o link corrigido, remova a entrada: o teste falha
 * quando uma entrada deixa de ser quebrada.
 */
const ALLOWLIST: Record<string, string> = {
  "/prestacao-de-conta/{prestacao-de-conta-ano}/municipios/governo/07":
    "BUG na home: LinksWidgets.tsx não substitui {prestacao-de-conta-ano} (replaceAnos), o link sai literal. Corrigir na home e remover esta entrada.",
};

const links: LinkEncontrado[] = [
  ...FONTES_TSX.flatMap((arquivo) =>
    extrairHrefsDeTsx(path.join(RAIZ, arquivo), arquivo)
  ),
  ...extrairHrefsDeJson(path.join(RAIZ, DIR_PAINEL), DIR_PAINEL),
];

const origensPorHref = new Map<string, string[]>();
for (const { href, origem } of links) {
  origensPorHref.set(href, [...(origensPorHref.get(href) ?? []), origem]);
}

const internos = [...origensPorHref.entries()]
  .filter(([href]) => classificarHref(href) === "interno")
  .map(([href, origens]) => ({ href, origens }));

const padroes = listarPadroesDeRota(DIR_APP);

describe("extração dos links", () => {
  it("lê links de todas as fontes", () => {
    for (const arquivo of [...FONTES_TSX, DIR_PAINEL]) {
      expect(
        links.some((l) => l.origem.startsWith(arquivo)),
        `nenhum link extraído de ${arquivo}`
      ).toBe(true);
    }
  });

  it("resolve os valores de exemplo dos TSX", () => {
    const hrefs = links.map((l) => l.href);
    expect(hrefs).toContain("/estado/2024/visao-geral");
    expect(hrefs).toContain("/municipio/2024/vitoria/visao-geral");
    expect(hrefs).toContain("/folha-de-pagamento/executivo-municipal/2024/1/visao-geral/077");
  });
});

/**
 * Motivo pelo qual o link está quebrado, ou null se está ok.
 * Placeholder não substituído vem antes da rota: um `[ano]` casaria com `{x-ano}`
 * e o teste daria falso positivo de rota.
 */
function problemaDoLink(href: string): string | null {
  if (/[{}]/.test(href)) return "placeholder não substituído";
  if (!existeRota(href, padroes)) return "sem rota";
  return null;
}

describe("links internos resolvem para uma rota", () => {
  it.each(internos)("$href", ({ href, origens }: { href: string; origens: string[] }) => {
    const problema = problemaDoLink(href);
    if (href in ALLOWLIST) {
      expect(
        problema,
        `entrada da allowlist obsoleta, o link já está ok: ${href}`
      ).not.toBeNull();
      return;
    }
    expect(
      problema,
      `${problema} em ${href} (origem: ${origens.join(", ")})`
    ).toBeNull();
  });
});

describe("externos e âncoras são ignorados", () => {
  it("externos e âncoras ficam fora do conjunto testado", () => {
    const externos = [...origensPorHref.keys()].filter(
      (h) => classificarHref(h) === "externo"
    );
    expect(externos.length).toBeGreaterThanOrEqual(0);
    expect(internos.every((i) => i.href.startsWith("/"))).toBe(true);
  });
});
