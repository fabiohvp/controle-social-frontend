import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndicadorConfig } from "../indicadoresConfig";
import { isAnoIndicadoresValido, IndicadoresPageProps } from "../routes";

type Props = {
  params: Promise<IndicadoresPageProps>;
  /** Slug registrado em `indicadoresConfig.ts` (mesmo nome da pasta). */
  slug: string;
};

/**
 * Moldura de uma página de indicador: título + conteúdo.
 * Sem `children`, mostra o placeholder "Em construção".
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
      <h1 className="text-lg font-semibold">
        {config.tituloCompleto} - {ano}
      </h1>
      {children ?? (
        <p className="text-sm text-gray-medium">Em construção</p>
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
