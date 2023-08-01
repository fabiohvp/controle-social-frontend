import { DropdownItem } from "@/components/dropdowns/dropdown/DropdownItem";
import { CSSProperties } from "react";

export type MunicipioPageProps = {
  ano: string;
  municipio: string;
};

export type MunicipioPanelProps = {
  style?: CSSProperties;
} & MunicipioPageProps;

export function generateGestaoFiscalUrl<T>({
  ano,
  item,
  municipio,
  pathname,
}: MunicipioPageProps & { item: DropdownItem<T>; pathname: string }) {
  console.log(pathname, item[1].value);
  return `/municipio/${ano ?? 2023}/${municipio ?? "serra"}/${
    item[1].value ?? "visao-geral"
  }`;
}
