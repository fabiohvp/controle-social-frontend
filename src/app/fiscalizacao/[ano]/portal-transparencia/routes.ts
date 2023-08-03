import { DropdownItem } from "@/components/dropdowns/dropdown/DropdownItem";

export type PortalTransparenciaPageProps = {
  ano: string;
  pagina: string;
};

export function generatePortalTransparenciaUrl<T>({
  ano,
  pagina,
  pathname,
}: PortalTransparenciaPageProps & {
  item: DropdownItem<T>;
  pathname: string;
}) {
  pagina = pagina ?? getPagina(pathname);
  return `/fiscalizacao/${ano}/portal-transparencia/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[4];
  return pagina;
}
