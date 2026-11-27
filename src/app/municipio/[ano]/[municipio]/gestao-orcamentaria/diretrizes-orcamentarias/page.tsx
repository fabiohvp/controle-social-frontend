import DiretrizesOrcamentarias from "@/components/gestao-orcamentaria/diretrizes-orcamentarias/DiretrizesOrcamentarias";
import { getEsferaMunicipio } from "@/shared/esfera";
import { notFound } from "next/navigation";
import { MunicipioPageProps } from "../../routes";

/** `ano` da URL é o início do quadriênio do PPA; `?ldo=` escolhe o ano da LDO */
export default async function Page({
  params,
}: {
  params: Promise<MunicipioPageProps>;
}) {
  const { ano, municipio } = await params;
  const esfera = await getEsferaMunicipio(municipio);
  if (!esfera) notFound();

  return (
    <DiretrizesOrcamentarias
      esfera={esfera}
      anoExercicio={Number(ano)}
    />
  );
}
