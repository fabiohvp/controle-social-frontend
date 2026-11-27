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
      <SectionTitle>Rankings - {municipio.toUpperCase()} ({ano})</SectionTitle>
      <PanelWithDescription
        titulo="Posições nos rankings municipais"
        descricao="Consulte as posições comparativas do município em receitas, despesas, pessoal, saúde e educação."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <Link
            href={`/rankings/${ano}/receita/arrecadada`}
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Receita Arrecadada</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Posição no ranking geral de arrecadação municipal
            </p>
          </Link>
          <Link
            href={`/rankings/${ano}/despesa/liquidada`}
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Despesa Liquidada</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Comparativo das despesas liquidadas
            </p>
          </Link>
          <Link
            href={`/rankings/${ano}/pessoal/consolidado-limite-lrf`}
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Gastos com Pessoal</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Limites de alerta e prudencial da LRF
            </p>
          </Link>
          <Link
            href={`/rankings/${ano}/educacao/aplicacao`}
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Educação</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Aplicação de recursos na manutenção e desenvolvimento do ensino
            </p>
          </Link>
          <Link
            href={`/rankings/${ano}/saude/aplicacao`}
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Saúde</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Aplicação de recursos em ações e serviços públicos de saúde
            </p>
          </Link>
          <Link
            href={`/rankings/${ano}/gestao-fiscal/superavit-e-deficit-financeiro`}
            className="p-4 rounded border hover:bg-neutral-50 transition"
          >
            <h3 className="font-semibold text-primary">Gestão Fiscal</h3>
            <p className="text-sm text-neutral-600 mt-1">
              Superávit e déficit financeiro e endividamento
            </p>
          </Link>
        </div>
      </PanelWithDescription>
    </div>
  );
}
