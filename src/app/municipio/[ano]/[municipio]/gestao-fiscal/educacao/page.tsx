import Educacao from "@/components/gestao-fiscal/educacao/Educacao";
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

  return <Educacao esfera={esfera} anoExercicio={Number(ano)} />;
}
