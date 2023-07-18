import { CSSProperties } from "react";

export type MunicipioPageProps = {
  ano: string;
  municipio: string;
};

export type MunicipioPanelProps = {
  style?: CSSProperties;
} & MunicipioPageProps;
