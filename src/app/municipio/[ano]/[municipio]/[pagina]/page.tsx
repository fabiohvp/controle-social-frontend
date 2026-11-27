import { redirect } from "next/navigation";
import { MunicipioPageProps, getUrlBaseMunicipio } from "../routes";

type Props = { params: Promise<MunicipioPageProps> };

/**
 * /municipio/[ano]/[municipio]/<pagina> sem page.tsx própria (páginas da raiz
 * ainda não implementadas, slugs antigos): vai para a visão geral. As seções
 * (gestao-fiscal etc.) têm a própria page.tsx que redireciona para a página padrão.
 */
export default async function Page({ params }: Props) {
  const { ano, municipio, pagina } = await params;

  if (pagina === "area-tematica") {
    redirect("/area-tematica/assistencia-social/referenciamento");
  }
  redirect(`${getUrlBaseMunicipio(ano, municipio)}/visao-geral`);
}
