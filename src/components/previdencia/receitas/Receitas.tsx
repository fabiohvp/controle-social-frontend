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
import { isInstituto } from "@/shared/previdencia";
import { COLOR } from "@/theme/colors";
import { MultiSerie, SerieItem } from "@/types/Serie";

const CORES_COMPOSICAO = COLOR.padraoRange;

type EtiquetasApi = Record<string, string[]>;
type Composicao = { name: string; value: number }[];

const ETIQUETAS = [
  { chave: "servidor", titulo: "Servidor" },
  { chave: "aporteAtuarial", titulo: "Aporte Atuarial" },
  { chave: "compensacoes", titulo: "Compensação Previdenciária" },
  { chave: "rendimentos", titulo: "Rendimentos de Aplicações" },
  { chave: "patronal", titulo: "Patronal" },
  { chave: "parcelamentos", titulo: "Parcelamentos" },
];

function getComposicaoPercentual(composicao: Composicao | null) {
  const total = composicao?.reduce((soma, item) => soma + item.value, 0) ?? 0;
  if (!composicao || total <= 0) return [];
  return composicao.map((item) => ({
    name: item.name,
    value: Math.round((item.value / total) * 10000) / 100,
  }));
}

type Props = PrevidenciaProps & {
  /** o ente tem segregação de massa (fundos financeiro e previdenciário além do instituto) */
  segregacaoMassa?: boolean;
};

/**
 * Previdência > Receitas (site oficial: Receita de previdência). Igual para
 * município e Estado: só muda o controller, resolvido por `esfera.tipo`.
 */
export default async function Receitas(props: Props) {
  const { esfera, anoExercicio, codigoUnidadeGestora, segregacaoMassa } = props;
  const ug = (recurso: string) =>
    getDadosUnidadeGestora<SerieItem[]>(props, recurso);
  const ugMulti = (recurso: string) =>
    getDadosUnidadeGestora<MultiSerie>(props, recurso);
  const patrimonio = <T,>(metodo: string) =>
    getDadosPrevidencia<T>(`Patrimonio/${metodo}`, {
      anoExercicio,
      codigoUnidadeGestora,
    });

  const [
    resultado,
    composicao,
    receitaXDespesa,
    evolucaoComposicao,
    etiquetasApi,
    evolucaoAnual,
    receitaAnual,
    evolucaoMensal,
    percentualAporte,
    aporteXRcl,
    aliquotas,
    treemap,
  ] = await Promise.all([
    ug("ReceitaDespesa/GetResultadoOrcamentarioPorUnidadeGestoraSingleseries"),
    getDadosPrevidenciaReceitaDespesa<Composicao>(
      props,
      "Receita/GetValoresComposicaoPrevidencia"
    ),
    ug("ReceitaDespesa/GetReceitaXDespesaPorUnidadeGestoraBarrasHorizontais"),
    getDadosPrevidenciaReceitaDespesa<MultiSerie>(
      props,
      "Receita/GetValoresComposicaoPrevidenciaUltimos5AnosMultiseries"
    ),
    getDadosApiEtiquetas(props),
    ugMulti(
      "ReceitaDespesa/GetEvolucaoAnualResultadoOrcamentarioPorUnidadeGestoraMultiseries"
    ),
    ug("Receita/GetEvolucaoAnualReceitaArrecadadaPorUnidadeGestoraSingleseries"),
    ugMulti("ReceitaDespesa/GetEvolucaoMensalReceitaDespesaMultiseries"),
    patrimonio<SerieItem[]>("GetEvolucaoAnualAporteSobreRCLAjustadaSingleseries"),
    patrimonio<MultiSerie>("GetEvolucaoAnualAporteERCLAjustadaMultiseries"),
    getDadosPrevidencia<MultiSerie>(
      "PrevidenciaAliquota/GetEvolucaoAliquotasMultiseries",
      { anoExercicio, codigoUnidadeGestora }
    ),
    getDadosUnidadeGestora<NoTreemap[]>(
      props,
      "Receita/GetTreemapReceitaArrecadadaPorClassificacaoNatureza"
    ),
  ]);

  // com segregação de massa, o aporte do ente ao instituto são "transferências recebidas"
  const mudaDescricao =
    !!segregacaoMassa &&
    isInstituto({ codigo: codigoUnidadeGestora, nome: "", titulo: "" }) &&
    anoExercicio > 2017;
  const tituloAporteXRcl = mudaDescricao
    ? "Evolução das transferências recebidas X RCL ajustada"
    : "Evolução do aporte financeiro X RCL ajustada";
  const descricaoAporteXRcl = mudaDescricao
    ? "Tranferências recebidas sobre a RCL ajustada."
    : "Aporte financeiro sobre a RCL ajustada.";
  const tituloPercentualAporte = mudaDescricao
    ? "Evolução Percentual das transferências recebidas sobre a RCL ajustada"
    : "Evolução Percentual do aporte financeiro sobre a RCL ajustada";
  const descricaoPercentualAporte = mudaDescricao
    ? "Percentual das transferências recebidas sobre a RCL ajustada."
    : "Percentual do aporte financeiro sobre a RCL ajustada.";

  const etiquetas = etiquetasApi.map((etiqueta) => ({
    titulo: etiqueta.titulo,
    valor: etiqueta.valor,
  }));
  const itensComposicao = getComposicaoPercentual(composicao);

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-12" id="receitas-previdencia">
      <PanelWithDescription
        className="lg:col-span-4"
        titulo="Resultado Orçamentário"
        descricao="Comparativo entre receitas arrecadas e despesas executadas, revelando o resultado orçamentário."
      >
        <SingleSeriesChart dados={resultado} tipo="bar" negativoVermelho />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-4"
        titulo="Composição da Receita Arrecadada"
        descricao="Distribuição das receitas orçamentárias por origem, indicando a capacidade de constituição de receitas patrimoniais por meio da capitalização de investimentos do Fundo Previdenciário."
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
        titulo="Evolução anual da composição da Receita"
        descricao="Evolução da receita arrecada, por origem."
      >
        <MultiSeriesChart dados={evolucaoComposicao} />
      </PanelWithDescription>
      <div className="lg:col-span-12">
        <Etiquetas
          titulo="Receitas próprias do Município em destaque"
          descricao="Destaque das mais relevantes receitas arrecadadas pelo próprio Município."
          anoExercicio={anoExercicio}
          etiquetas={etiquetas}
        />
      </div>
      <PanelWithDescription
        className="lg:col-span-7"
        titulo="Evolução anual da Receita"
        descricao="Evolução anual do resultado orçamentário, apurado por meio da correlação entre receitas arrecadadas e despesas executadas, revelando superávit ou déficit orçamentário no exercício. No período de janeiro a novembro a despesa executada refere-se às despesas liquidadas no período, enquanto que em dezembro trata-se do total de despesa empenhada no ano."
      >
        <MultiSeriesChart dados={evolucaoAnual} />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-5"
        titulo="Arrecadação comparada ao ano anterior"
        descricao="Indicador apurado com base na relação entre a receita arrecadada no exercício e a receita arrecadada no exercício anterior."
      >
        <SingleSeriesChart
          dados={getComparacaoAnual(receitaAnual)}
          formato="percentual"
          tipo="bar"
          negativoVermelho
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-12"
        titulo="Evolução mensal da receita"
        descricao="Possibilita comparar os gastos realizados com o montante arrecadado no mês e identificar a ocorrência de déficit (despesa maior que receita) ou superávit (receita maior que a despesa)."
      >
        <MultiSeriesChart
          dados={evolucaoMensal}
          tipos={["line", "bar", "bar", "bar"]}
          corrigirIpca={anoExercicio}
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-6"
        titulo={tituloPercentualAporte}
        descricao={descricaoPercentualAporte}
      >
        <SingleSeriesChart dados={percentualAporte} formato="percentual" />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-6"
        titulo={tituloAporteXRcl}
        descricao={descricaoAporteXRcl}
      >
        <MultiSeriesChart dados={aporteXRcl} tipos={["line", "line"]} />
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
        titulo="Receitas arrecadadas por natureza"
        descricao="Representa de forma espacial a distribuição dos valores das receitas arrecadadas por natureza. Cada retângulo tem área proporcional ao valor do dado."
      >
        <PrevidenciaTreemap dados={treemap} ano={anoExercicio} />
      </PanelWithDescription>
    </div>
  );
}

/** Valor arrecadado por etiqueta (códigos de natureza de receita vindos da API) */
async function getDadosApiEtiquetas(props: PrevidenciaProps) {
  const codigos = await getDadosApiEsfera<EtiquetasApi>(
    props.esfera,
    props.anoExercicio,
    "Receita/GetValoresEtiquetasPrevidencia"
  );
  return Promise.all(
    ETIQUETAS.map(async ({ chave, titulo }) => {
      const codigosCompletos = codigos?.[chave];
      const valor = codigosCompletos?.length
        ? await getValorPorNatureza(
            props,
            "Receita/GetReceitaArrecadadaPorClassificacaoNatureza",
            codigosCompletos
          )
        : null;
      return { titulo, valor };
    })
  );
}
