import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import ReceitaCorrenteLiquida from "@/components/gestao-fiscal/receita-corrente-liquida/ReceitaCorrenteLiquida";
import { ESFERA_ESTADO } from "@/shared/esfera";

/** Mesmo componente do município; muda só a esfera (EstadoControllers, id 81) */
export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  return (
    <ReceitaCorrenteLiquida esfera={ESFERA_ESTADO} anoExercicio={Number(ano)} />
  );
}
