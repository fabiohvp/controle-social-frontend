"use client";
import MapaEsChart, { SelectedRegion } from "@/components/charts/MapaEsChart";
import AlertPanel from "@/components/panel/AlertPanel";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import SortableTable, {
  SortableTableColumn,
} from "@/components/tables/SortableTable";
import { useGlobalState } from "@/providers/GlobalProvider";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import {
  DESCRICAO_OMISSO,
  formatValorRanking,
  getLegendasRanking,
  getLinhasRanking,
  getValorCampoRanking,
} from "./rankingUtils";
import { RankingItem, RankingLinha, RankingTabelaConfig } from "./types";

type Props = {
  ano: string;
  config: RankingTabelaConfig;
  itens: RankingItem[];
  /** Título do painel da tabela. */
  titulo?: string;
};

const ALTURA = "min(70vh, 620px)";

/**
 * Tabela ordenável + mapa do ES coloridos pelas mesmas faixas.
 * Genérico: recebe só dados serializáveis (itens da API + config visual).
 */
export default function RankingTabela({ ano, config, itens, titulo }: Props) {
  const { municipios } = useGlobalState();
  const linhas = useMemo(
    () => getLinhasRanking(itens, config, municipios),
    [config, itens, municipios]
  );
  const legendas = useMemo(
    () => getLegendasRanking(config, linhas),
    [config, linhas]
  );
  const paginaMunicipio = config.paginaMunicipio ?? "visao-geral";
  const getUrlMunicipio = useCallback(
    (nomeNormalizado: string) =>
      `/municipio/${ano}/${nomeNormalizado}/${paginaMunicipio}`,
    [ano, paginaMunicipio]
  );

  const columns = useMemo(
    () => getColumns(config, getUrlMunicipio),
    [config, getUrlMunicipio]
  );
  const regions: SelectedRegion[] = useMemo(
    () =>
      linhas.map((linha) => ({
        name: linha.nomeMapa,
        itemStyle: { color: linha.cor },
        silent: false,
        tooltip: {
          formatter: linha.omisso
            ? `${linha.nomeMapa}<br/>${DESCRICAO_OMISSO}`
            : `${linha.posicaoExibida}º - ${linha.nomeMapa}<br/>${formatValorRanking(linha.valor, config.formato)}`,
        },
      })),
    [config.formato, linhas]
  );
  const omissos = linhas.filter((linha) => linha.omisso);

  return (
    <div className="grid gap-2 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <PanelWithTitle
        bodyProps={{ className: "p-0" }}
        header={titulo ?? "Ranking"}
      >
        <SortableTable
          caption={titulo}
          className="w-full"
          columns={columns}
          getRowKey={(linha) => linha.codigoEsferaAdministrativa}
          initialSort={{ key: "posicao", direction: "asc" }}
          isPinnedBottom={isOmissoLinha}
          rows={linhas}
          style={{ maxHeight: ALTURA }}
        />
      </PanelWithTitle>
      <div className="flex flex-col gap-2">
        <PanelWithTitle header="Mapa">
          <div className="w-full" style={{ height: ALTURA }}>
            <MapaEsChart
              chartGeoOptions={{ tooltip: { show: true } }}
              getUrlMunicipio={getUrlMunicipio}
              legends={legendas}
              selectedRegions={regions}
            />
          </div>
        </PanelWithTitle>
        {omissos.length > 0 && (
          <AlertPanel className="min-h-0" type="danger">
            <strong>Não enviaram dados ou enviaram parcialmente</strong>
            <ol className="list-decimal ml-6 mt-1 text-sm">
              {omissos.map((linha) => (
                <li key={linha.codigoEsferaAdministrativa}>
                  {linha.nomeNormalizado ? (
                    <Link
                      className="text-link"
                      href={getUrlMunicipio(linha.nomeNormalizado)}
                      prefetch={false}
                    >
                      {linha.nomeMapa}
                    </Link>
                  ) : (
                    linha.nomeMapa
                  )}
                </li>
              ))}
            </ol>
          </AlertPanel>
        )}
      </div>
    </div>
  );
}

function isOmissoLinha(linha: RankingLinha) {
  return linha.omisso;
}

function getColumns(
  config: RankingTabelaConfig,
  getUrlMunicipio: (nomeNormalizado: string) => string
): SortableTableColumn<RankingLinha>[] {
  return [
    {
      key: "posicao",
      header: "Posição",
      align: "right",
      className: "tabular-nums w-0",
      getSortValue: (linha) => linha.posicaoExibida,
      render: (linha) => (linha.omisso ? "-" : `${linha.posicaoExibida}º`),
    },
    {
      key: "municipio",
      header: "Município",
      getSortValue: (linha) => linha.nomeMapa,
      render: (linha) => (
        <span className="flex gap-2 items-center">
          <span
            aria-hidden
            className="border inline-block h-3 rounded-sm shrink-0 w-3"
            style={{ backgroundColor: linha.cor }}
          />
          {linha.nomeNormalizado ? (
            <Link
              className="text-link"
              href={getUrlMunicipio(linha.nomeNormalizado)}
              prefetch={false}
            >
              {linha.nomeMapa}
            </Link>
          ) : (
            linha.nomeMapa
          )}
        </span>
      ),
    },
    {
      key: "valor",
      header: config.tituloValor ?? "Valor",
      align: "right",
      className: "tabular-nums whitespace-nowrap",
      getSortValue: (linha) => linha.valor,
      render: (linha) =>
        linha.omisso ? (
          <span className="text-gray-medium">sem dados</span>
        ) : (
          formatValorRanking(linha.valor, config.formato)
        ),
    },
    ...(config.colunasExtras ?? []).map(
      (coluna): SortableTableColumn<RankingLinha> => ({
        key: coluna.campo,
        header: coluna.titulo,
        align: "right",
        className: "tabular-nums whitespace-nowrap",
        getSortValue: (linha) => getValorCampoRanking(linha, coluna.campo),
        render: (linha) =>
          formatValorRanking(
            getValorCampoRanking(linha, coluna.campo),
            coluna.formato
          ),
      })
    ),
  ];
}
