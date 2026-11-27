import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import { getUrlBaseEstado } from "../routes";
import { PAGINAS_GESTAO_ORCAMENTARIA, SLUG_GESTAO_ORCAMENTARIA } from "./routes";

type Props = { params: Promise<{ ano: string }> };

/** /gestao-orcamentaria sem subpágina: vai para a primeira página implementada */
export default async function Page({ params }: Props) {
  const { ano } = await params;
  const urlBase = getUrlBaseEstado(ano);

  redirecionarParaPaginaPadrao({
    paginas: PAGINAS_GESTAO_ORCAMENTARIA,
    subpagina: "",
    urlSecao: `${urlBase}/${SLUG_GESTAO_ORCAMENTARIA}`,
    urlAlternativa: `${urlBase}/visao-geral`,
  });
}
