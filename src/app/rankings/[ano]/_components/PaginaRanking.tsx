import AlertPanel from "@/components/panel/AlertPanel";
import RankingTabela from "@/components/ranking/RankingTabela";
import { isOmisso } from "@/components/ranking/rankingUtils";
import { RankingItem } from "@/components/ranking/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRanking } from "../_api/getRanking";
import { getRankingConfig, RankingConfig } from "../rankingsConfig";
import { isAnoRankingValido, RankingsPageProps } from "../routes";

type Props = {
  params: Promise<RankingsPageProps>;
  /** Chave `categoria/slug` registrada em `rankingsConfig.ts`. */
  ranking: string;
};

/** Página genérica de ranking: alerta explicativo + aviso de período + tabela/mapa. */
export default async function PaginaRanking({ params, ranking }: Props) {
  const { ano } = await params;
  const config = getRankingConfig(ranking);

  if (!config || !isAnoRankingValido(ano)) {
    notFound();
  }

  let itens: RankingItem[] | null = null;
  try {
    itens = await getRanking({ ano, endpoint: config.endpoint });
  } catch (error) {
    console.error(error);
  }
  const mesUltimoEnvio = getMesUltimoEnvio(itens ?? []);
  const parcial = mesUltimoEnvio > 0 && mesUltimoEnvio < 12;

  return (
    <div className="flex flex-col gap-2">
      <AlertPanel className="min-h-0" type="info">
        <strong>
          {config.tituloCompleto}
          {config.tendenciaQuandoParcial && parcial && " - Tendência"}
        </strong>
        <br />
        {config.descricao}
        {config.observacao && (
          <>
            <br />
            {config.observacao}
          </>
        )}
      </AlertPanel>
      <RenderConteudo ano={ano} config={config} itens={itens} />
    </div>
  );
}

function RenderConteudo({
  ano,
  config,
  itens,
}: {
  ano: string;
  config: RankingConfig;
  itens: RankingItem[] | null;
}) {
  if (itens === null) {
    return (
      <AlertPanel className="min-h-0" type="danger">
        Não foi possível carregar o ranking. Tente novamente em instantes.
      </AlertPanel>
    );
  }
  if (!itens.some((item) => !isOmisso(item.valor))) {
    return (
      <AlertPanel className="min-h-0" type="warning">
        Ainda não há dados de {ano} para este ranking.
      </AlertPanel>
    );
  }
  return (
    <>
      <AvisoPeriodo ano={ano} mesUltimoEnvio={getMesUltimoEnvio(itens)} />
      <RankingTabela
        ano={ano}
        config={config}
        itens={itens}
        titulo={`${config.tituloCompleto} - ${ano}`}
      />
    </>
  );
}

function AvisoPeriodo({
  ano,
  mesUltimoEnvio,
}: {
  ano: string;
  mesUltimoEnvio: number;
}) {
  if (!mesUltimoEnvio || mesUltimoEnvio >= 12) return null;

  return (
    <p className="text-sm" style={{ color: "#a68c48" }}>
      Ranking com dados enviados pelos municípios acumulados até o mês
      exigível:{" "}
      <strong className="uppercase">
        {getNomeMes(1)}/{ano} a {getNomeMes(mesUltimoEnvio)}/{ano}
      </strong>
    </p>
  );
}

function getMesUltimoEnvio(itens: RankingItem[]) {
  return itens.reduce(
    (maior, item) => Math.max(maior, item.mesUltimoEnvio ?? 0),
    0
  );
}

function getNomeMes(mes: number) {
  return new Date(2000, mes - 1, 1).toLocaleString("pt-BR", { month: "long" });
}

export function getMetadataRanking(ranking: string): Metadata {
  const config = getRankingConfig(ranking);
  return { title: config ? `Ranking - ${config.tituloCompleto}` : "Rankings" };
}
