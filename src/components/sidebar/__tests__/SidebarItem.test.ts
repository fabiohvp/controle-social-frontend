import React from "react";
import { describe, expect, it } from "vitest";
import SidebarItem, {
  hasActiveChild,
  isHrefActive,
} from "../SidebarItem";

describe("SidebarItem active route logic", () => {
  it("matches exact routes", () => {
    expect(
      isHrefActive(
        "/municipio/2026/afonso-claudio/gestao-orcamentaria/receitas",
        "/municipio/2026/afonso-claudio/gestao-orcamentaria/receitas"
      )
    ).toBe(true);
  });

  it("handles trailing slashes on pathname or href", () => {
    expect(
      isHrefActive(
        "/municipio/2026/afonso-claudio/gestao-orcamentaria/receitas/",
        "/municipio/2026/afonso-claudio/gestao-orcamentaria/receitas"
      )
    ).toBe(true);
    expect(
      isHrefActive(
        "/municipio/2026/afonso-claudio/gestao-orcamentaria/receitas",
        "/municipio/2026/afonso-claudio/gestao-orcamentaria/receitas/"
      )
    ).toBe(true);
  });

  it("does not match different sibling routes", () => {
    expect(
      isHrefActive(
        "/municipio/2026/afonso-claudio/gestao-orcamentaria/receitas",
        "/municipio/2026/afonso-claudio/gestao-orcamentaria/despesas"
      )
    ).toBe(false);
  });

  it("matches subpaths with dynamic segments like previdencia", () => {
    expect(
      isHrefActive(
        "/municipio/2026/afonso-claudio/previdencia/receitas",
        "/municipio/2026/afonso-claudio/previdencia/receitas/077E0800001"
      )
    ).toBe(true);
  });

  it("does not match partial prefix route collisions", () => {
    expect(
      isHrefActive(
        "/municipio/2026/afonso-claudio/gestao-fiscal/educacao",
        "/municipio/2026/afonso-claudio/gestao-fiscal/educacao-fundeb"
      )
    ).toBe(false);
  });

  it("distinguishes boletins root month routes from sibling subpages", () => {
    expect(isHrefActive("/boletins/2026/", "/boletins/2026/12")).toBe(true);
    expect(
      isHrefActive("/boletins/2026/", "/boletins/2026/extraordinario")
    ).toBe(false);
    expect(
      isHrefActive(
        "/boletins/2026/extraordinario",
        "/boletins/2026/extraordinario"
      )
    ).toBe(true);
  });

  it("detects active child in nested components", () => {
    const children = React.createElement(
      React.Fragment,
      null,
      React.createElement(SidebarItem<string>, {
        href: "/municipio/2026/afonso-claudio/gestao-orcamentaria/plano-plurianual",
        text: "Plano plurianual",
        tooltip: "Plano plurianual",
      }),
      React.createElement(SidebarItem<string>, {
        href: "/municipio/2026/afonso-claudio/gestao-orcamentaria/receitas",
        text: "Receitas",
        tooltip: "Receitas",
      })
    );

    expect(
      hasActiveChild(
        children,
        "/municipio/2026/afonso-claudio/gestao-orcamentaria/receitas"
      )
    ).toBe(true);

    expect(
      hasActiveChild(
        children,
        "/municipio/2026/afonso-claudio/gestao-fiscal/alertas-lrf"
      )
    ).toBe(false);
  });
});
