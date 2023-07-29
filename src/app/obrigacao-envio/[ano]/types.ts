import { DoughnutChartProps } from "@/components/charts/DoughnutChart";

export type ObrigacaoEnvio = {
  ano: number;
  codigoEsferaAdministrativa: string;
  codigo: string;
  situacaoRemessasUnidadeGestoraPCA: Remessa;
  situacaoRemessasUnidadeGestoraPCM: Remessa;
  situacaoRemessasUnidadeGestoraAtos: Remessa;
  situacaoRemessasUnidadeGestoraPCF: Remessa;
  situacaoRemessasUnidadeGestoraRCO: Remessa;
  situacaoRemessasUnidadeGestoraRCB: Remessa;
};

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
  envio: Remessa;
}[];

export type StatusRemessas = {
  comAtraso: Remessas;
  naoObrigatorias: Remessas;
};
