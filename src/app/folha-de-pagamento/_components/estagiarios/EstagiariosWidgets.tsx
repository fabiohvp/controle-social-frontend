import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { MultiSerie } from "@/types/Serie";
import { FolhaDePagamentoFiltros, getFolhaDePagamento } from "../../folhaDePagamentoApi";

type Props = { filtros: FolhaDePagamentoFiltros };

const CORES_HOMEM_MULHER = ["#9D8AAC", "#8AA2AD"];

export async function HomensMulheresEstagiariosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<MultiSerie>(
    "GetQuantidadeEstagiariosEAprendizesHomensEMulheres",
    filtros
  );
  return (
    <PanelWithTitle header="Mulheres e Homens">
      <MultiSeriesChart dados={data} cores={CORES_HOMEM_MULHER} formato="numero" corrigirIpca={false} />
    </PanelWithTitle>
  );
}

export async function EvolucaoPagamentosEstagiariosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<MultiSerie>(
    "GetEvolucaoMensalPagamentosEstagiarioseEAprendizes",
    filtros
  );
  return (
    <PanelWithTitle header="Evolução mensal do pagamento para estagiários e adolescentes aprendizes">
      <MultiSeriesChart dados={data} formato="moeda" corrigirIpca={false} />
    </PanelWithTitle>
  );
}

export async function EvolucaoQuantidadeEstagiariosWidget({ filtros }: Props) {
  const data = await getFolhaDePagamento<MultiSerie>(
    "GetEvolucaMensalQuantidadeEstagiariosEAprendizes",
    filtros
  );
  return (
    <PanelWithTitle header="Evolução mensal da quantidade de estagiários e adolescentes aprendizes">
      <MultiSeriesChart dados={data} formato="numero" corrigirIpca={false} />
    </PanelWithTitle>
  );
}
