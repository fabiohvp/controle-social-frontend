import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { MultiSerie, SerieItem } from "@/types/Serie";
import AvisoPagina from "../_comum/AvisoPagina";
import CardAplicacao from "../_comum/CardAplicacao";
import MedidorLimite from "../_comum/MedidorLimite";
import {
  getFaixasLimiteMinimo,
  getSituacaoLimiteMinimo,
  getTextoLimiteMinimo,
} from "../_comum/situacaoLimite";

/*
 * Gestão fiscal > Limites com educação (site oficial: Educacao,
 * gestaoFiscalMunicipio-educacao). Controller: <Municipio|Estado>Controllers/Educacao.
 */

const LIMITE_MINIMO_EDUCACAO = 25;
const ESCALA_MEDIDOR = 75;

type Sumario = {
  aplicacao: number;
  aplicacaoPercentual: number;
  aplicacaoPerCapita: number;
  participacaoMunicipal: number;
  participacaoPerCapitaMunicipal: number;
  rankingMunicipal: number;
  rankingPerCapitaMunicipal: number;
};

type EvolucaoAnual = { aplicacao: SerieItem[]; percentual: SerieItem[] };

export default async function Educacao({ esfera, anoExercicio }: EsferaProps) {
  const [sumario, evolucao, porAluno] = await Promise.all([
    getDadosApiEsfera<Sumario>(esfera, anoExercicio, "Educacao/GetSumario"),
    getDadosApiEsfera<EvolucaoAnual>(
      esfera,
      anoExercicio,
      "Educacao/GetGraficosEvolucaoAnualAplicacao"
    ),
    getDadosApiEsfera<MultiSerie>(
      esfera,
      anoExercicio,
      "Educacao/GetGraficosEvolucaoAnualAplicacaoPorAluno"
    ),
  ]);

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-6">
      <CardAplicacao
        className="lg:col-span-2"
        titulo="Aplicação"
        descricao="Este é o valor aplicado em manutenção e desenvolvimento do ensino."
        valor={sumario?.aplicacao}
        ano={anoExercicio}
        media={sumario?.participacaoMunicipal}
        ranking={sumario?.rankingMunicipal}
      />
      <CardAplicacao
        className="lg:col-span-2"
        titulo="Aplicação per capita"
        descricao="Este é o valor aplicado em manutenção e desenvolvimento do ensino. O valor da aplicação per capita (por aluno) é calculado de acordo com o número de alunos da rede municipal informado pelo INEP."
        valor={sumario?.aplicacaoPerCapita}
        ano={anoExercicio}
        media={sumario?.participacaoPerCapitaMunicipal}
        ranking={sumario?.rankingPerCapitaMunicipal}
      />
      <MedidorLimite
        className="lg:col-span-2"
        titulo="Limite constitucional"
        descricao="A Constituição Federal estabelece que o município deve aplicar o limite mínimo de 25% da receita resultante de impostos, incluídas transferências de impostos, para a manutenção e desenvolvimento do ensino."
        valor={sumario?.aplicacaoPercentual}
        max={ESCALA_MEDIDOR}
        faixas={getFaixasLimiteMinimo(LIMITE_MINIMO_EDUCACAO, ESCALA_MEDIDOR)}
        situacao={getSituacaoLimiteMinimo(
          sumario?.aplicacaoPercentual,
          LIMITE_MINIMO_EDUCACAO
        )}
        texto={getTextoLimiteMinimo(
          sumario?.aplicacaoPercentual,
          LIMITE_MINIMO_EDUCACAO,
          anoExercicio,
          "da receita"
        )}
        nomeMedidor="Limite constitucional"
      />

      <PanelWithDescription
        className="lg:col-span-3"
        titulo="Evolução da aplicação em Educação"
        descricao="Evolução dos recursos aplicados em educação nos últimos exercícios."
      >
        <SingleSeriesChart dados={evolucao?.aplicacao ?? null} />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-3"
        titulo="Evolução percentual da aplicação em Educação"
        descricao="Evolução, em percentuais, dos recursos aplicados em educação nos últimos exercícios."
      >
        <SingleSeriesChart
          dados={evolucao?.percentual ?? null}
          formato="percentual"
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução da aplicação em Educação por aluno"
        descricao="Comparativo entre a aplicação de recursos em educação por aluno nos últimos exercícios e a média em todos os municípios."
      >
        <MultiSeriesChart dados={porAluno} />
      </PanelWithDescription>

      <AvisoPagina>
        Para informações sobre escolas, matrículas e profissionais da educação,
        acesse as{" "}
        <a
          className="underline"
          href="https://paineldecontrole.tcees.tc.br/areasTematicas/educacao"
          target="_blank"
          rel="noopener noreferrer"
        >
          áreas temáticas do painel oficial
        </a>
        .
      </AvisoPagina>
    </div>
  );
}
