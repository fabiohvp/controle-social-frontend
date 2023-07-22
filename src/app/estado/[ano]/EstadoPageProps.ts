import { CSSProperties } from "react";

export type EstadoPageProps = {
  ano: string;
};

export type EstadoPanelProps = {
  style?: CSSProperties;
} & EstadoPageProps;
