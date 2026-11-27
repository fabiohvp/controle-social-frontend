import { ENV } from "@/shared/env";
import { cache } from "react";

export type ControllerTransparencia =
  | "TransparenciaControleInterno"
  | "TransparenciaPassiva"
  | "TransparenciaPortal";

export type AcaoTransparencia =
  | "GetTransparenciaEstado"
  | "GetTransparenciaExecutivo"
  | "GetTransparenciaLegislativo";

export type RankingEsferaAdministrativa = {
  codigoEsferaAdministrativa: string;
  nomeEsferaAdministrativa: string;
  posicao: number;
  valor: number | null;
};

export type RankingUnidadeGestora = {
  codigoUnidadeGestora: string;
  nomeUnidadeGestora: string;
  posicao: number;
  valor: number | null;
};

export type FaixaTransparencia = {
  cor: string;
  descricao: string;
  limite: number;
};

// limites configurados em /api/Settings/GetAll (limites.esferaAdministrativaTransparencia*)
export const FAIXAS_TRANSPARENCIA: FaixaTransparencia[] = [
  { cor: "#E57373", descricao: "Até 25%.", limite: 25.01 },
  { cor: "#F4A261", descricao: "Entre 25,01% e 40%.", limite: 40.01 },
  { cor: "#F2D16B", descricao: "Entre 40,01% e 60%.", limite: 60.01 },
  { cor: "#8CC084", descricao: "Acima de 60,01%.", limite: Infinity },
];

export const COR_OMISSO = "#BDBDBD";

export function getFaixa(valor: number | null) {
  if (valor === null || valor === undefined) {
    return null;
  }
  return FAIXAS_TRANSPARENCIA.find((f) => valor < f.limite) ?? null;
}

export function getCor(valor: number | null) {
  return getFaixa(valor)?.cor ?? COR_OMISSO;
}

export const getRankingTransparencia = cache(
  async <T>(
    controller: ControllerTransparencia,
    acao: AcaoTransparencia,
    ano: string
  ): Promise<T[] | null> => {
    try {
      const res = await fetch(
        `${ENV.apiUrl}/TransparenciaControllers/${controller}/${acao}?anoExercicio=${ano}&v=${ENV.apiVersion}`
      );
      if (!res.ok) {
        return null;
      }
      const text = await res.text();
      return text ? (JSON.parse(text) as T[]) : null;
    } catch {
      return null;
    }
  }
);
