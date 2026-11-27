import DoughnutChart from "@/components/charts/DoughnutChart";
import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import NoDataChart from "@/components/charts/NoDataChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import Etiquetas from "@/components/previdencia/Etiquetas";
import PrevidenciaTreemap, {
  NoTreemap,
} from "@/components/previdencia/PrevidenciaTreemap";
import {
  PrevidenciaProps,
  getComparacaoAnual,
  getDadosPrevidencia,
  getDadosPrevidenciaReceitaDespesa,
  getDadosUnidadeGestora,
  getValorPorNatureza,
} from "@/components/previdencia/previdenciaApi";
import { getDadosApiEsfera } from "@/shared/esfera";
import { MultiSerie, SerieItem } from "@/types/Serie";

const CORES_COMPOSICAO = ["#607D8B", "#EFB4A3", "#F4B351", "#8BA2AD"];

type Composicao = { name: string; value: number }[];

const ETIQUETAS = [
  { chave: "aposentadorias", titulo: "Despesas com aposentadorias" },
  { chave: "pensoes", titulo: "Despesas com pensões" },
  {
    chave: "outrosBeneficiosPrevidenciarios",
    titulo: "Despesas com outros benefícios previdenciários",
  },
];

function getComposicaoPercentual(composicao: Composicao | null) {
  const total = composicao?.reduce((soma, item) => soma + item.value, 0) ?? 0;
  if (!composicao || total <= 0) return [];
  return composicao.map((item) => ({
    name: item.name,
    value: Math.round((item.value / total) * 10000) / 100,
  }));
}

/** Previdência > Despesas, igual para município e Estado (só muda o controller, por `esfera.tipo`) */
export default async function Despesas(props: PrevidenciaProps) {
  const { esfera, anoExercicio, codigoUnidadeGestora } = props;
  const ug = (recurso: string) =>
    getDadosUnidadeGestora<SerieItem[]>(props, recurso);
  const ugMulti = (recurso: string) =>
    getDadosUnidadeGestora<MultiSerie>(props, recurso);

  const [
    receitaXDespesa,
    composicao,
    resultado,
    evolucaoComposicao,
    evolucaoAnual,
    despesaPaga,
    evolucaoMensal,
    aliquotas,
    treemapFuncional,
    treemapNatureza,
    etiquetasApi,
  ] = await Promise.all([
    ug("ReceitaDespesa/GetReceitaXDespesaPorUnidadeGestoraBarrasHorizontais"),
    getDadosPrevidenciaReceitaDespesa<Composicao>(
      props,
      "Despesa/GetValoresComposicaoPrevidencia"
    ),
    ug("ReceitaDespesa/GetResultadoOrcamentarioPorUnidadeGestoraSingleseries"),
    getDadosPrevidenciaReceitaDespesa<MultiSerie>(
      props,
      "Despesa/GetValoresComposicaoPrevidenciaUltimos5AnosMultiseries"
    ),
    ugMulti(
      "ReceitaDespesa/GetEvolucaoAnualReceitaArrecadadaXDespesaEmpenhadaXLiquidadaPorUnidadeGestoraMultiseries"
    ),
    ug("Despesa/GetEvolucaoAnualDespesaPagaPorUnidadeGestoraSingleseries"),
    ugMulti("ReceitaDespesa/GetEvolucaoMensalReceitaDespesaMultiseries"),
    getDadosPrevidencia<MultiSerie>(
      "PrevidenciaAliquota/GetEvolucaoAliquotasMultiseries",
      { anoExercicio, codigoUnidadeGestora }
    ),
    getDadosUnidadeGestora<NoTreemap[]>(
      props,
      "Despesa/GetTreemapDespesaLiquidadaPorClassificacaoFuncional"
    ),
    getDadosUnidadeGestora<NoTreemap[]>(
      props,
      "Despesa/GetTreemapDespesaLiquidadaPorClassificacaoNatureza"
    ),
    getDadosApiEsfera<Record<string, string[]>>(
      esfera,
      anoExercicio,
      "Despesa/GetValoresEtiquetasPrevidencia"
    ),
  ]);

  const etiquetas = await Promise.all(
    ETIQUETAS.map(async ({ chave, titulo }) => {
      const codigos = etiquetasApi?.[chave];
      const valor = codigos?.length
        ? await getValorPorNatureza(
            props,
            "Despesa/GetDespesaLiquidadaPorClassificacaoNatureza",
            codigos
          )
        : null;
      return { titulo, valor };
    })
  );
  const itensComposicao = getComposicaoPercentual(composicao);

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-12" id="despesas-previdencia">
      <PanelWithDescription
        className="lg:col-span-4"
        titulo="Resultado Orçamentário"
        descricao="Comparativo entre receitas arrecadas e despesas executadas, revelando o resultado orçamentário."
      >
        <SingleSeriesChart dados={resultado} tipo="bar" negativoVermelho />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-4"
        titulo="Composição da Despesa"
        descricao="Distribuição das despesas orçamentárias por grupo de natureza, indicando a proporção da despesa com pessoal e encargos em relação às demais despesas."
      >
        {itensComposicao.length ? (
          <DoughnutChart
            colors={CORES_COMPOSICAO}
            items={itensComposicao}
            label={{
              fontSize: 12,
              fontWeight: "normal",
              formatter: "{c}%",
              position: "outer",
            }}
            legend={{ bottom: 0, left: "center", orient: "horizontal" }}
            style={{ height: "260px" }}
          />
        ) : (
          <NoDataChart />
        )}
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-4"
        titulo="Receitas X Despesas"
        descricao="Comparativo entre as receitas e despesas do município."
      >
        <SingleSeriesChart dados={receitaXDespesa} tipo="bar" />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-12"
        titulo="Evolução anual da composição da Despesa"
        descricao="Evolução das despesas, por natureza."
      >
        <MultiSeriesChart dados={evolucaoComposicao} />
      </PanelWithDescription>
      <div className="lg:col-span-12">
        <Etiquetas
          titulo="Despesas em destaque"
          descricao="Destaque de indicadores relevantes para a gestão de despesas previdenciárias, evidenciando-se o resultado acumulado, a evolução mensal e a evolução anual das principais despesas executadas pelo RPPS."
          anoExercicio={anoExercicio}
          etiquetas={etiquetas}
        />
      </div>
      <PanelWithDescription
        className="lg:col-span-7"
        titulo="Evolução Despesas Empenhadas X Despesas Liquidadas X Despesas Pagas"
        descricao="Evolução anual das despesas empenhadas, liquidadas e pagas, correlacionando-as com as receitas arrecadadas pelo Fundo Previdenciário."
      >
        <MultiSeriesChart
          dados={evolucaoAnual}
          tipos={["line", "bar", "bar", "bar"]}
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-5"
        titulo="Despesa paga em relação ao ano anterior"
        descricao="Indicador apurado com base na relação entre a despesa paga no exercício e a despesa paga no exercício anterior."
      >
        <SingleSeriesChart
          dados={getComparacaoAnual(despesaPaga)}
          formato="percentual"
          tipo="bar"
          negativoVermelho
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-12"
        titulo="Evolução mensal das despesas"
        descricao="Comparação mensal entre receitas arrecadadas e despesas executadas pelo Fundo Previdenciário, possibilitando a identificação de desequilíbrios, tendências e/ou distorções."
      >
        <MultiSeriesChart
          dados={evolucaoMensal}
          tipos={["line", "bar", "bar", "bar"]}
          corrigirIpca={anoExercicio}
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-12"
        titulo="Evolução de alíquotas"
        descricao={
          <>
            Atualmente a fonte de dados são as remessas do CidadES.
            <br />
            Havendo escalonamento de alíquotas por salário, o gráfico exibe um
            ponto principal; passe o mouse sobre ele para detalhar os outros
            valores.
          </>
        }
      >
        <MultiSeriesChart
          dados={aliquotas}
          formato="percentual"
          tipos={["line", "line", "line"]}
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-12"
        titulo="Distribuição das despesas liquidadas por: função e subfunção"
        descricao="Representa de forma espacial a distribuição do valores das despesas liquidadas por função, subfunção e natureza. Cada retângulo tem área proporcional ao valor do dado."
      >
        <PrevidenciaTreemap dados={treemapFuncional} ano={anoExercicio} />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-12"
        titulo="Distribuição das despesas liquidadas por: natureza"
        descricao="Representa de forma espacial a distribuição do valores das despesas liquidadas por função, subfunção e natureza. Cada retângulo tem área proporcional ao valor do dado."
      >
        <PrevidenciaTreemap dados={treemapNatureza} ano={anoExercicio} />
      </PanelWithDescription>
    </div>
  );
}
