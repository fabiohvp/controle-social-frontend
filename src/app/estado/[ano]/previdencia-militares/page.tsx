import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import { getUrlBaseEstado } from "../routes";
import { PAGINAS_PREVIDENCIA_MILITARES, SLUG_PREVIDENCIA_MILITARES } from "./routes";

type Props = { params: Promise<{ ano: string }> };

/** /previdencia-militares sem subpágina: vai para a primeira página implementada */
export default async function Page({ params }: Props) {
  const { ano } = await params;
  const urlBase = getUrlBaseEstado(ano);

  redirecionarParaPaginaPadrao({
    paginas: PAGINAS_PREVIDENCIA_MILITARES,
    subpagina: "",
    urlSecao: `${urlBase}/${SLUG_PREVIDENCIA_MILITARES}`,
    urlAlternativa: `${urlBase}/visao-geral`,
  });
}
