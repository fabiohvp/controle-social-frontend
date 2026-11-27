import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { notFound } from "next/navigation";
import BreadcrumbFiscalizacaoSimples from "../../_components/BreadcrumbFiscalizacaoSimples";
import RelatorioPdf from "../../_components/RelatorioPdf";

const ANOS = [2022];

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
          rota="crimes-contra-patrimonio"
          titulo="Crimes contra o patrimônio"
        />
      }
    >
      <RelatorioPdf
        alerta={
          "Auditoria cujo objetivo foi avaliar a eficácia do esclarecimento dos crimes contra o patrimônio, do ponto de vista da quantidade de crimes investigados e da identificação e sanção dos responsáveis, e o atingimento das metas estabelecidas. Adicionalmente, avaliar a eficiência na aplicação dos recursos humanos e materiais empregados na investigação dos crimes patrimoniais."
        }
        src={`/api/fiscalizacao/crimes-contra-patrimonio/relatorio?ano=${ano}`}
        titulo="Crimes contra o patrimônio"
      />
    </DashboardLayout>
  );
}
