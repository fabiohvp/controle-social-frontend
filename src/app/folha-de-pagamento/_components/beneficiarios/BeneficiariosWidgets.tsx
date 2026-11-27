import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { MultiSerie } from "@/types/Serie";
import { FolhaDePagamentoFiltros, getFolhaDePagamento } from "../../folhaDePagamentoApi";
import FolhaBarChart from "../visao-geral/FolhaBarChart";
import { FolhaChartItem } from "../visao-geral/FolhaDonutChart";

type Props = { filtros: FolhaDePagamentoFiltros };

const CORES_HOMEM_MULHER = ["#9D8AAC", "#8AA2AD"];

export async function HomensMulheresBeneficiariosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<MultiSerie>(
    "GetQuantidadeServidoresInativosEPensionistasHomensEMulheres",
    filtros
  );
  return (
    <PanelWithTitle header="Mulheres e Homens">
      <MultiSeriesChart dados={data} cores={CORES_HOMEM_MULHER} formato="numero" corrigirIpca={false} />
    </PanelWithTitle>
  );
}

export async function EvolucaoInativosPorVinculoWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<MultiSerie>(
    "GetEvolucaoMensalInativosPorTipoVinculo",
    filtros
  );
  return (
    <PanelWithTitle header="Evolução mensal da quantidade de servidores inativos por tipo de vínculo">
      <MultiSeriesChart dados={data} formato="numero" corrigirIpca={false} />
    </PanelWithTitle>
  );
}

export async function EvolucaoPensionistasPorVinculoWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<MultiSerie>(
    "GetEvolucaoMensalPensionistasPorTipoVinculo",
    filtros
  );
  return (
    <PanelWithTitle header="Evolução mensal da quantidade de pensionistas por tipo de vínculo">
      <MultiSeriesChart dados={data} formato="numero" corrigirIpca={false} />
    </PanelWithTitle>
  );
}

export async function EvolucaoPagamentosBeneficiariosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<MultiSerie>(
    "GetEvolucaoMensalPagamentosInativosPensionistas",
    filtros
  );
  return (
    <PanelWithTitle header="Evolução mensal de pagamentos para inativos e pensionistas">
      <MultiSeriesChart dados={data} formato="moeda" corrigirIpca={false} />
    </PanelWithTitle>
  );
}

export async function EvolucaoQuantidadeBeneficiariosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<MultiSerie>(
    "GetEvolucaoMensalInativosEPensionistas",
    filtros
  );
  return (
    <PanelWithTitle header="Evolução mensal de inativos e pensionistas">
      <MultiSeriesChart dados={data} formato="numero" corrigirIpca={false} />
    </PanelWithTitle>
  );
}

export async function FaixaEtariaInativosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<{ nome: string; valor: number }[]>(
    "GetQuantidadePorFaixaEtariaInativos",
    filtros
  );
  const items: FolhaChartItem[] = (data ?? []).map((d) => ({ name: d.nome, value: d.valor }));
  return (
    <PanelWithTitle header="Faixa etária dos servidores inativos - em anos">
      {items.length ? (
        <FolhaBarChart items={items} />
      ) : (
        <div className="m-auto opacity-60 p-8 text-center">Sem dados para o filtro</div>
      )}
    </PanelWithTitle>
  );
}

export async function FaixaEtariaPensionistasWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<{ nome: string; valor: number }[]>(
    "GetQuantidadePorFaixaEtariaPensionistas",
    filtros
  );
  const items: FolhaChartItem[] = (data ?? []).map((d) => ({ name: d.nome, value: d.valor }));
  return (
    <PanelWithTitle header="Faixa etária dos pensionistas - em anos">
      {items.length ? (
        <FolhaBarChart items={items} />
      ) : (
        <div className="m-auto opacity-60 p-8 text-center">Sem dados para o filtro</div>
      )}
    </PanelWithTitle>
  );
}
