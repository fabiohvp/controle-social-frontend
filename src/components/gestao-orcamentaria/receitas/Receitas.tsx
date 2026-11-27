import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import AlertPanel from "@/components/panel/AlertPanel";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { MultiSerie, SerieItem } from "@/types/Serie";
import BarrasHorizontaisChart from "../_shared/BarrasHorizontaisChart";
import CardResumo, { Sumario } from "../_shared/CardResumo";
import ComposicaoChart from "../_shared/ComposicaoChart";
import { filtrarSeries, getVariacaoAnual } from "../_shared/series";
import TreemapChart, { TreemapNo } from "../_shared/TreemapChart";

/*
 * Gestão orçamentária > Receitas, igual para município e estado (site oficial:
 * Receita$1 / Receitas$3). Fora do escopo: cards de etiquetas (transferências
 * em destaque) e o aviso de "dados não enviados".
 */

type SumarioReceita = {
  arrecadada: number | null;
  arrecadadaPerCapita?: number | null;
  participacaoMunicipal?: number | null;
  participacaoPerCapitaMunicipal?: number | null;
  rankingMunicipal?: number | null;
  rankingPerCapitaMunicipal?: number | null;
};

export default async function Receitas({ esfera, anoExercicio }: EsferaProps) {
  const [
    sumario,
    composicao,
    receitaXDespesa,
    evolucaoAnual,
    arrecadacaoComparada,
    evolucaoMensal,
    treemap,
  ] = await Promise.all([
    getDadosApiEsfera<SumarioReceita>(esfera, anoExercicio, "Receita/GetSumario"),
    getDadosApiEsfera<{ name: string; value: number }[]>(
      esfera,
      anoExercicio,
      "Receita/GetValoresComposicaoDonut"
    ),
    getDadosApiEsfera<SerieItem[]>(
      esfera,
      anoExercicio,
      "ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativaBarrasHorizontais"
    ),
    getDadosApiEsfera<MultiSerie>(
      esfera,
      anoExercicio,
      "ReceitaDespesa/GetEvolucaoAnualReceitaArrecadadaXDespesaEmpenhadaXLiquidadaPorEsferaAdministrativa"
    ),
    getDadosApiEsfera<SerieItem[]>(
      esfera,
      anoExercicio,
      "Receita/GetArrecadacaoComparadaAnoAnterior"
    ),
    getDadosApiEsfera<MultiSerie>(
      esfera,
      anoExercicio,
      "ReceitaDespesa/GetEvolucaoMensalReceitaDespesaMultiseries"
    ),
    getDadosApiEsfera<TreemapNo[]>(
      esfera,
      anoExercicio,
      "Receita/GetTreemapReceitaArrecadadaPorClassificacaoNatureza"
    ),
  ]);

  const resumo: Sumario | null = sumario && {
    valor: sumario.arrecadada,
    participacaoMunicipal: sumario.participacaoMunicipal,
    rankingMunicipal: sumario.rankingMunicipal,
    perCapita: sumario.arrecadadaPerCapita,
    participacaoPerCapitaMunicipal: sumario.participacaoPerCapitaMunicipal,
    rankingPerCapitaMunicipal: sumario.rankingPerCapitaMunicipal,
  };
  const entePossessivo = esfera.tipo === "estado" ? "do Estado" : "do município";
  const anual = filtrarSeries(evolucaoAnual, [
    { tipo: "line", habilitada: true },
    { tipo: "line", habilitada: false },
    { tipo: "bar", habilitada: true },
    { tipo: "bar", habilitada: false },
    { tipo: "bar", habilitada: true },
  ]);
  const mensal = filtrarSeries(evolucaoMensal, [
    { tipo: "line", habilitada: true },
    { tipo: "bar", habilitada: false },
    { tipo: "bar", habilitada: true },
    { tipo: "bar", habilitada: false },
  ]);

  return (
    <div className="flex flex-col gap-2">
      <AlertPanel type="info" className="min-h-0">
        Os dados exibidos neste painel têm como fonte as remessas enviadas e
        homologadas mensalmente pelos órgãos {entePossessivo}, por meio do
        sistema CidadES.
        <br />
        Os dados serão divulgados no painel apenas quando todas as Unidades
        Gestoras homologarem. Os dados são apurados pela receita líquida.
      </AlertPanel>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-6">
        <CardResumo
          className="lg:col-span-2"
          titulo="Receitas Arrecadadas"
          descricao="São o montante total (impostos, taxas, contribuições e outras fontes de recursos) incorporado ao patrimônio que serve para custear as despesas públicas e as necessidades de investimentos públicos. As receitas intraorçamentárias estão inclusas."
          ano={anoExercicio}
          sumario={resumo}
        />
        <PanelWithDescription
          className="lg:col-span-2"
          titulo="Composição da Receita Arrecadada"
          descricao={`Distribuição da origem das receitas ${entePossessivo}. Este indicador demonstra o grau de dependência que o ente tem de transferências do Estado e da União, apontando se possui arrecadação sustentável ou não.`}
        >
          <ComposicaoChart dados={composicao} ano={anoExercicio} />
        </PanelWithDescription>
        <PanelWithDescription
          className="lg:col-span-2"
          titulo="Receitas X Despesas"
          descricao={`Comparativo entre as receitas e despesas ${entePossessivo}.`}
        >
          <BarrasHorizontaisChart dados={receitaXDespesa} ano={anoExercicio} />
        </PanelWithDescription>

        <PanelWithDescription
          className="lg:col-span-3"
          titulo="Evolução anual da Receita"
          descricao="Possibilita comparar o montante arrecadado no exercício (ano) em relação à arrecadação ocorrida no exercício anterior."
        >
          <MultiSeriesChart dados={anual.dados} tipos={anual.tipos} />
        </PanelWithDescription>
        <PanelWithDescription
          className="lg:col-span-3"
          titulo="Arrecadação comparada ao ano anterior"
          descricao="Possibilita comparar o montante arrecadado no exercício (ano) em relação à arrecadação ocorrida no exercício anterior."
        >
          <SingleSeriesChart
            dados={getVariacaoAnual(arrecadacaoComparada)}
            tipo="bar"
            formato="percentual"
            negativoVermelho
          />
        </PanelWithDescription>

        <PanelWithDescription
          className="lg:col-span-6"
          titulo="Evolução mensal da Receita"
          descricao="Possibilita comparar os gastos realizados com o montante arrecadado no mês e identificar a ocorrência de déficit (despesa maior que receita) ou superávit (receita maior que a despesa)."
        >
          <MultiSeriesChart
            dados={mensal.dados}
            tipos={mensal.tipos}
            corrigirIpca={anoExercicio}
          />
        </PanelWithDescription>

        <PanelWithDescription
          className="lg:col-span-6"
          titulo="Receitas arrecadadas por natureza"
          descricao="Representa de forma espacial a distribuição dos valores das receitas arrecadadas por natureza. Cada retângulo tem área proporcional ao valor do dado."
        >
          <TreemapChart dados={treemap} />
        </PanelWithDescription>
      </div>
    </div>
  );
}
