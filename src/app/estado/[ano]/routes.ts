import { DropdownItem } from "@/components/dropdowns/dropdown/DropdownItem";
import { CSSProperties } from "react";

export type EstadoPageProps = {
  ano: string;
};

export type EstadoPanelProps = {
  style?: CSSProperties;
} & EstadoPageProps;

export function generateEstadoUrl<T>({
  ano,
  item,
  pathname,
}: EstadoPageProps & { item: DropdownItem<T>; pathname: string }) {
  const segments = pathname.split(`/${ano}/`)[1];
  return `/estado/${item[1].value}/${segments}`;
}
