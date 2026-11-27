import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import SectionTitle from "@/components/panel/SectionTitle";
import { formatFloat } from "@/formatters/number";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { SerieItem } from "@/types/Serie";
import CardAplicacao from "../_comum/CardAplicacao";
import MedidorLimite, { COR_MEDIDOR, SituacaoMedidor } from "../_comum/MedidorLimite";

/*
 * Gestão fiscal > Limites com pessoal (site oficial: Pessoal,
 * gestaoFiscal-pessoal). Controllers: PessoalConsolidado, PessoalExecutivo e
 * PessoalLegislativo. Limites do município (art. 19 e 20 da LRF); o Estado tem
 * outros poderes e limites e fica com a própria página.
 */

type Poder = {
  controller: "PessoalConsolidado" | "PessoalExecutivo" | "PessoalLegislativo";
  titulo: string;
  nomePoder: string;
  descricaoDespesa: string;
  descricaoPerCapita: string;
  /** % da RCL: parecer de alerta, limite prudencial e limite máximo */
  alerta: number;
  prudencial: number;
  maximo: number;
  descricaoLimite: string;
};

const TEXTO_ESCALA =
  "O limite inferior do gráfico é dinâmico. Em regra inicia em 50% do limite máximo. Porém, caso o percentual obtido seja menor, então o gráfico iniciará em 70% desse percentual.";

const PODERES: Poder[] = [
  {
    controller: "PessoalConsolidado",
    titulo: "Consolidado",
    nomePoder: "do município",
    descricaoDespesa:
      "Total gasto pelo Município (Poder Executivo + Poder Legislativo) com remuneração de pessoal e encargos sobre a folha de pagamento.",
    descricaoPerCapita:
      "Total gasto pelo município com remuneração de pessoal e encargos (Poder Executivo + Poder Legislativo).",
    alerta: 54,
    prudencial: 57,
    maximo: 60,
    descricaoLimite:
      "De acordo com a LRF (Lei de Responsabilidade Fiscal) as despesas com pessoal nos municípios não podem ultrapassar 60% da RCL (Receita Corrente Líquida) do Município. Caso esses gastos atinjam 57% da RCL o município entra no limite prudencial. Caso esses gastos atinjam 54% da RCL o Tribunal de Contas emitirá parecer de alerta.",
  },
  {
    controller: "PessoalExecutivo",
    titulo: "Poder Executivo",
    nomePoder: "do Poder Executivo",
    descricaoDespesa:
      "Total gasto pelo Poder Executivo com remuneração de pessoal e encargos sobre a folha de pagamento.",
    descricaoPerCapita:
      "Gasto do Poder Executivo com remuneração de pessoal e encargos.",
    alerta: 48.6,
    prudencial: 51.3,
    maximo: 54,
    descricaoLimite:
      "De acordo com a LRF (Lei de Responsabilidade Fiscal) as despesas com pessoal no Poder Executivo não podem ultrapassar 54% da RCL (Receita Corrente Líquida) do Município. Caso esses gastos atinjam 51,3% da RCL o município entra no limite prudencial. Caso esses gastos atinjam 48,6% da RCL o Tribunal de Contas emitirá parecer de alerta.",
  },
  {
    controller: "PessoalLegislativo",
    titulo: "Poder Legislativo",
    nomePoder: "do Poder Legislativo",
    descricaoDespesa:
      "Total gasto pelo Poder Legislativo com remuneração de pessoal e encargos sobre a folha de pagamento.",
    descricaoPerCapita:
      "Gasto do Poder Legislativo com remuneração de pessoal e encargos.",
    alerta: 5.4,
    prudencial: 5.7,
    maximo: 6,
    descricaoLimite:
      "De acordo com a LRF (Lei de Responsabilidade Fiscal) as despesas com pessoal do Poder Legislativo não podem ultrapassar 6% da RCL (Receita Corrente Líquida) do Município. Caso esses gastos atinjam 5,4% da RCL o Tribunal de Contas emitirá parecer de alerta. Caso esses gastos atinjam 5,7% da RCL o município entra no limite prudencial.",
  },
];

type Sumario = {
  valor: number;
  valorPercentual: number;
  valorPerCapita: number;
  participacaoMunicipal: number;
  participacaoPerCapitaMunicipal: number;
  rankingMunicipal: number;
  rankingPerCapitaMunicipal: number;
};

type EvolucaoAnual = { despesa: SerieItem[]; percentual: SerieItem[] };

function getSituacao(valor: number | undefined, poder: Poder): SituacaoMedidor {
  if (valor === undefined || valor === null) return "ok";
  if (valor > poder.maximo) return "ruim";
  if (valor >= poder.prudencial) return "alerta";
  return "ok";
}

function getTextoSituacao(valor: number | undefined, poder: Poder) {
  if (valor === undefined || valor === null) return undefined;
  if (valor > poder.maximo)
    return `Despesa ${poder.nomePoder} ultrapassou o limite máximo de ${formatFloat(poder.maximo)}% da RCL`;
  if (valor >= poder.prudencial)
    return `Despesa ${poder.nomePoder} atingiu o limite prudencial de ${formatFloat(poder.prudencial)}% da RCL`;
  if (valor >= poder.alerta)
    return `Despesa ${poder.nomePoder} atingiu o limite de alerta de ${formatFloat(poder.alerta)}% da RCL`;
  return `Despesa ${poder.nomePoder} abaixo do limite de alerta de ${formatFloat(poder.alerta)}% da RCL`;
}

async function BlocoPoder({
  esfera,
  anoExercicio,
  poder,
}: EsferaProps & { poder: Poder }) {
  const [sumario, evolucao] = await Promise.all([
    getDadosApiEsfera<Sumario>(esfera, anoExercicio, `${poder.controller}/GetSumario`),
    getDadosApiEsfera<EvolucaoAnual>(
      esfera,
      anoExercicio,
      `${poder.controller}/GetGraficosEvolucaoAnualPessoal`
    ),
  ]);

  const escala = Math.round(poder.maximo * 1.1 * 100) / 100;
  const legenda = `Alerta ${formatFloat(poder.alerta)}% · Prudencial ${formatFloat(poder.prudencial)}% · Máximo ${formatFloat(poder.maximo)}% da RCL`;

  return (
    <section className="grid grid-cols-1 gap-2 lg:grid-cols-6">
      <SectionTitle>{poder.titulo}</SectionTitle>
      <CardAplicacao
        className="lg:col-span-2"
        titulo="Despesa com pessoal"
        descricao={poder.descricaoDespesa}
        valor={sumario?.valor}
        ano={anoExercicio}
        media={sumario?.participacaoMunicipal}
      />
      <CardAplicacao
        className="lg:col-span-2"
        titulo="Despesa per capita"
        descricao={
          <>
            {poder.descricaoPerCapita}
            <br />O valor da aplicação per capita (por pessoa) é calculado de
            acordo com o número de habitantes informado pelo IBGE.
          </>
        }
        valor={sumario?.valorPerCapita}
        ano={anoExercicio}
        media={sumario?.participacaoPerCapitaMunicipal}
        ranking={sumario?.rankingPerCapitaMunicipal}
      />
      <MedidorLimite
        className="lg:col-span-2"
        titulo="Limite da LRF"
        descricao={
          <>
            {poder.descricaoLimite}
            <br />
            <br />
            {TEXTO_ESCALA}
          </>
        }
        valor={sumario?.valorPercentual}
        max={escala}
        faixas={[
          { ate: poder.alerta, cor: COR_MEDIDOR.ok, rotulo: `${poder.alerta}%` },
          {
            ate: poder.prudencial,
            cor: COR_MEDIDOR.atencao,
            rotulo: `${poder.prudencial}%`,
          },
          {
            ate: poder.maximo,
            cor: COR_MEDIDOR.alerta,
            rotulo: `${poder.maximo}%`,
          },
          { ate: escala, cor: COR_MEDIDOR.ruim },
        ]}
        situacao={getSituacao(sumario?.valorPercentual, poder)}
        texto={getTextoSituacao(sumario?.valorPercentual, poder)}
        legenda={legenda}
        nomeMedidor="Limite da LRF"
      />
      <PanelWithDescription
        className="lg:col-span-3"
        titulo="Evolução anual da despesa"
        descricao={`Evolução das despesas com pessoal e encargos ${poder.nomePoder} nos últimos exercícios.`}
      >
        <SingleSeriesChart dados={evolucao?.despesa ?? null} />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-3"
        titulo="Evolução percentual anual da despesa"
        descricao={`Evolução, em percentual, das despesas com pessoal e encargos ${poder.nomePoder} nos últimos exercícios.`}
      >
        <SingleSeriesChart
          dados={evolucao?.percentual ?? null}
          formato="percentual"
        />
      </PanelWithDescription>
    </section>
  );
}

export default function Pessoal({ esfera, anoExercicio }: EsferaProps) {
  return (
    <div className="flex flex-col gap-4">
      {PODERES.map((poder) => (
        <BlocoPoder
          key={poder.controller}
          esfera={esfera}
          anoExercicio={anoExercicio}
          poder={poder}
        />
      ))}
    </div>
  );
}
