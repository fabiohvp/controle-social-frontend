import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import { getUrlBaseMunicipio } from "../../../routes";
import { PAGINAS_PREVIDENCIA, SLUG_PREVIDENCIA } from "../../routes";

type Props = {
  params: Promise<{ ano: string; municipio: string; subpagina: string }>;
};

/**
 * Fallback: slugs sem page.tsx própria vão para a página padrão da seção
 * (a página real escolhe a UG). Páginas reais ficam em
 * `previdencia/<slug>/[[...unidadeGestora]]/page.tsx` e têm prioridade.
 */
export default async function Page({ params }: Props) {
  const { ano, municipio, subpagina } = await params;
  const urlBase = getUrlBaseMunicipio(ano, municipio);

  redirecionarParaPaginaPadrao({
    paginas: PAGINAS_PREVIDENCIA,
    subpagina,
    urlSecao: `${urlBase}/${SLUG_PREVIDENCIA}`,
    urlAlternativa: `${urlBase}/visao-geral`,
  });
}
