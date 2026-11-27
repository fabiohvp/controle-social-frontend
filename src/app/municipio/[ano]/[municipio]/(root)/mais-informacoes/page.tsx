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
      <SectionTitle>Mais Informações - {municipio.toUpperCase()} ({ano})</SectionTitle>
      <PanelWithDescription
        titulo="Canais de transparência e dados abertos"
        descricao="Acesso a bases de dados, relatórios, ouvidoria e ferramentas complementares de controle social."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <Link
            href="/wiki/dados-abertos"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Dados Abertos</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Catálogo de dados abertos e APIs públicas disponibilizadas pelo TCE-ES
            </p>
          </Link>
          <Link
            href="/wiki/sobre"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Sobre o Painel</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Conheça a finalidade, metodologia e fontes de dados desta ferramenta
            </p>
          </Link>
          <Link
            href="/wiki/novidades"
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Novidades e Atualizações</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Histórico de versões e novos recursos adicionados ao Painel de Controle
            </p>
          </Link>
          <Link
            href={`/municipio/${ano}/comparador`}
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Comparador de Municípios</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Compare os indicadores deste município com outros municípios capixabas
            </p>
          </Link>
        </div>
      </PanelWithDescription>
    </div>
  );
}
