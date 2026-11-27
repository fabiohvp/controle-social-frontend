import DiretrizesOrcamentarias from "@/components/gestao-orcamentaria/diretrizes-orcamentarias/DiretrizesOrcamentarias";
import { getEsferaMunicipio } from "@/shared/esfera";
import { notFound } from "next/navigation";
import { MunicipioPageProps } from "../../routes";

/** `ano` da URL é o início do quadriênio do PPA; `?ldo=` escolhe o ano da LDO */
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<MunicipioPageProps>;
  searchParams: Promise<{ ldo?: string }>;
}) {
  const { ano, municipio } = await params;
  const { ldo } = await searchParams;
  const esfera = await getEsferaMunicipio(municipio);
  if (!esfera) notFound();

  return (
    <DiretrizesOrcamentarias
      esfera={esfera}
      anoExercicio={Number(ano)}
      anoLdo={ldo ? Number(ldo) : undefined}
    />
  );
}
