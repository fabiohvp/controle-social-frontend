export type ResumoProcessoKey =
  | "Aprovação"
  | "Aprovação com ressalva"
  | "Rejeição"
  | "Extinção sem resolução de mérito"
  | "semITC"
  | "comITC"
  | "Regulares"
  | "Regulares com ressalvas"
  | "Irregular";

export type ResumoProcessos = {
  [key in ResumoProcessoKey]: number;
};

export type SituacaoProcesso = {
  chaveSeguranca: string;
  className: string;
  processo: {
    id: number;
    numeroCompleto: string;
    possuiITC: boolean;
    relator: string;
    responsaveis: {
      chaveSegurancaDeliberacao?: string;
      chaveSegurancaParecerSimplificado?: string;
      chaveSegurancaRecurso?: string;
      deliberacao?: string;
      idDocumentoDeliberacao?: number;
      idParecerPrevioSimplificado?: number;
      idProcessoEtceesRecurso?: number;
      nome: string;
      numeroCompletoRecurso?: string;
      numeroParecerPrevioSimplificado?: string;
      possuiITC: boolean;
      resultado?: string;
    }[];
    unidadesGestoras: {
      codigo: string;
      nome: string;
    }[];
  };
};
