import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { SerieItem } from "@/types/Serie";
import { getDadosEstado } from "../../_gestao/api";
import {
  Aviso,
  CartaoLimite,
  CartaoSerie,
  CartaoValor,
  Pagina,
  Secao,
} from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão fiscal > Endividamento (Endividamento$2) */

type Sumario = { valores: { valor: number | null; valorPercentual: number | null } };

type Bloco = {
  titulo: string;
  /** método "Anual..." do Sumario (valor do ano) */
  sumario: string;
  /** séries: [periódica (quadrimestres/bimestres), anual, percentual anual] */
  periodica: string;
  anual: string;
  percentual: string;
  nomePeriodo: "quadrimestral" | "bimestral";
  nomeIndicador: string;
  descricaoValor: string;
  descricaoLimite: string;
  limite: number;
  alerta?: number;
};

const BLOCOS: Bloco[] = [
  {
    titulo: "Dívida consolidada líquida",
    sumario: "GetDividaConsolidadaLiquidaAnual",
    periodica: "GetEvolucaoAnualDividaConsolidadaLiquida",
    anual: "GetEvolucaoDividaConsolidadaLiquida",
    percentual: "GetEvolucaoPercentualDividaConsolidadaLiquida",
    nomePeriodo: "quadrimestral",
    nomeIndicador: "Dívida Consolidada Líquida",
    descricaoValor:
      "O valor demonstra a dívida consolidada líquida do Estado, conforme definido no art. 1º, § 1 na Resolução nº 40/2001 do Senado Federal.",
    descricaoLimite:
      "De acordo com a LRF (Lei de Responsabilidade Fiscal) e Resolução 40/2001 (Senado Federal) a dívida consolidada líquida não pode ultrapassar 200% da RCL (Receita corrente líquida) do Estado.",
    limite: 200,
    alerta: 180,
  },
  {
    titulo: "Operações de crédito",
    sumario: "GetOperacoesCreditoAnual",
    periodica: "GetEvolucaoAnualOperacoesCredito",
    anual: "GetEvolucaoOperacoesCredito",
    percentual: "GetEvolucaoPercentualOperacoesCredito",
    nomePeriodo: "quadrimestral",
    nomeIndicador: "operações de crédito",
    descricaoValor:
      "O valor demonstra o montante de operações de crédito considerado para fins do limite definido pela Resolução 43/01 do Senado Federal.",
    descricaoLimite:
      "De acordo com a LRF (Lei de Responsabilidade Fiscal) e Resolução 43/2001 (Senado Federal) as operações de crédito não podem ultrapassar 16% da RCL (Receita Corrente Líquida) do Estado.",
    limite: 16,
    alerta: 14.4,
  },
  {
    titulo: "Garantias concedidas",
    sumario: "GetGarantiasConcedidasAnual",
    periodica: "GetEvolucaoGarantiasConcedidas",
    anual: "GetEvolucaoAnualGarantiasConcedidas",
    percentual: "GetEvolucaoPercentualGarantiasConcedidas",
    nomePeriodo: "quadrimestral",
    nomeIndicador: "garantias concedidas",
    descricaoValor: "O valor demonstra o montante das garantias concedidas pelo Estado.",
    descricaoLimite:
      "De acordo com a LRF (Lei de Responsabilidade Fiscal) e Resolução nº 43/01 (Senado Federal), as garantias concedidas não podem ultrapassar 22% da RCL (Receita Corrente Líquida) do Estado.",
    limite: 22,
    alerta: 19.8,
  },
];

const BLOCO_PPP: Bloco = {
  titulo: "Parcerias público-privadas",
  sumario: "GetParcelamentoPublicoPrivadasAnual",
  periodica: "GetEvolucaoParcelamentoPublicoPrivadas",
  anual: "GetEvolucaoAnualParcelamentoPublicoPrivadas",
  percentual: "GetEvolucaoPercentualParcelamentoPublicoPrivadas",
  nomePeriodo: "bimestral",
  nomeIndicador: "parcerias público privado",
  descricaoValor:
    "Demonstra o montante de despesas contratadas derivadas de Parcerias Público-Privadas, para acompanhamento do limite estabelecido no art. 28 da Lei nº 11.079/2004.",
  descricaoLimite:
    "As despesas contratadas de Parcerias Público Privadas não podem ultrapassar o limite de 5%  estabelecido pelo art. 28 de Lei nº 11.079/2004",
  limite: 5,
};

async function BlocoEndividamento({
  bloco,
  anoExercicio,
}: {
  bloco: Bloco;
  anoExercicio: number;
}) {
  const get = <T,>(metodo: string) =>
    getDadosEstado<T>(anoExercicio, `Endividamento/${metodo}`);
  const [sumario, periodica, anual, percentual] = await Promise.all([
    get<Sumario>(bloco.sumario),
    get<SerieItem[]>(bloco.periodica),
    get<SerieItem[]>(bloco.anual),
    get<SerieItem[]>(bloco.percentual),
  ]);

  return (
    <>
      <Secao>{bloco.titulo}</Secao>
      <CartaoValor
        titulo="Valor"
        descricao={bloco.descricaoValor}
        valor={sumario?.valores?.valor}
        ano={anoExercicio}
      />
      <CartaoLimite
        titulo="Limite da LRF"
        descricao={bloco.descricaoLimite}
        percentual={sumario?.valores?.valorPercentual}
        tipo="maximo"
        limite={bloco.limite}
        alerta={bloco.alerta}
        base="da RCL"
      />
      <CartaoSerie
        titulo={`Evolução ${bloco.nomePeriodo}`}
        descricao={`O gráfico demonstra o comportamento d${bloco.nomeIndicador.startsWith("Dívida") ? "a" : "as"} ${bloco.nomeIndicador} durante os ${bloco.nomePeriodo === "bimestral" ? "bimestres" : "quadrimestres"}.`}
        dados={periodica}
        tipo="bar"
        negativoVermelho
      />
      <CartaoSerie
        titulo="Evolução anual"
        descricao={`O gráfico demonstra o comportamento d${bloco.nomeIndicador.startsWith("Dívida") ? "a" : "as"} ${bloco.nomeIndicador} durante os cinco últimos anos.`}
        dados={anual}
        tipo="bar"
        negativoVermelho
      />
      <CartaoSerie
        largura={12}
        titulo="Evolução percentual anual"
        descricao={`O gráfico demonstra, em percentuais, o comportamento d${bloco.nomeIndicador.startsWith("Dívida") ? "a" : "as"} ${bloco.nomeIndicador} durante os cinco últimos anos.`}
        dados={percentual}
        formato="percentual"
      />
    </>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const anoExercicio = Number(ano);
  // Parcerias público-privadas só aparecem antes de 2020 (site oficial)
  const blocos = anoExercicio < 2020 ? [...BLOCOS, BLOCO_PPP] : BLOCOS;

  return (
    <Pagina>
      {anoExercicio === 2025 && (
        <Aviso>
          Em “Demais Haveres Financeiros” foi incluída a conta contábil
          121210700, referente a valores líquidos e certos a receber em
          decorrência dos danos causados pelo rompimento da Barragem Mina
          Córrego do Feijão, no montante de R$ 12.563.917.516,50, no exercício
          de 2025. A mencionada conta não consta no mapeamento da Secretaria do
          Tesouro Nacional (STN). Todavia, foi incluída com base em orientação
          da própria STN.
        </Aviso>
      )}
      {blocos.map((bloco) => (
        <BlocoEndividamento
          key={bloco.titulo}
          bloco={bloco}
          anoExercicio={anoExercicio}
        />
      ))}
    </Pagina>
  );
}
