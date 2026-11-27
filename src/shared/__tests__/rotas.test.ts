import { describe, expect, it } from "vitest";
import {
  casaPadrao,
  classificarHref,
  existeRota,
  padraoDeArquivo,
  segmentosDoHref,
} from "./rotas";

describe("padraoDeArquivo", () => {
  it("raiz e grupos (x) não entram na URL", () => {
    expect(padraoDeArquivo("page.tsx")).toEqual([]);
    expect(padraoDeArquivo("(home)/page.tsx")).toEqual([]);
  });

  it("converte segmentos estáticos e dinâmicos", () => {
    expect(
      padraoDeArquivo("municipio/[ano]/[municipio]/(root)/visao-geral/page.tsx")
    ).toEqual([
      { tipo: "estatico", valor: "municipio" },
      { tipo: "dinamico" },
      { tipo: "dinamico" },
      { tipo: "estatico", valor: "visao-geral" },
    ]);
  });

  it("reconhece catch-all e catch-all opcional, e aceita route.ts", () => {
    expect(padraoDeArquivo("docs/[...slug]/route.ts")).toEqual([
      { tipo: "estatico", valor: "docs" },
      { tipo: "catchAll" },
    ]);
    expect(padraoDeArquivo("boletins/[[...x]]/page.tsx")).toEqual([
      { tipo: "estatico", valor: "boletins" },
      { tipo: "catchAllOpcional" },
    ]);
  });

  it("pastas privadas (_x) não geram rota", () => {
    expect(padraoDeArquivo("_components/page.tsx")).toBeNull();
    expect(padraoDeArquivo("a/_privado/b/page.tsx")).toBeNull();
  });

  it("rotas interceptadas (.)x, (..)x, (...)x não geram rota", () => {
    expect(padraoDeArquivo("@modal/(.)foto/page.tsx")).toBeNull();
    expect(padraoDeArquivo("(..)feed/page.tsx")).toBeNull();
    expect(padraoDeArquivo("(...)x/y/page.tsx")).toBeNull();
  });

  it("slots paralelos @x não entram na URL", () => {
    expect(padraoDeArquivo("a/@slot/b/page.tsx")).toEqual([
      { tipo: "estatico", valor: "a" },
      { tipo: "estatico", valor: "b" },
    ]);
  });

  it("arquivos que não são page/route não geram rota", () => {
    expect(padraoDeArquivo("a/layout.tsx")).toBeNull();
    expect(padraoDeArquivo("a/_components/Card.tsx")).toBeNull();
  });

  it("aceita separador de Windows", () => {
    expect(padraoDeArquivo("a\\[x]\\page.tsx")).toEqual([
      { tipo: "estatico", valor: "a" },
      { tipo: "dinamico" },
    ]);
  });
});

describe("casaPadrao / existeRota", () => {
  const municipio = padraoDeArquivo("municipio/[ano]/[municipio]/(root)/visao-geral/page.tsx")!;
  const todos = [
    padraoDeArquivo("page.tsx")!,
    municipio,
    padraoDeArquivo("docs/[...slug]/page.tsx")!,
    padraoDeArquivo("boletins/[[...x]]/page.tsx")!,
  ];

  it("dinâmico casa exatamente um segmento não vazio", () => {
    expect(existeRota("/municipio/2024/vitoria/visao-geral", todos)).toBe(true);
    expect(existeRota("/municipio/2024/visao-geral", todos)).toBe(false);
    expect(existeRota("/municipio/2024/vitoria/outra", todos)).toBe(false);
  });

  it("estático exige igualdade exata", () => {
    expect(existeRota("/municipio/2024/vitoria/Visao-geral", todos)).toBe(false);
  });

  it("catch-all exige pelo menos um segmento", () => {
    expect(existeRota("/docs", todos)).toBe(false);
    expect(existeRota("/docs/a", todos)).toBe(true);
    expect(existeRota("/docs/a/b/c", todos)).toBe(true);
  });

  it("catch-all opcional casa com ou sem segmentos", () => {
    expect(existeRota("/boletins", todos)).toBe(true);
    expect(existeRota("/boletins/2024/x", todos)).toBe(true);
  });

  it("raiz casa com /", () => {
    expect(existeRota("/", todos)).toBe(true);
  });

  it("ignora barra final, query e hash", () => {
    expect(existeRota("/boletins/2024/", todos)).toBe(true);
    expect(existeRota("/municipio/2024/vitoria/visao-geral?x=1#topo", todos)).toBe(true);
    expect(segmentosDoHref("//a//b/")).toEqual(["a", "b"]);
  });

  it("casaPadrao compara o padrão inteiro", () => {
    expect(casaPadrao(["municipio", "2024"], municipio)).toBe(false);
  });
});

describe("classificarHref", () => {
  it("separa interno, externo, âncora e desconhecido", () => {
    expect(classificarHref("/estado/2024/visao-geral")).toBe("interno");
    expect(classificarHref("https://paineldecontrole.tcees.tc.br/x")).toBe("externo");
    expect(classificarHref("http://exemplo.com")).toBe("externo");
    expect(classificarHref("//exemplo.com/x")).toBe("externo");
    expect(classificarHref("mailto:a@b.c")).toBe("externo");
    expect(classificarHref("#topo")).toBe("ancora");
    expect(classificarHref("sem-barra")).toBe("desconhecido");
  });
});
