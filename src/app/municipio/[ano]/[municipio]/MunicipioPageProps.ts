import MUNICIPIOS from "@/municipios.json";
import { CSSProperties } from "react";

export type MunicipioPageProps = {
  ano: string;
  municipio: string;
};

export type MunicipioPanelProps = {
  style?: CSSProperties;
} & MunicipioPageProps;

export function getCodigoMunicipio(municipio: string) {
  const codigo = MUNICIPIOS.find(
    (o) => o.nomeNormalizado === municipio
  )!.codigo;
  return codigo;
}
