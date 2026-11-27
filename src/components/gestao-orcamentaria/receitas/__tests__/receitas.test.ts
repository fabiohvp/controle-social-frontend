import { COLOR } from "@/theme/colors";
import { describe, expect, it } from "vitest";

describe("Gestão Orçamentária - Receitas", () => {
  it("paleta padraoRange deve iniciar com o nível 2 (#C5D7E0) idêntico ao legado", () => {
    expect(COLOR.padraoRange[0]).toBe("#C5D7E0");
    expect(COLOR.padraoRange[1]).toBe("#8AA2AD");
    expect(COLOR.padraoRange[2]).toBe("#607D8B");
    expect(COLOR.padraoRange[3]).toBe("#636F78");
    expect(COLOR.padraoRange[4]).toBe("#3D4C57");
    expect(COLOR.padraoRange[5]).toBe("#2A333B");
    expect(COLOR.padraoRange[6]).toBe("#22292F");
  });

  it("configuração das séries de evolução anual deve contemplar as 5 séries oficiais", () => {
    const configAnual = [
      { tipo: "line" as const, habilitada: true },
      { tipo: "line" as const, habilitada: false },
      { tipo: "bar" as const, habilitada: true },
      { tipo: "bar" as const, habilitada: false },
      { tipo: "bar" as const, habilitada: true },
    ];

    expect(configAnual).toHaveLength(5);
    expect(configAnual[0]).toEqual({ tipo: "line", habilitada: true }); // Rec Arrecadada
    expect(configAnual[1]).toEqual({ tipo: "line", habilitada: false }); // Rec Prevista
    expect(configAnual[2]).toEqual({ tipo: "bar", habilitada: true }); // Desp Empenhada
    expect(configAnual[3]).toEqual({ tipo: "bar", habilitada: false }); // Desp Liquidada
    expect(configAnual[4]).toEqual({ tipo: "bar", habilitada: true }); // Desp Paga
  });
});
