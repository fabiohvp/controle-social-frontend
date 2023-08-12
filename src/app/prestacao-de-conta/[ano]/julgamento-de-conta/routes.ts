import { GlobalState } from "@/shared/globalState";

export type JulgamentoDeContaPageProps = {
  ano: string;
  pagina: string;
  municipio?: string;
};

export function generateJulgamentoDeContaUrl({
  ano,
  globalState,
  pagina,
  pathname,
  municipio,
}: JulgamentoDeContaPageProps & {
  globalState: GlobalState;
  pathname: string;
}) {
  const baseUrl = `/prestacao-de-conta/${ano}/julgamento-de-conta`;
  pagina = (pagina || getPagina(pathname)) ?? "";

  if (pagina === "visao-geral") {
    return `${baseUrl}/${pagina}`;
  }
  if (!municipio) {
    municipio = globalState.municipios[0].nomeNormalizado;
  }
  if (pagina === "municipio") {
    return `${baseUrl}/${municipio}`;
  }
  return `${baseUrl}/${municipio}/${pagina}`;
}

export function getPagina(pathname: string) {
  const pagina = pathname.split("/")[4];
  if (pagina === "visao-geral") {
    return pagina;
  }
  return pathname.split("/")[5];
}
