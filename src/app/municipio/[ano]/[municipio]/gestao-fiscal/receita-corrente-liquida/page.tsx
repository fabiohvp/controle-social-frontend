import ReceitaCorrenteLiquida from "@/components/gestao-fiscal/receita-corrente-liquida/ReceitaCorrenteLiquida";
import { getEsferaMunicipio } from "@/shared/esfera";
import { notFound } from "next/navigation";
import { MunicipioPageProps } from "../../routes";

/** Página de referência da arquitetura (#8): componente compartilhado com o Estado */
export default async function Page({
  params,
}: {
  params: Promise<MunicipioPageProps>;
}) {
  const { ano, municipio } = await params;
  const esfera = await getEsferaMunicipio(municipio);
  if (!esfera) notFound();

  return <ReceitaCorrenteLiquida esfera={esfera} anoExercicio={Number(ano)} />;
}
