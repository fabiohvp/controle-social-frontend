import { Modulo } from "@/shared/modulos";

export type DataLimite = {
  codigo: string;
  data: Date;
  mes: number;
};

export type DatasLimites = {
  [modulo in keyof typeof Modulo]: DataLimite[];
};

export type EsferaAdministrativa = {
  codigoEsferaAdministrativa: string;
  nomeEsferaAdministrativa: string;
};

export type Municipio = {
  codigo: string;
  nome: string;
  nomeNormalizado: string;
};

//export type Municipio = (typeof MUNICIPIOS)[0];
export type MunicipiosProps = {
  municipios: Municipio[];
};
