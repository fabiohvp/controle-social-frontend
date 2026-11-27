import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";
import { ENV } from "@/shared/env";
import { notFound } from "next/navigation";
import { cache } from "react";
import BreadcrumbFiscalizacaoSimples from "../../_components/BreadcrumbFiscalizacaoSimples";
import { IndiceEfetividade } from "./_components/IndiceEfetividade";
import { IegeIndices } from "./iege";

const ANOS = [2019, 2018, 2017];
const ID_ESTADO = 81;

export default async function Page({
  params,
}: {
  params: Promise<{ ano: string }>;
}) {
  const { ano } = await params;
  if (!ANOS.includes(Number(ano))) notFound();

  const indices = await getData(ano);

  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensBreadcrumb={
        <BreadcrumbFiscalizacaoSimples
          anos={ANOS}
          rota="iege"
          titulo="IEGE - Índice de efetividade da gestão estadual"
        />
      }
    >
      {indices ? (
        <IndiceEfetividade ano={ano} indices={indices} />
      ) : (
        <AlertPanel type="warning">
          Não há dados do IEGE para o ano {ano}.
        </AlertPanel>
      )}
    </DashboardLayout>
  );
}

const getData = cache(async (ano: string) => {
  const res = await fetch(
    `${ENV.apiUrl}/EstadoControllers/IEGE/GetTodosIndices?anoExercicio=${ano}&idEsferaAdministrativa=${ID_ESTADO}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text) as IegeIndices;
});
