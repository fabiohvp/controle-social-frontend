import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import PrestacaoContaRaiz from "@/components/prestacao-conta/PrestacaoContaRaiz";
import { ESFERA_ESTADO } from "@/shared/esfera";

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  return <PrestacaoContaRaiz ano={ano} esfera={ESFERA_ESTADO} />;
}

