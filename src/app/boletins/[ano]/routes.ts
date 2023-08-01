import { DropdownItem } from "@/components/dropdowns/dropdown/DropdownItem";

export type BoletinsPageProps = {
  ano: string;
  mes: string[] | undefined;
};

export function generateBoletinsUrl<T>({
  ano,
  item,
  mes,
  pathname,
}: BoletinsPageProps & { item: DropdownItem<T>; pathname: string }) {
  const segment = pathname.split(`/${ano}/`)[1];
  return `/boletins/${item[1].value ?? 2023}/${segment ?? mes ?? ""}`;
}
