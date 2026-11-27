import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import { getUrlBaseMunicipio } from "../routes";
import { PAGINAS_PREVIDENCIA, SLUG_PREVIDENCIA } from "./routes";

type Props = { params: Promise<{ ano: string; municipio: string }> };

/** /previdencia sem subpágina: vai para a primeira página implementada */
export default async function Page({ params }: Props) {
  const { ano, municipio } = await params;
  const urlBase = getUrlBaseMunicipio(ano, municipio);

  redirecionarParaPaginaPadrao({
    paginas: PAGINAS_PREVIDENCIA,
    subpagina: "",
    urlSecao: `${urlBase}/${SLUG_PREVIDENCIA}`,
    urlAlternativa: `${urlBase}/visao-geral`,
  });
}
