export type IegeIndices = {
  ano: number;
  iIEGE: string;
  iEduc: string;
  iSaude: string;
  iPlanejamento: string;
  iFiscal: string;
  iAmb: string;
  iDes: string;
  iSegp: string;
  idRelatorio?: number | null;
  idAcordao?: number | null;
  idInstrucao?: number | null;
};

/** Cores das notas (mesmas do painel oficial). */
const COR_NOTA: Record<string, string> = {
  a: "#2F9E23",
  amais: "#2F9E23",
  bmais: "#A7D489",
  b: "#FFF8B8",
  cmais: "#F4B350",
  c: "#E68364",
};
const COR_NOTA_OMISSA = "#F0F0F0";

export function formatarNota(nota?: string | null) {
  if (!nota) return "?";
  return nota.replace("mais", "+").replace("indefinido", "?").toUpperCase();
}

export function getCorNota(nota?: string | null) {
  return (nota && COR_NOTA[nota]) || COR_NOTA_OMISSA;
}
