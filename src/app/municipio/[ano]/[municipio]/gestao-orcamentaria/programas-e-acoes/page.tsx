import ProgramasAcoes from "@/components/gestao-orcamentaria/programas-e-acoes/ProgramasAcoes";
import { getEsferaMunicipio } from "@/shared/esfera";
import { notFound } from "next/navigation";
import { MunicipioPageProps } from "../../routes";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<MunicipioPageProps>;
  searchParams: Promise<{ funcao?: string }>;
}) {
  const { ano, municipio } = await params;
  const { funcao } = await searchParams;
  const esfera = await getEsferaMunicipio(municipio);
  if (!esfera) notFound();

  return (
    <ProgramasAcoes esfera={esfera} anoExercicio={Number(ano)} funcao={funcao} />
  );
}
