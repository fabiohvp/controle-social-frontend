import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { FolhaDePagamentoFiltros, getFolhaDePagamento } from "../../folhaDePagamentoApi";
import FolhaBarChart from "../visao-geral/FolhaBarChart";
import FolhaDonutChart, { FolhaChartItem } from "../visao-geral/FolhaDonutChart";

type Props = { filtros: FolhaDePagamentoFiltros };

const CORES_DONUT = ["#2a333b", "#3d4c57", "#607d8b", "#8aa2ad", "#c5d7e0", "#F4B351"];
const CORES_HOMEM_MULHER = ["#9D8AAC", "#8AA2AD"];

export async function OcupacoesPorVinculoWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<FolhaChartItem[]>("GetQuantidadePorTipoVinculo", filtros);
  return (
    <PanelWithTitle header="Ocupações por vínculo">
      {data?.length ? (
        <FolhaDonutChart items={data} tipo="inteiro" colors={CORES_DONUT} />
      ) : (
        <div className="m-auto opacity-60 p-8 text-center">Sem dados para o filtro</div>
      )}
    </PanelWithTitle>
  );
}

export async function OcupacoesPorCargoWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<FolhaChartItem[]>("GetQuantidadePorCargo", filtros);
  return (
    <PanelWithTitle header="Ocupações por cargo">
      {data?.length ? (
        <FolhaDonutChart items={data} tipo="inteiro" colors={CORES_DONUT} />
      ) : (
        <div className="m-auto opacity-60 p-8 text-center">Sem dados para o filtro</div>
      )}
    </PanelWithTitle>
  );
}

export async function PagamentosPorVinculoWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<FolhaChartItem[]>("GetPagamentosPorTipoVinculo", filtros);
  return (
    <PanelWithTitle header="Pagamentos por vínculo">
      {data?.length ? (
        <FolhaDonutChart items={data} tipo="moeda" colors={CORES_DONUT} />
      ) : (
        <div className="m-auto opacity-60 p-8 text-center">Sem dados para o filtro</div>
      )}
    </PanelWithTitle>
  );
}

export async function PagamentosPorCargoWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<FolhaChartItem[]>("GetPagamentosPorTipoCargo", filtros);
  return (
    <PanelWithTitle header="Pagamentos por cargo">
      {data?.length ? (
        <FolhaDonutChart items={data} tipo="moeda" colors={CORES_DONUT} />
      ) : (
        <div className="m-auto opacity-60 p-8 text-center">Sem dados para o filtro</div>
      )}
    </PanelWithTitle>
  );
}

export async function FaixaEtariaAtivosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<{ nome: string; valor: number }[]>("GetQuantidadePorFaixaEtaria", filtros);
  const items: FolhaChartItem[] = (data ?? []).map((d) => ({ name: d.nome, value: d.valor }));
  return (
    <PanelWithTitle header="Faixa etária - em anos">
      {items.length ? (
        <FolhaBarChart items={items} />
      ) : (
        <div className="m-auto opacity-60 p-8 text-center">Sem dados para o filtro</div>
      )}
    </PanelWithTitle>
  );
}

export async function EvolucaoQuantidadePorVinculoWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<MultiSerie>("GetEvolucaoMensalQuantidadePorTipoVinculo", filtros);
  return (
    <PanelWithTitle header="Evolução mensal da quantidade de agentes públicos por tipo de vínculo">
      <MultiSeriesChart dados={data} formato="numero" corrigirIpca={false} />
    </PanelWithTitle>
  );
}

export async function EvolucaoPagamentosAtivosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<SerieItem[]>("GetEvolucaoMensalPagamentos", filtros);
  return (
    <PanelWithTitle header="Evolução mensal do pagamento">
      <SingleSeriesChart dados={data} formato="moeda" tipo="line" />
    </PanelWithTitle>
  );
}
