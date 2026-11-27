import Iframe from "@/components/iframes/Iframe";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";
import { notFound } from "next/navigation";
import BreadcrumbFiscalizacaoSimples from "../../_components/BreadcrumbFiscalizacaoSimples";

const ANOS = [2025];

export default async function Page({
  params,
}: {
  params: Promise<{ ano: string }>;
}) {
  const { ano } = await params;
  if (!ANOS.includes(Number(ano))) notFound();

  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensBreadcrumb={
        <BreadcrumbFiscalizacaoSimples
          anos={ANOS}
          rota="levantamento-ods"
          titulo="Levantamento ODS"
        />
      }
    >
      <AlertPanel type="info">
        Em 2025, o TCEES realizou levantamento sobre a maturidade da governança
        do centro de governo dos 78 municípios capixabas para implementar a
        Agenda 2030 e os Objetivos de Desenvolvimento Sustentável (ODS). Foram
        avaliados 11 componentes, agrupados em 5 mecanismos, numa escala de 0
        (não implementado) a 3 (otimizado).
      </AlertPanel>
      <Iframe
        src="/painel-ods-municipios.html"
        title="Painel ODS Municípios ES"
        className="h-full min-h-[800px] mt-2 w-full border-0"
      />
      <footer className="px-3 py-2 text-xs text-slate-600">
        <p>
          Fonte: TCEES, SecexSocial. Levantamento da maturidade da governança do
          centro de governo local para a implementação da Agenda 2030 (PACE
          2025; Ação 19 da Rede Integrar). Informações autodeclaradas pelos
          municípios e verificadas por análise documental. Malha municipal:
          IBGE, 2025.
        </p>
        <p>
          Painel elaborado por Secretaria de Controle Externo de Políticas
          Públicas e Social - Núcleo de Controle Externo de Avaliação e
          Monitoramento de Políticas Públicas Sociais Ampliadas.
        </p>
      </footer>
    </DashboardLayout>
  );
}
