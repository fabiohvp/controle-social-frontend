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
import TreemapChart, { TreemapNo } from "../_shared/TreemapChart";
import CardsDestaquesReceitas, { EtiquetaItem } from "./CardsDestaquesReceitas";

type SumarioReceita = {
  arrecadada: number | null;
  arrecadadaPerCapita?: number | null;
  participacaoMunicipal?: number | null;
  participacaoPerCapitaMunicipal?: number | null;
  rankingMunicipal?: number | null;
  rankingPerCapitaMunicipal?: number | null;
};

const ETIQUETAS_MUNICIPIO: Omit<EtiquetaItem, "valor">[] = [
  // Próprias
  {
    grupo: "proprias",
    codigo: 5,
    descricao: "IPTU",
    titulo: "Imposto Predial e Territorial Urbano",
    icone: "home",
  },
  {
    grupo: "proprias",
    codigo: 8,
    descricao: "ITBI",
    titulo: "Imposto sobre a Transmissão de Bens Imóveis",
    icone: "exchange",
  },
  {
    grupo: "proprias",
    codigo: 7,
    descricao: "ISS",
    titulo: "Imposto Sobre Serviço",
    icone: "cogs",
  },
  // Estado
  {
    grupo: "estado",
    codigo: 4,
    descricao: "ICMS",
    titulo:
      "Imposto sobre Operações relativas à Circulação de Mercadorias e Prestação de Serviços",
    icone: "cart",
  },
  {
    grupo: "estado",
    codigo: 6,
    descricao: "IPVA",
    titulo: "Imposto sobre a Propriedade de Veículos Automotores",
    icone: "car",
  },
  {
    grupo: "estado",
    codigo: 2,
    descricao: "Convênios",
    titulo:
      "Valor recebido a partir de convênios entre o Estado e o Município",
    icone: "handshake",
  },
  {
    grupo: "estado",
    codigo: 12,
    descricao: "Petróleo",
    titulo: "Royalties de Petróleo",
    icone: "oil",
  },
  // União
  {
    grupo: "uniao",
    codigo: 3,
    descricao: "FMP",
    titulo: "Fundo de Participação dos Municípios",
    icone: "home",
  },
  {
    grupo: "uniao",
    codigo: 1,
    descricao: "Convênio",
    titulo:
      "Valor recebido a partir de convênios entre a União e o Município",
    icone: "exchange",
  },
  {
    grupo: "uniao",
    codigo: 11,
    descricao: "Petróleo",
    titulo: "Royalties de Petróleo",
    icone: "cogs",
  },
];

const ETIQUETAS_ESTADO: Omit<EtiquetaItem, "valor">[] = [
  // Próprias
  {
    grupo: "proprias",
    codigo: 1003,
    descricao: "ICMS",
    titulo:
      "Imposto sobre Operações relativas à Circulação de Mercadorias e Prestação de Serviços",
    icone: "cart",
  },
  {
    grupo: "proprias",
    codigo: 1004,
    descricao: "IPVA",
    titulo: "Imposto sobre a Propriedade de Veículos Automotores",
    icone: "car",
  },
  {
    grupo: "proprias",
    codigo: 1005,
    descricao: "ITCD",
    titulo:
      "Imposto sobre Transmissão Causa Mortis e Doação de Quaisquer Bens ou Direitos",
    icone: "usd",
  },
  // União
  {
    grupo: "uniao",
    codigo: 1006,
    descricao: "FPE + IPI + CIDE",
    titulo: "Participação na receita da União",
    icone: "usd",
  },
  {
    grupo: "uniao",
    codigo: 1007,
    descricao: "SUS",
    titulo: "Transferência de recursos do SUS",
    icone: "medkit",
  },
  {
    grupo: "uniao",
    codigo: 1008,
    descricao: "FUNDEB",
    titulo: "Transferências do FUNDEB",
    icone: "teacher",
  },
];

const CONFIG_ANUAL: { tipo: "line" | "bar"; habilitada: boolean }[] = [
  { tipo: "line", habilitada: true },
  { tipo: "line", habilitada: false },
  { tipo: "bar", habilitada: true },
  { tipo: "bar", habilitada: false },
  { tipo: "bar", habilitada: true },
];

const CONFIG_MENSAL: { tipo: "line" | "bar"; habilitada: boolean }[] = [
  { tipo: "line", habilitada: true },
  { tipo: "bar", habilitada: false },
  { tipo: "bar", habilitada: true },
  { tipo: "bar", habilitada: false },
];

export default async function Receitas({ esfera, anoExercicio }: EsferaProps) {
  const etiquetasBase =
    esfera.tipo === "estado" ? ETIQUETAS_ESTADO : ETIQUETAS_MUNICIPIO;

  const [
    sumario,
    composicao,
    receitaXDespesa,
    evolucaoAnual,
    arrecadacaoComparada,
    evolucaoMensal,
    treemap,
    etiquetasValores,
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
    Promise.all(
      etiquetasBase.map(async (e) => {
        const res = await getDadosApiEsfera<{ valor: number }>(
          esfera,
          anoExercicio,
          "Receita/GetReceitaArrecadadaPorClassificacaoNatureza/etiqueta",
          { etiqueta: e.codigo }
        );
        return {
          ...e,
          valor: res?.valor ?? 0,
        };
      })
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
          <MultiSeriesChart
            dados={evolucaoAnual}
            seriesConfig={CONFIG_ANUAL}
            cores={COLOR.padraoRange}
          />
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

        <CardsDestaquesReceitas
          esfera={esfera}
          ano={anoExercicio}
          etiquetas={etiquetasValores}
        />

        <PanelWithDescription
          className="lg:col-span-6"
          titulo="Evolução mensal da Receita"
          descricao="Possibilita comparar os gastos realizados com o montante arrecadado no mês e identificar a ocorrência de déficit (despesa maior que receita) ou superávit (receita maior que a despesa)."
        >
          <MultiSeriesChart
            dados={evolucaoMensal}
            seriesConfig={CONFIG_MENSAL}
            cores={COLOR.padraoRange}
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
