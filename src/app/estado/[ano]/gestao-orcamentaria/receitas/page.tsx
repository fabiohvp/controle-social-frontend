import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { formatMoney } from "@/formatters/number";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { getDadosEstado } from "../../_gestao/api";
import {
  Aviso,
  CartaoBarras,
  CartaoDonut,
  CartaoMulti,
  CartaoSerie,
  CartaoValor,
  Pagina,
} from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão orçamentária > Receitas (Receitas$3) */

type Sumario = {
  valor: number;
  valorPerCapita: number;
  previsaoInicial: number;
  mediaMensal: number;
};

const CORES_RECEITA_X_DESPESA = [
  "#607d8b",
  "#607d8b",
  "#Efb4a3",
  "#Efb4a3",
  "#Efb4a3",
  "#Efb4a3",
];

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const anoExercicio = Number(ano);
  const get = <T,>(recurso: string) => getDadosEstado<T>(anoExercicio, recurso);

  const [
    sumario,
    composicao,
    receitaXDespesa,
    evolucaoAnual,
    arrecadacaoComparada,
    evolucaoMensal,
    previstaNoMes,
    previstaAteMes,
    previstaAnual,
    noMesXMedia,
  ] = await Promise.all([
    get<Sumario>("Receita/GetSumario"),
    get<{ name: string; value: number }[]>("Receita/GetValoresComposicaoDonut"),
    get<{ nome: string; valor: number }[]>(
      "ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativaBarrasHorizontais"
    ),
    get<MultiSerie>(
      "ReceitaDespesa/GetEvolucaoAnualReceitaArrecadadaXDespesaEmpenhadaXLiquidadaPorEsferaAdministrativa"
    ),
    get<SerieItem[]>("Receita/GetArrecadacaoComparadaAnoAnterior"),
    get<MultiSerie>("ReceitaDespesa/GetEvolucaoMensalReceitaDespesaMultiseries"),
    get<MultiSerie>("Receita/GetEvolucaoMensalReceitaArrecadadaXPrevisaoAtualizada"),
    get<MultiSerie>(
      "Receita/GetEvolucaoMensalReceitaArrecadadaXPrevisaoAtualizadaAcumulada"
    ),
    anoExercicio > 2016
      ? get<MultiSerie>(
          "Receita/GetPrevisaoAtualizadaAnualXArrecadadaAcumuladaUltimos2Anos"
        )
      : null,
    anoExercicio > 2016
      ? get<MultiSerie>(
          "Receita/GetArrecadadaNoMesXMediaArrecadadaAcumuladaUltimos2Anos"
        )
      : null,
  ]);

  return (
    <Pagina>
      <Aviso>
        Os dados exibidos neste painel têm como fonte as remessas enviadas e
        homologadas mensalmente pelos órgãos estaduais, por meio do sistema
        CidadES. Até que todos enviem, os dados apresentados no painel são
        parciais e podem sofrer alterações. Os dados são apurados pela receita
        líquida.
      </Aviso>
      <CartaoValor
        titulo="Receitas Arrecadadas"
        descricao="É o montante Total (impostos, taxas, contribuições, transferências da união e outras) arrecadado pelo Estado para custear as despesas públicas e as necessidades de investimentos públicos."
        valor={sumario?.valor}
        ano={anoExercicio}
        secundarios={
          sumario
            ? [
                { titulo: "Receita prevista", valor: `R$ ${formatMoney(sumario.previsaoInicial)}` },
                { titulo: "Receita média mensal", valor: `R$ ${formatMoney(sumario.mediaMensal)}` },
                { titulo: "Receita per capita", valor: `R$ ${formatMoney(sumario.valorPerCapita)}` },
              ]
            : undefined
        }
      />
      <CartaoDonut
        titulo="Composição da Receita Arrecadada"
        descricao="Este indicador demonstra o grau de dependência que o Estado tem de transferências da União e contratos de financiamento e empréstimos interno e externo, apontando se possui arrecadação sustentável ou não."
        dados={composicao}
        ano={anoExercicio}
      />
      <CartaoBarras
        titulo="Receitas X Despesas"
        descricao="Comparativo entre as receitas (prevista na LOA e realizada) e despesas (dotação inicial prevista na LOA, empenhada, liquidada e paga) do Estado."
        dados={receitaXDespesa}
        ano={anoExercicio}
        cores={CORES_RECEITA_X_DESPESA}
      />
      <CartaoMulti
        titulo="Evolução anual da Receita"
        descricao="Possibilita comparar o montante arrecadado no exercício (ano) em relação à arrecadação ocorrida no exercício anterior."
        dados={evolucaoAnual}
        tipos={["line", "line", "bar", "bar", "bar"]}
      />
      <CartaoSerie
        titulo="Arrecadação comparada ao ano anterior"
        descricao="Possibilita comparar o montante arrecadado no exercício (ano) em relação à arrecadação ocorrida no exercício anterior."
        dados={arrecadacaoComparada}
        tipo="bar"
      />
      <CartaoMulti
        largura={12}
        titulo="Evolução mensal da Receita x Despesa"
        descricao="Possibilita comparar os gastos realizados com o montante arrecadado no mês e identificar a ocorrência de déficit (despesa maior que receita) ou superávit (receita maior que a despesa)."
        dados={evolucaoMensal}
        tipos={["line", "bar", "bar", "bar"]}
        corrigirIpca={anoExercicio}
      />
      <CartaoMulti
        titulo="Receita prevista atualizada X arrecadada no mês"
        descricao="Comportamento da receita mensal arrecadada frente à previsão atualizada para o mês"
        dados={previstaNoMes}
        tipos={["line", "bar"]}
        corrigirIpca={anoExercicio}
      />
      <CartaoMulti
        titulo="Receita prevista atualizada X arrecadada até o mês"
        descricao="Comportamento da receita arrecadada até o mês frente à previsão atualizada até o mês."
        dados={previstaAteMes}
        tipos={["line", "bar"]}
        corrigirIpca={anoExercicio}
      />
      {anoExercicio > 2016 && (
        <>
          <CartaoMulti
            titulo="Receita prevista atualizada no ano X arrecada até o mês"
            descricao="Desempenho da receita arrecadada acumulada no ano frente à previsão (atualizada) da arrecadação para o ano."
            dados={previstaAnual}
          />
          <CartaoMulti
            titulo="Receita arrecadada no mês X Média da receita arrecadada até o mês"
            descricao="Desempenho da arrecadação do mês frente à média mensal da arrecadação acumulada no ano."
            dados={noMesXMedia}
          />
        </>
      )}
    </Pagina>
  );
}
