import DestinoDoDinheiro from "@/components/gestao-orcamentaria/destino-do-dinheiro/DestinoDoDinheiro";
import { getEsferaMunicipio } from "@/shared/esfera";
import { notFound } from "next/navigation";
import { MunicipioPageProps } from "../../routes";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<MunicipioPageProps>;
  searchParams: Promise<{ fonte?: string }>;
}) {
  const { ano, municipio } = await params;
  const { fonte } = await searchParams;
  const esfera = await getEsferaMunicipio(municipio);
  if (!esfera) notFound();

  return (
    <DestinoDoDinheiro esfera={esfera} anoExercicio={Number(ano)} fonte={fonte} />
  );
}
