import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import AlertPanel from "@/components/panel/AlertPanel";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { COLOR } from "@/theme/colors";
import { MultiSerie, SerieItem } from "@/types/Serie";
import BarrasHorizontaisChart from "../_shared/BarrasHorizontaisChart";
import CardResumo, { Sumario } from "../_shared/CardResumo";
import ComposicaoChart from "../_shared/ComposicaoChart";
import { getVariacaoAnual } from "../_shared/series";
import { TreemapNo } from "../_shared/TreemapChart";
import DistribuicaoDespesas from "./DistribuicaoDespesas";

/*
 * Gestão orçamentária > Despesas, igual para município e estado (site oficial:
 * Despesas / Despesas$5). Fora do escopo: cards de etiquetas (despesas em
 * destaque) e o aviso de "dados não enviados".
 */

type SumarioDespesa = {
  valor: number | null;
  valorPerCapita?: number | null;
  participacaoMunicipal?: number | null;
  participacaoPerCapitaMunicipal?: number | null;
  rankingMunicipal?: number | null;
  rankingPerCapitaMunicipal?: number | null;
};

type DespesaPaga = {
  ano: number;
  nome: string;
  valores?: { atual: number | null; anterior: number | null };
};

/** Despesa paga: valores atual/anterior => série de anos (o 1º ano traz o anterior) */
function getSerieDespesaPaga(dados: DespesaPaga[] | null) {
  if (!dados?.length) return null;
  return dados.reduce<{ ano: number; nome?: string; valor: number | null }[]>(
    (acc, item, i) => {
      if (i === 0)
        acc.push({ ano: item.ano - 1, valor: item.valores?.anterior ?? null });
      acc.push({
        ano: item.ano,
        nome: item.nome,
        valor: item.valores?.atual ?? null,
      });
      return acc;
    },
    []
  );
}

export default async function Despesas({ esfera, anoExercicio }: EsferaProps) {
  const get = <T,>(recurso: string) =>
    getDadosApiEsfera<T>(esfera, anoExercicio, recurso);

  const [
    sumario,
    composicao,
    receitaXDespesa,
    evolucaoAnual,
    despesaPaga,
    evolucaoMensal,
    correntes,
    capital,
    treemapFuncional,
    treemapNatureza,
  ] = await Promise.all([
    get<SumarioDespesa>("Despesa/GetSumarioLiquidada"),
    get<{ name: string; value: number }[]>(
      "Despesa/GetMaioresDespesasLiquidadasPorFuncao"
    ),
    get<SerieItem[]>(
      "ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativaBarrasHorizontais"
    ),
    get<MultiSerie>(
      "ReceitaDespesa/GetEvolucaoAnualReceitaArrecadadaXDespesaEmpenhadaXLiquidadaPorEsferaAdministrativa"
    ),
    get<DespesaPaga[]>(
      "Despesa/GetEvolucaoAnualDespesaPagaPorEsferaAdministrativa"
    ),
    get<MultiSerie>("ReceitaDespesa/GetEvolucaoMensalReceitaDespesaMultiseries"),
    get<SerieItem[]>("Despesa/GetEvolucaoMensalDespesasCorrente"),
    get<SerieItem[]>("Despesa/GetEvolucaoMensalDespesasCapital"),
    get<TreemapNo[]>(
      "Despesa/GetTreemapDespesaLiquidadaPorClassificacaoFuncional"
    ),
    get<TreemapNo[]>(
      "Despesa/GetTreemapDespesaLiquidadaPorClassificacaoNatureza"
    ),
  ]);

  const resumo: Sumario | null = sumario && {
    valor: sumario.valor,
    participacaoMunicipal: sumario.participacaoMunicipal,
    rankingMunicipal: sumario.rankingMunicipal,
    perCapita: sumario.valorPerCapita,
    participacaoPerCapitaMunicipal: sumario.participacaoPerCapitaMunicipal,
    rankingPerCapitaMunicipal: sumario.rankingPerCapitaMunicipal,
  };
  const entePossessivo =
    esfera.tipo === "estado" ? "do Estado" : "do município";

  const configAnual: { tipo: "line" | "bar"; habilitada: boolean }[] = [
    { tipo: "line", habilitada: false },
    { tipo: "line", habilitada: true },
    { tipo: "bar", habilitada: true },
    { tipo: "bar", habilitada: true },
    { tipo: "bar", habilitada: true },
  ];
  const configMensal: { tipo: "line" | "bar"; habilitada: boolean }[] = [
    { tipo: "line", habilitada: true },
    { tipo: "bar", habilitada: false },
    { tipo: "bar", habilitada: true },
    { tipo: "bar", habilitada: false },
  ];

  return (
    <div className="flex flex-col gap-2">
      <AlertPanel type="info" className="min-h-0">
        Os dados exibidos neste painel têm como fonte as remessas enviadas e
        homologadas mensalmente pelos órgãos {entePossessivo}, por meio do
        sistema CidadES. As despesas executadas referem-se às despesas
        liquidadas.
      </AlertPanel>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-6">
        <CardResumo
          className="lg:col-span-2"
          titulo="Despesa Liquidada"
          descricao="Despesa liquidada é a fase da despesa orçamentária em que se verifica o direito adquirido pelo credor, com base nos títulos e documentos comprobatórios da entrega do material, da prestação do serviço ou da execução da obra. As despesas intraorçamentárias estão inclusas."
          ano={anoExercicio}
          sumario={resumo}
        />
        <PanelWithDescription
          className="lg:col-span-2"
          titulo="Composição da Despesa Liquidada"
          descricao="Composição das despesas liquidadas, classificadas por função."
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
          titulo="Evolução Despesas Empenhadas X Despesas Liquidadas X Despesas Pagas"
          descricao="Possibilita comparar os gastos realizados com o montante arrecadado no exercício e identificar a ocorrência de déficit (despesa maior que receita) ou superávit (receita maior que despesa)."
        >
          <MultiSeriesChart
            dados={evolucaoAnual}
            seriesConfig={configAnual}
            cores={COLOR.padraoRange}
          />
        </PanelWithDescription>
        <PanelWithDescription
          className="lg:col-span-3"
          titulo="Despesas pagas em relação ao ano anterior"
          descricao="Possibilita comparar o valor da despesa paga no ano em relação à despesa paga no ano anterior."
        >
          <SingleSeriesChart
            dados={getVariacaoAnual(getSerieDespesaPaga(despesaPaga))}
            tipo="bar"
            formato="percentual"
            negativoVermelho
          />
        </PanelWithDescription>

        <PanelWithDescription
          className="lg:col-span-6"
          titulo="Evolução mensal das Despesas"
          descricao="Possibilita comparar os gastos realizados com o montante arrecadado no mês e identificar a ocorrência de déficit (despesa maior que receita) ou superávit (receita maior que a despesa)."
        >
          <MultiSeriesChart
            dados={evolucaoMensal}
            seriesConfig={configMensal}
            cores={COLOR.padraoRange}
            corrigirIpca={anoExercicio}
          />
        </PanelWithDescription>

        <PanelWithDescription
          className="lg:col-span-3"
          titulo="Despesas Correntes"
          descricao="Evolução das despesas que não contribuem, diretamente, para a formação ou aquisição de um bem de capital, tais como remunerações de servidores, custeio dos órgãos públicos e pagamento de juros."
        >
          <SingleSeriesChart dados={correntes} tipo="bar" />
        </PanelWithDescription>
        <PanelWithDescription
          className="lg:col-span-3"
          titulo="Despesas de Capital"
          descricao="Evolução das despesas que contribuem, diretamente, para a formação ou aquisição de um bem de capital, tais como investimentos, aquisições de imóveis já em utilização e amortização de dívida."
        >
          <SingleSeriesChart dados={capital} tipo="bar" />
        </PanelWithDescription>

        <DistribuicaoDespesas
          funcional={treemapFuncional}
          natureza={treemapNatureza}
        />
      </div>
    </div>
  );
}
