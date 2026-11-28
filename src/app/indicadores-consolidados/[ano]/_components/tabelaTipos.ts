/* Tipos serializáveis (servidor -> cliente) das tabelas de Indicadores Consolidados */

export type FormatoIndicador =
  | "moeda" // 79,10M / 2,44K / 146,36
  | "percentual" // 48,56%
  | "decimal" // 0,51
  | "inteiro" // 270
  | "texto";

export type IconeIndicador =
  | "polegarCima"
  | "polegarBaixo"
  | "mao"
  | "check"
  | "alerta"
  | "setaCima"
  | "setaBaixo";

export type CelulaIndicador = {
  v: number | string | null;
  /** tooltip (ex.: valor exato "R$ 79.096.624,55") */
  titulo?: string;
  icone?: IconeIndicador;
  corIcone?: string;
  link?: string;
  /** largura da barra (0..1) quando não deriva do valor (ex.: notas A/B/C) */
  barra?: number | null;
  sufixo?: string;
};

export type ColunaIndicador = {
  chave: string;
  titulo: string;
  formato: FormatoIndicador;
  /** barra proporcional ao maior valor da coluna, como no site oficial */
  barra?: boolean;
  alinhar?: "left" | "center" | "right";
};

export type LinhaIndicador = {
  chave: string;
  municipio: string;
  celulas: Record<string, CelulaIndicador>;
};

export type TabelaIndicadorDados = {
  /** linha de agrupamento acima dos títulos (ex.: Consolidada/Executivo/Legislativo) */
  grupos?: { titulo: string; span: number }[];
  colunas: ColunaIndicador[];
  linhas: LinhaIndicador[];
  /** observação exibida abaixo da tabela */
  nota?: string;
};
