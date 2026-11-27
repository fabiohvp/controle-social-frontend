import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import { getUrlBaseEstado } from "../routes";
import { PAGINAS_PREVIDENCIA, SLUG_PREVIDENCIA } from "./routes";

type Props = { params: Promise<{ ano: string }> };

/** /previdencia sem subpágina: vai para a primeira página implementada */
export default async function Page({ params }: Props) {
  const { ano } = await params;
  const urlBase = getUrlBaseEstado(ano);

  redirecionarParaPaginaPadrao({
    paginas: PAGINAS_PREVIDENCIA,
    subpagina: "",
    urlSecao: `${urlBase}/${SLUG_PREVIDENCIA}`,
    urlAlternativa: `${urlBase}/visao-geral`,
  });
}
