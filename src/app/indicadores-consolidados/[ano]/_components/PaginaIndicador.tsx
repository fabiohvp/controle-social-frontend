import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getIndicadorConfig } from "../indicadoresConfig";
import { isAnoIndicadoresValido, IndicadoresPageProps } from "../routes";
import TabelaIndicador from "./TabelaIndicador";
import { TABELAS_INDICADORES } from "./tabelasIndicadores";

type Props = {
  params: Promise<IndicadoresPageProps>;
  /** Slug registrado em `indicadoresConfig.ts` (mesmo nome da pasta). */
  slug: string;
};

const INTRODUCAO =
  "A ferramenta de Indicadores Consolidados permite que você tenha uma visão geral da situação de todos os municípios capixabas. Os indicadores são apresentados por agrupamentos temáticos, como receitas, despesas, saúde, educação, pessoal, etc. É muito simples: basta selecionar o agrupamento temático desejado. Ah, e você pode ordenar as colunas clicando sobre os títulos.";

async function Tabela({ slug, ano }: { slug: string; ano: string }) {
  const montar = TABELAS_INDICADORES[slug];
  if (!montar) return <p className="text-sm text-gray-medium">Informação indisponível</p>;
  const dados = await montar(ano);
  if (!dados.linhas.length) {
    return <p className="text-sm text-gray-medium">Sem dados para {ano}.</p>;
  }
  return <TabelaIndicador dados={dados} />;
}

/**
 * Moldura de uma página de indicador: título, texto do site oficial e tabela
 * com os 78 municípios (ver `tabelasIndicadores.ts`). `children` substitui a tabela.
 */
export default async function PaginaIndicador({
  children,
  params,
  slug,
}: Props & { children?: React.ReactNode }) {
  const { ano } = await params;
  const config = getIndicadorConfig(slug);

  if (!config || !isAnoIndicadoresValido(ano)) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">{INTRODUCAO}</p>
      <h1 className="text-lg font-semibold">
        {config.tituloCompleto} - {ano}
      </h1>
      {children ?? (
        <Suspense
          fallback={<div className="h-96 animate-pulse rounded bg-gray-200/60" />}
        >
          <Tabela slug={slug} ano={ano} />
        </Suspense>
      )}
    </div>
  );
}

export function getMetadataIndicador(slug: string): Metadata {
  const config = getIndicadorConfig(slug);
  return {
    title: config
      ? `Indicadores Consolidados - ${config.tituloCompleto}`
      : "Indicadores Consolidados",
  };
}
