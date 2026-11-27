import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { notFound } from "next/navigation";
import BreadcrumbFiscalizacaoSimples from "../../_components/BreadcrumbFiscalizacaoSimples";
import RelatorioPdf from "../../_components/RelatorioPdf";

const ANOS = [2024];

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
          rota="violencia-contra-mulheres"
          titulo="Violência contra mulheres e meninas"
        />
      }
    >
      <RelatorioPdf
        alerta={
          "Auditoria Operacional, cujo objetivo foi avaliar a eficácia das ações de enfrentamento à violência contra mulheres e meninas - VCMM, com foco específico nas iniciativas de prevenção e acolhimento realizadas no período 2022-2024."
        }
        src={`/api/fiscalizacao/violencia-contra-mulheres/relatorio?ano=${ano}`}
        titulo="Violência contra mulheres e meninas"
      />
    </DashboardLayout>
  );
}
