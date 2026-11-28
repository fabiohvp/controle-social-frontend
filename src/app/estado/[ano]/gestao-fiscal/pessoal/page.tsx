import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { SerieItem } from "@/types/Serie";
import { TIPO_MODULO_PESSOAL, getDadosEstado } from "../../_gestao/api";
import {
  CartaoLimite,
  CartaoSerie,
  CartaoValor,
  Pagina,
  Secao,
  textoInteiro,
  textoMoeda,
} from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão fiscal > Limites com pessoal (Pessoal$3) */

type Sumario = {
  valor: number;
  valorPercentual: number | null;
  valorPerCapita: number;
  populacao: number;
};
type Grafico = { despesa: SerieItem[]; percentual: SerieItem[] };

type Poder = {
  titulo: string;
  controller: string;
  tipoModulo: number;
  descricaoValor: string;
  /** limite máximo da LRF em % da RCL ajustada; sem limite = sem cartão de limite */
  limite?: number;
  descricaoLimite?: string;
  consolidado?: boolean;
};

const ORIENTACAO_GRAFICO =
  "O limite inferior do gráfico é dinâmico. Em regra inicia em 40% do limite máximo. Porém, caso o percentual obtido seja menor, então o gráfico iniciará em 70% desse percentual.";

const getDescricaoLimite = (
  alvo: string,
  limite: string,
  artigo: string,
  prudencial: string,
  alerta: string,
  quem: string
) =>
  `De acordo com a LRF as despesas com pessoal ${alvo} não podem ultrapassar ${limite} da Receita Corrente Líquida Ajustada (incisos II do art. ${artigo} da LRF). Caso esses gastos atinjam ${prudencial} da Receita Corrente Líquida Ajustada ${quem} entra no Limite Prudencial (parágrafo único do art.22 da LRF). Caso esses gastos atinjam ${alerta} da Receita Corrente Líquida Ajustada o Tribunal de Contas emitirá parecer de alerta (inciso II do § 1º do art. 59 da LRF). ${ORIENTACAO_GRAFICO}`;

const PODERES: Poder[] = [
  {
    titulo: "Consolidado",
    controller: "PessoalConsolidado",
    tipoModulo: TIPO_MODULO_PESSOAL.consolidado,
    consolidado: true,
    descricaoValor:
      "Despesa total com pessoal dos Poderes Estaduais Executivo, Judiciário e Legislativo, incluindo o Tribunal de Contas e o Ministério Público Estadual, apurada somando-se a realizada no mês em referência com as dos onze imediatamente anteriores.",
    limite: 60,
    descricaoLimite: getDescricaoLimite("no Estado", "60%", "19", "57%", "54%", "o Estado"),
  },
  {
    titulo: "Poder Executivo",
    controller: "PessoalExecutivo",
    tipoModulo: TIPO_MODULO_PESSOAL.executivo,
    descricaoValor:
      "Despesa total com pessoal do Poder Executivo Estadual, incluído Defensoria Pública Estadual, (órgão autônomo para o qual não foi ainda estabelecido em lei limite de despesa com pessoal) apurada somando-se a realizada no mês em referência com as dos onze imediatamente anteriores.",
    limite: 49,
    descricaoLimite: getDescricaoLimite("do Poder Executivo", "49%", "20", "46,55%", "44,10%", "o Poder Executivo"),
  },
  {
    titulo: "Poder Judiciário",
    controller: "PessoalJudiciario",
    tipoModulo: TIPO_MODULO_PESSOAL.judiciario,
    descricaoValor:
      "Despesa total com pessoal do Poder Judiciário Estadual, apurada somando-se a realizada no mês em referência com as dos onze imediatamente anteriores.",
    limite: 6,
    descricaoLimite: getDescricaoLimite("do Poder Judiciário", "6%", "20", "5,70%", "5,40%", "o Poder Judiciário"),
  },
  {
    titulo: "Assembleia Legislativa",
    controller: "PessoalLegislativo",
    tipoModulo: TIPO_MODULO_PESSOAL.legislativo,
    descricaoValor:
      "Despesa total com pessoal da Assembleia Legislativa Estadual, apurada somando-se a realizada no mês em referência com as dos onze imediatamente anteriores.",
    limite: 1.7,
    descricaoLimite: getDescricaoLimite("da Assembleia Legislativa", "1,70%", "20", "1,615%", "1,53%", "a Assembleia Legislativa"),
  },
  {
    titulo: "Ministério Público",
    controller: "PessoalMinisterioPublico",
    tipoModulo: TIPO_MODULO_PESSOAL.ministerioPublico,
    descricaoValor:
      "Despesa total com pessoal do Ministério Público Estadual, apurada somando-se a realizada no mês em referência com as dos onze imediatamente anteriores.",
    limite: 2,
    descricaoLimite: getDescricaoLimite("do Ministério Público", "2%", "20", "1,90%", "1,80%", "o Ministério Público"),
  },
  {
    titulo: "Tribunal de Contas",
    controller: "PessoalTribunalDeContas",
    tipoModulo: TIPO_MODULO_PESSOAL.tribunalContas,
    descricaoValor:
      "Despesa total com pessoal do Tribunal de Contas do Estado, apurada somando-se a realizada no mês em referência com as dos onze imediatamente anteriores.",
    limite: 1.3,
    descricaoLimite: getDescricaoLimite("do Tribunal de Contas", "1,30%", "20", "1,235%", "1,17%", "o Tribunal de Contas"),
  },
  {
    titulo: "Defensoria Pública",
    controller: "PessoalDefensoriaPublica",
    tipoModulo: TIPO_MODULO_PESSOAL.defensoriaPublica,
    descricaoValor: "Despesa total com pessoal da Defensoria Pública Estadual.",
  },
];

const DESCRICAO_MENSAL =
  "Evolução das despesas com pessoal para verificação do limite, nos termos da LRF.";
const DESCRICAO_MENSAL_PERCENTUAL =
  "Evolução, em percentuais, das despesas com pessoal para verificação do limite, nos termos da LRF.";
const DESCRICAO_ANUAL = "Evolução anual das despesas com pessoal desde 2016.";
const DESCRICAO_ANUAL_PERCENTUAL =
  "Evolução anual, em percentuais, das despesas com pessoal desde 2016.";

async function SecaoPoder({
  poder,
  anoExercicio,
}: {
  poder: Poder;
  anoExercicio: number;
}) {
  const get = <T,>(metodo: string, parametros?: Record<string, number>) =>
    getDadosEstado<T>(anoExercicio, `${poder.controller}/${metodo}`, parametros);
  const [sumario, mensal, anual] = await Promise.all([
    get<Sumario>("GetSumario"),
    get<Grafico>("GetGraficosEvolucaoMensalPessoal", { tipoModulo: poder.tipoModulo }),
    get<Grafico>("GetGraficosEvolucaoAnualPessoal"),
  ]);

  return (
    <>
      <Secao>{poder.titulo}</Secao>
      <CartaoValor
        titulo="Despesa com pessoal"
        descricao={poder.descricaoValor}
        valor={sumario?.valor}
        ano={anoExercicio}
        secundarios={
          poder.consolidado && sumario
            ? [
                { titulo: "Aplicação per capita", valor: textoMoeda(sumario.valorPerCapita) },
                { titulo: "População", valor: textoInteiro(sumario.populacao) },
              ]
            : undefined
        }
      />
      {poder.limite !== undefined && (
        <CartaoLimite
          titulo="Limite da LRF"
          descricao={poder.descricaoLimite}
          percentual={sumario?.valorPercentual}
          tipo="maximo"
          limite={poder.limite}
          alerta={poder.limite * 0.9}
          prudencial={poder.limite * 0.95}
          base="da RCL"
        />
      )}
      <CartaoSerie
        titulo="Evolução mensal da despesa"
        descricao={DESCRICAO_MENSAL}
        dados={mensal?.despesa}
      />
      <CartaoSerie
        titulo="Evolução percentual mensal da despesa"
        descricao={DESCRICAO_MENSAL_PERCENTUAL}
        dados={mensal?.percentual}
        formato="percentual"
      />
      <CartaoSerie
        titulo="Evolução anual da despesa"
        descricao={DESCRICAO_ANUAL}
        dados={anual?.despesa}
      />
      <CartaoSerie
        titulo="Evolução percentual anual da despesa"
        descricao={DESCRICAO_ANUAL_PERCENTUAL}
        dados={anual?.percentual}
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

  return (
    <Pagina>
      {PODERES.map((poder) => (
        <SecaoPoder key={poder.titulo} poder={poder} anoExercicio={anoExercicio} />
      ))}
    </Pagina>
  );
}
