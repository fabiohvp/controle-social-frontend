import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { SerieItem } from "@/types/Serie";

/** Gestão orçamentária > Resultado orçamentário (site oficial: ResultadoOrcamentario), igual para município e estado */

type Resultado = {
  receitaRealizada: SerieItem[];
  despesaExecutada: SerieItem[];
  resultadoOrcamentario: SerieItem[];
};

export default async function ResultadoOrcamentario({
  esfera,
  anoExercicio,
}: EsferaProps) {
  const dados = await getDadosApiEsfera<Resultado>(
    esfera,
    anoExercicio,
    "ReceitaDespesa/GetResultadoOrcamentarioComparacaoAnual"
  );

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      <PanelWithDescription
        titulo="Receita realizada acumulada"
        descricao="Comparativo de receitas arrecadadas, acumuladas no período, ano atual versus ano anterior."
      >
        <SingleSeriesChart dados={dados?.receitaRealizada ?? null} tipo="bar" />
      </PanelWithDescription>
      <PanelWithDescription
        titulo="Despesa executada acumulada"
        descricao="Comparativo de despesas executadas, acumuladas no período, ano atual versus ano anterior. No período de janeiro a novembro a despesa executada refere-se às despesas liquidadas no período, enquanto que em dezembro trata-se do total de despesa empenhada no ano."
      >
        <SingleSeriesChart dados={dados?.despesaExecutada ?? null} tipo="bar" />
      </PanelWithDescription>
      <PanelWithDescription
        titulo="Resultado orçamentário"
        descricao="Comparativo de resultado orçamento no período, ano atual versus ano anterior. O resultado orçamentário é obtido pela diferença entre “receita realizada acumulada” e a “despesa executada acumulada”."
      >
        <SingleSeriesChart
          dados={dados?.resultadoOrcamentario ?? null}
          tipo="bar"
          negativoVermelho
        />
      </PanelWithDescription>
    </div>
  );
}
