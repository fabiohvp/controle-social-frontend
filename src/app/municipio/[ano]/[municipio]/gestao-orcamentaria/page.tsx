import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import { getUrlBaseMunicipio } from "../routes";
import { PAGINAS_GESTAO_ORCAMENTARIA, SLUG_GESTAO_ORCAMENTARIA } from "./routes";

type Props = { params: Promise<{ ano: string; municipio: string }> };

/** /gestao-orcamentaria sem subpágina: vai para a primeira página implementada */
export default async function Page({ params }: Props) {
  const { ano, municipio } = await params;
  const urlBase = getUrlBaseMunicipio(ano, municipio);

  redirecionarParaPaginaPadrao({
    paginas: PAGINAS_GESTAO_ORCAMENTARIA,
    subpagina: "",
    urlSecao: `${urlBase}/${SLUG_GESTAO_ORCAMENTARIA}`,
    urlAlternativa: `${urlBase}/visao-geral`,
  });
}
