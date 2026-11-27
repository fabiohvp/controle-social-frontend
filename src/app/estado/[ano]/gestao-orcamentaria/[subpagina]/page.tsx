import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import { getUrlBaseEstado } from "../../routes";
import { PAGINAS_GESTAO_ORCAMENTARIA, SLUG_GESTAO_ORCAMENTARIA } from "../routes";

type Props = { params: Promise<{ ano: string; subpagina: string }> };

/**
 * Fallback: slugs sem page.tsx própria (não implementados ou antigos) vão
 * para a página padrão da seção. As páginas reais (pastas estáticas) têm prioridade.
 */
export default async function Page({ params }: Props) {
  const { ano, subpagina } = await params;
  const urlBase = getUrlBaseEstado(ano);

  redirecionarParaPaginaPadrao({
    paginas: PAGINAS_GESTAO_ORCAMENTARIA,
    subpagina,
    urlSecao: `${urlBase}/${SLUG_GESTAO_ORCAMENTARIA}`,
    urlAlternativa: `${urlBase}/visao-geral`,
  });
}
