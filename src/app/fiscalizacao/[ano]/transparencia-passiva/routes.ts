import { DropdownItem } from "@/components/dropdowns/dropdown/DropdownItem";

export type TransparenciaPassivaPageProps = {
  ano: string;
  pagina: string;
};

export function generateTransparenciaPassivaUrl<T>({
  ano,
  pagina,
  pathname,
}: TransparenciaPassivaPageProps & {
  item: DropdownItem<T>;
  pathname: string;
}) {
  pagina = pagina ?? getPagina(pathname);
  return `/fiscalizacao/${ano}/transparencia-passiva/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[4];
  return pagina;
}
