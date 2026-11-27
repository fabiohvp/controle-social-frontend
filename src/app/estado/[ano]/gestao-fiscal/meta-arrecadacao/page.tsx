import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import MetaArrecadacao from "@/components/gestao-fiscal/meta-arrecadacao/MetaArrecadacao";
import { ESFERA_ESTADO } from "@/shared/esfera";

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  return (
    <MetaArrecadacao
      esfera={ESFERA_ESTADO}
      anoExercicio={Number(ano)}
    />
  );
}
