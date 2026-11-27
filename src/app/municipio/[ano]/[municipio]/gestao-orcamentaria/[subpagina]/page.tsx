import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import { getUrlBaseMunicipio } from "../../routes";
import {
  PAGINAS_GESTAO_ORCAMENTARIA,
  SLUG_GESTAO_ORCAMENTARIA,
} from "../routes";

type Props = {
  params: Promise<{ ano: string; municipio: string; subpagina: string }>;
};

/**
 * Fallback: slugs sem page.tsx própria (não implementados ou antigos, como
 * "planejamento-governamental") vão para a página padrão da seção.
 */
export default async function Page({ params }: Props) {
  const { ano, municipio, subpagina } = await params;
  const urlBase = getUrlBaseMunicipio(ano, municipio);

  redirecionarParaPaginaPadrao({
    paginas: PAGINAS_GESTAO_ORCAMENTARIA,
    subpagina,
    urlSecao: `${urlBase}/${SLUG_GESTAO_ORCAMENTARIA}`,
    urlAlternativa: `${urlBase}/visao-geral`,
  });
}
