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
 * Gestão fiscal > Limites com saúde (site oficial: Saude, gestaoFiscalMunicipio-saude).
 * Controller: <Municipio|Estado>Controllers/Saude.
 */

const LIMITE_MINIMO_SAUDE = 15;
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

export default async function Saude({ esfera, anoExercicio }: EsferaProps) {
  const [sumario, evolucao, perCapita] = await Promise.all([
    getDadosApiEsfera<Sumario>(esfera, anoExercicio, "Saude/GetSumario"),
    getDadosApiEsfera<EvolucaoAnual>(
      esfera,
      anoExercicio,
      "Saude/GetGraficosEvolucaoAnualAplicacao"
    ),
    getDadosApiEsfera<MultiSerie>(
      esfera,
      anoExercicio,
      "Saude/GetGraficosEvolucaoAnualAplicacaoPerCapita"
    ),
  ]);

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-6">
      <CardAplicacao
        className="lg:col-span-2"
        titulo="Aplicação"
        descricao="Este é o valor aplicado em saúde, com recursos próprios (impostos e transferências), não considerados os recursos de convênios."
        valor={sumario?.aplicacao}
        ano={anoExercicio}
        media={sumario?.participacaoMunicipal}
        ranking={sumario?.rankingMunicipal}
      />
      <CardAplicacao
        className="lg:col-span-2"
        titulo="Aplicação per capita"
        descricao={
          <>
            Este é o valor aplicado em saúde, com recursos próprios (impostos e
            transferências), não considerados os recursos de convênios.
            <br />O valor da aplicação per capita (por pessoa) é calculado de
            acordo com o número de habitantes informado pelo IBGE.
          </>
        }
        valor={sumario?.aplicacaoPerCapita}
        ano={anoExercicio}
        media={sumario?.participacaoPerCapitaMunicipal}
        ranking={sumario?.rankingPerCapitaMunicipal}
      />
      <MedidorLimite
        className="lg:col-span-2"
        titulo="Limite constitucional"
        descricao="A Constituição Federal estabelece que o município deve aplicar o limite mínimo de 15% da soma dos recursos de impostos e transferências em ações e serviços públicos de saúde."
        valor={sumario?.aplicacaoPercentual}
        max={ESCALA_MEDIDOR}
        faixas={getFaixasLimiteMinimo(LIMITE_MINIMO_SAUDE, ESCALA_MEDIDOR)}
        situacao={getSituacaoLimiteMinimo(
          sumario?.aplicacaoPercentual,
          LIMITE_MINIMO_SAUDE
        )}
        texto={getTextoLimiteMinimo(
          sumario?.aplicacaoPercentual,
          LIMITE_MINIMO_SAUDE,
          anoExercicio,
          "da receita"
        )}
        nomeMedidor="Limite constitucional"
      />

      <PanelWithDescription
        className="lg:col-span-3"
        titulo="Evolução da aplicação em Saúde"
        descricao="Evolução dos recursos aplicados em saúde nos últimos exercícios."
      >
        <SingleSeriesChart dados={evolucao?.aplicacao ?? null} />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-3"
        titulo="Evolução percentual da aplicação em Saúde"
        descricao="Evolução, em percentuais, dos recursos aplicados em saúde nos últimos exercícios."
      >
        <SingleSeriesChart
          dados={evolucao?.percentual ?? null}
          formato="percentual"
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução da aplicação per capita em Saúde"
        descricao="Comparativo entre a aplicação de recursos em saúde per capita (por pessoa) nos últimos exercícios e a média em todos os municípios."
      >
        <MultiSeriesChart dados={perCapita} />
      </PanelWithDescription>

      <AvisoPagina>
        Para conhecer maiores informações sobre estabelecimentos, leitos,
        equipamentos, gastos e planos municipais de saúde, acesse as{" "}
        <a
          className="underline"
          href="https://paineldecontrole.tcees.tc.br/areasTematicas/saude/visaoGeral"
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
