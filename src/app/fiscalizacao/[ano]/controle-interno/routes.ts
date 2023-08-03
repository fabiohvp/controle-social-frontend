import { DropdownItem } from "@/components/dropdowns/dropdown/DropdownItem";

export type ControleInternoPageProps = {
  ano: string;
  pagina: string;
};

export function generateControleInternoUrl<T>({
  ano,
  pagina,
  pathname,
}: ControleInternoPageProps & {
  item: DropdownItem<T>;
  pathname: string;
}) {
  pagina = pagina ?? getPagina(pathname);
  return `/fiscalizacao/${ano}/controle-interno/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[4];
  return pagina;
}
