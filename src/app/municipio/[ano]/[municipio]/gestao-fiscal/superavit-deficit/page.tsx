import SuperavitDeficit from "@/components/gestao-fiscal/superavit-deficit/SuperavitDeficit";
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

  return <SuperavitDeficit esfera={esfera} anoExercicio={Number(ano)} />;
}
