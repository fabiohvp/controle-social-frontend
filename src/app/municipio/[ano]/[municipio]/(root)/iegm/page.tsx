import PanelWithDescription from "@/components/panel/PanelWithDescription";
import SectionTitle from "@/components/panel/SectionTitle";
import Link from "next/link";
import { MunicipioPageProps } from "../../routes";

export default async function Page({
  params,
}: {
  params: Promise<MunicipioPageProps>;
}) {
  const { ano, municipio } = await params;

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>IEGM - {municipio.toUpperCase()} ({ano})</SectionTitle>
      <PanelWithDescription
        titulo="Índice de Efetividade da Gestão Municipal (IEGM)"
        descricao="O IEGM avalia a eficácia das políticas e serviços municipais em sete dimensões: Educação, Saúde, Planejamento, Gestão Fiscal, Meio Ambiente, Cidades Protegidas e Governança em TI."
      >
        <div className="p-4 flex flex-col gap-4">
          <p className="text-neutral-700">
            Acompanhe o desempenho do município de {municipio.toUpperCase()} e visualize a evolução de cada uma das 7 dimensões analisadas pelo TCE-ES.
          </p>
          <div>
            <Link
              href="/fiscalizacao/2023/iegm/geral"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition"
            >
              Ver Painel Completo do IEGM
            </Link>
          </div>
        </div>
      </PanelWithDescription>
    </div>
  );
}
