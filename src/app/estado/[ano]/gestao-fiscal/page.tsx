import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import { getUrlBaseEstado } from "../routes";
import { PAGINAS_GESTAO_FISCAL, SLUG_GESTAO_FISCAL } from "./routes";

type Props = { params: Promise<{ ano: string }> };

/** /gestao-fiscal sem subpágina: vai para a primeira página implementada */
export default async function Page({ params }: Props) {
  const { ano } = await params;
  const urlBase = getUrlBaseEstado(ano);

  redirecionarParaPaginaPadrao({
    paginas: PAGINAS_GESTAO_FISCAL,
    subpagina: "",
    urlSecao: `${urlBase}/${SLUG_GESTAO_FISCAL}`,
    urlAlternativa: `${urlBase}/visao-geral`,
  });
}
