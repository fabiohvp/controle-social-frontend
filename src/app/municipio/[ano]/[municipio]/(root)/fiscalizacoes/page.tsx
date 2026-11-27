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
      <SectionTitle>Fiscalizações - {municipio.toUpperCase()} ({ano})</SectionTitle>
      <PanelWithDescription
        titulo="Trabalhos e relatórios de fiscalização"
        descricao="Painéis e levantamentos realizados pelo Tribunal de Contas do Estado do Espírito Santo."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <Link
            href="/fiscalizacao/2020/controle-interno/prefeituras"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Controle Interno</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Avaliação do sistema de controle interno da Prefeitura
            </p>
          </Link>
          <Link
            href="/fiscalizacao/2020/portal-transparencia/prefeituras"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Portais de Transparência</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Avaliação dos portais de transparência municipais
            </p>
          </Link>
          <Link
            href="/fiscalizacao/2018/transparencia-passiva/prefeituras"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Transparência Passiva</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Avaliação do Serviço de Informações ao Cidadão (e-SIC)
            </p>
          </Link>
          <Link
            href="/fiscalizacao/2023/iegm/geral"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">IEGM</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Índice de Efetividade da Gestão Municipal
            </p>
          </Link>
          <Link
            href="/fiscalizacao/2025/levantamento-ods"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Levantamento ODS</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Objetivos de Desenvolvimento Sustentável
            </p>
          </Link>
          <Link
            href="/fiscalizacao/2024/violencia-contra-mulheres"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Violência contra Mulheres</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Rede de atendimento e enfrentamento à violência
            </p>
          </Link>
        </div>
      </PanelWithDescription>
    </div>
  );
}
