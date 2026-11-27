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
      <SectionTitle>Fiscalizações - Governo Estadual ({ano})</SectionTitle>
      <PanelWithDescription
        titulo="Trabalhos e relatórios de fiscalização estadual"
        descricao="Painéis e auditorias de transparência e controle realizados no Governo do Estado do Espírito Santo."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <Link
            href={`/fiscalizacao/${ano}/portal-transparencia/estado`}
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Portal de Transparência</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Avaliação do portal de transparência do Poder Executivo Estadual
            </p>
          </Link>
          <Link
            href={`/fiscalizacao/${ano}/transparencia-passiva/estado`}
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Transparência Passiva</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Avaliação do Serviço de Informação ao Cidadão do Estado
            </p>
          </Link>
          <Link
            href="/fiscalizacao/2019/iege"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">IEGE</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Índice de Efetividade da Gestão Estadual
            </p>
          </Link>
          <Link
            href="/fiscalizacao/2025/levantamento-ods"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Levantamento ODS</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Objetivos de Desenvolvimento Sustentável no Estado
            </p>
          </Link>
          <Link
            href="/fiscalizacao/2024/violencia-contra-mulheres"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Violência contra Mulheres</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Rede de atendimento e enfrentamento estadual
            </p>
          </Link>
          <Link
            href="/fiscalizacao/2022/crimes-contra-patrimonio"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Crimes contra o Patrimônio</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Auditoria de segurança pública e crimes patrimoniais
            </p>
          </Link>
        </div>
      </PanelWithDescription>
    </div>
  );
}
