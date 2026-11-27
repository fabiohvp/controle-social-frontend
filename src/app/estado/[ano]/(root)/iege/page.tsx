import PanelWithDescription from "@/components/panel/PanelWithDescription";
import SectionTitle from "@/components/panel/SectionTitle";
import Link from "next/link";
import { EstadoPageProps } from "../../routes";

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>IEGE - Governo Estadual ({ano})</SectionTitle>
      <PanelWithDescription
        titulo="Índice de Efetividade da Gestão Estadual (IEGE)"
        descricao="O IEGE afere a eficácia das políticas públicas estaduais e evidencia a correspondência entre ações governamentais e resultados práticos."
      >
        <div className="p-4 flex flex-col gap-4">
          <p className="text-neutral-700">
            Acompanhe a avaliação do desempenho e dos índices temáticos de efetividade da gestão pública estadual desenvolvidos pelo TCE-ES.
          </p>
          <div>
            <Link
              href="/fiscalizacao/2019/iege"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark transition"
            >
              Ver Painel Completo do IEGE
            </Link>
          </div>
        </div>
      </PanelWithDescription>
    </div>
  );
}
