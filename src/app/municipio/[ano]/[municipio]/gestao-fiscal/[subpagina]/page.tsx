import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import { getUrlBaseMunicipio } from "../../routes";
import { PAGINAS_GESTAO_FISCAL, SLUG_GESTAO_FISCAL } from "../routes";

type Props = {
  params: Promise<{ ano: string; municipio: string; subpagina: string }>;
};

/** Fallback: slugs sem page.tsx própria (não implementados/antigos) vão para a página padrão */
export default async function Page({ params }: Props) {
  const { ano, municipio, subpagina } = await params;
  const urlBase = getUrlBaseMunicipio(ano, municipio);

  redirecionarParaPaginaPadrao({
    paginas: PAGINAS_GESTAO_FISCAL,
    subpagina,
    urlSecao: `${urlBase}/${SLUG_GESTAO_FISCAL}`,
    urlAlternativa: `${urlBase}/visao-geral`,
  });
}
