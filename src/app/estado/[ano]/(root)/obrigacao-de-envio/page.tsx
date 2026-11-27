import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import ObrigacaoEnvioEnte from "@/components/obrigacao-de-envio/ObrigacaoEnvioEnte";
import { ESFERA_ESTADO } from "@/shared/esfera";

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  return <ObrigacaoEnvioEnte ano={ano} esfera={ESFERA_ESTADO} />;
}
