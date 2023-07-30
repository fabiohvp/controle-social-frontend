import { Modulo } from "@/shared/modulos";

export type DataLimite = {
  codigo: string;
  data: Date;
  mes: number;
};

export type DatasLimites = {
  [modulo in keyof typeof Modulo]: DataLimite[];
};
