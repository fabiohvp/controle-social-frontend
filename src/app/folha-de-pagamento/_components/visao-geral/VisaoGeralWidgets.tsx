import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { formatFloat } from "@/formatters/number";
import { ReactNode } from "react";
import {
  FolhaDePagamentoFiltros,
  getFolhaDePagamento,
} from "../../folhaDePagamentoApi";
import FolhaBarChart from "./FolhaBarChart";
import FolhaDonutChart, { FolhaChartItem } from "./FolhaDonutChart";

type Props = { filtros: FolhaDePagamentoFiltros };

const BODY_PROPS = { className: "min-h-[120px] w-full" };

function reais(value?: number) {
  return `R$ ${formatFloat(value ?? 0)}`;
}

function SemDados() {
  return <div className="m-auto opacity-60">Sem dados para o filtro</div>;
}

function Valores({ itens }: { itens: [string, string][] }) {
  return (
    <dl className="w-full">
      {itens.map(([titulo, valor]) => (
        <div className="flex justify-between py-1" key={titulo}>
          <dt>{titulo}</dt>
          <dd className="font-bold">{valor}</dd>
        </div>
      ))}
    </dl>
  );
}

function Painel({ children, titulo }: { children: ReactNode; titulo: string }) {
  return (
    <PanelWithTitle bodyProps={BODY_PROPS} header={titulo}>
      {children}
    </PanelWithTitle>
  );
}

export async function PagamentosConsolidadosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<{
    totalBruto: number;
    totalDescontos: number;
    totalLiquido: number;
  }>("GetPagamentosConsolidados", filtros);

  return (
    <Painel titulo="Pagamentos">
      {data ? (
        <Valores
          itens={[
            ["Total bruto", reais(data.totalBruto)],
            ["Total de descontos", reais(data.totalDescontos)],
            ["Total líquido", reais(data.totalLiquido)],
          ]}
        />
      ) : (
        <SemDados />
      )}
    </Painel>
  );
}

export async function ContribuicaoPrevidenciariaWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<{
    valorTotal: number;
    valorTotalPatronalRGPS: number;
    valorTotalPatronalRPPS: number;
    valorTotalRetidoRGPS: number;
    valorTotalRetidoRPPS: number;
  }>("GetContribuicoesPrevidenciarias", filtros);

  return (
    <Painel titulo="Contribuição previdenciária">
      {data ? (
        <Valores
          itens={[
            ["Total", reais(data.valorTotal)],
            ["Retido RGPS", reais(data.valorTotalRetidoRGPS)],
            ["Retido RPPS", reais(data.valorTotalRetidoRPPS)],
            ["Patronal RGPS", reais(data.valorTotalPatronalRGPS)],
            ["Patronal RPPS", reais(data.valorTotalPatronalRPPS)],
          ]}
        />
      ) : (
        <SemDados />
      )}
    </Painel>
  );
}

export async function SituacaoRemessaWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<FolhaChartItem[]>(
    "GetPrestacaoContasPCFQuantidadeEnvios",
    filtros,
    "PrestacaoContaControllers/EsferaAdministrativa"
  );

  return (
    <Painel titulo="Situação da remessa">
      {data?.length ? (
        <FolhaDonutChart
          colors={["#459D49", "#E68465", "#B37476"]}
          items={data}
          tipo="inteiro"
        />
      ) : (
        <SemDados />
      )}
    </Painel>
  );
}

export async function VantagensDestaqueWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<
    { nome: string; valor: number }[]
  >("GetQuantidadeVantagens", filtros);

  return (
    <Painel titulo="Vantagens em destaque (vínculos impactados)">
      {data?.length ? (
        <FolhaBarChart
          items={data.map((item) => ({ name: item.nome, value: item.valor }))}
        />
      ) : (
        <SemDados />
      )}
    </Painel>
  );
}

export async function VantagensWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<FolhaChartItem[]>(
    "GetVantagensMaisRelevantes",
    filtros
  );

  return (
    <Painel titulo="Vantagens">
      {data?.length ? (
        <FolhaDonutChart items={data} tipo="moeda" />
      ) : (
        <SemDados />
      )}
    </Painel>
  );
}

export async function DescontosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<FolhaChartItem[]>(
    "GetDescontosMaisRelevantes",
    filtros
  );

  return (
    <Painel titulo="Descontos">
      {data?.length ? (
        <FolhaDonutChart items={data} tipo="moeda" />
      ) : (
        <SemDados />
      )}
    </Painel>
  );
}
