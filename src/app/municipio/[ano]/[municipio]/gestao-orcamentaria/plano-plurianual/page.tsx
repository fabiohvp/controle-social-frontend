import PlanoPlurianual from "@/components/gestao-orcamentaria/plano-plurianual/PlanoPlurianual";
import { getEsferaMunicipio } from "@/shared/esfera";
import { notFound } from "next/navigation";
import { MunicipioPageProps } from "../../routes";

export default async function Page({
  params,
}: {
  params: Promise<MunicipioPageProps>;
}) {
  const { ano, municipio } = await params;
  const esfera = await getEsferaMunicipio(municipio);
  if (!esfera) notFound();

  return <PlanoPlurianual esfera={esfera} anoExercicio={Number(ano)} />;
}
