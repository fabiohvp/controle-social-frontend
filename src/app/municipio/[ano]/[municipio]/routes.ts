import { DropdownItem } from "@/components/dropdowns/dropdown/DropdownItem";
import { CSSProperties } from "react";

export type MunicipioPageProps = {
  ano: string;
  municipio: string;
};

export type MunicipioPanelProps = {
  style?: CSSProperties;
} & MunicipioPageProps;

export function generateMunicipioUrl<T>({
  ano,
  item,
  municipio,
}: MunicipioPageProps & { item: DropdownItem<T>; pathname: string }) {
  return `/municipio/${ano ?? 2023}/${municipio ?? "serra"}/${
    item[1].value ?? "visao-geral"
  }`;
}
