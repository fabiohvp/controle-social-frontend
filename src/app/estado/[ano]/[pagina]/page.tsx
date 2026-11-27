import { redirect } from "next/navigation";
import { getUrlBaseEstado } from "../routes";

type Props = { params: Promise<{ ano: string; pagina: string }> };

/**
 * /estado/[ano]/<pagina> sem page.tsx própria (páginas da raiz ainda não
 * implementadas, slugs antigos): vai para a visão geral. As seções têm a
 * própria page.tsx que redireciona para a página padrão.
 */
export default async function Page({ params }: Props) {
  const { ano, pagina } = await params;

  if (pagina === "area-tematica") {
    redirect("/area-tematica/assistencia-social/referenciamento");
  }
  redirect(`${getUrlBaseEstado(ano)}/visao-geral`);
}
