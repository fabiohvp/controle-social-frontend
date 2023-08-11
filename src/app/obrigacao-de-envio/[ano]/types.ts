import { DoughnutChartProps } from "@/components/charts/DoughnutChart";

export type ObrigacaoEnvio = {
  codigo: string;
  situacaoRemessasUnidadeGestoraPCA: Remessa;
  situacaoRemessasUnidadeGestoraPCM: Remessa;
  situacaoRemessasUnidadeGestoraAtos: Remessa;
  situacaoRemessasUnidadeGestoraPCF: Remessa;
  situacaoRemessasUnidadeGestoraRCO: Remessa;
  situacaoRemessasUnidadeGestoraRCB: Remessa;
};

export type ObrigacaoEnvioDoughnutKey =
  | "PCM"
  | "PCA"
  | "Admissão de pessoal"
  | "Folha de pagamento"
  | "Contratação"
  | "Concessão";

export type ObrigacaoEnvioDoughnuts = Partial<{
  [key in ObrigacaoEnvioDoughnutKey]: ObrigacaoEnvioDoughnut;
}>;

export type ObrigacaoEnvioDoughnut = {
  abreviacao: string;
  data?: DoughnutChartProps;
  title: string;
} & StatusRemessas;

export type Remessa = {
  quantidadeObrigacaoEnvio: number;
  quantidadePendente: number;
};

export type Remessas = {
  codigo: string;
  nome: string;
  envio: Remessa;
}[];

export type StatusRemessas = {
  comAtraso: Remessas;
  naoObrigatorias: Remessas;
};
