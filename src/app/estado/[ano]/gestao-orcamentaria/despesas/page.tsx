import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { formatMoney } from "@/formatters/number";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { getDadosEstado } from "../../_gestao/api";
import {
  CartaoBarras,
  CartaoDonut,
  CartaoMulti,
  CartaoSerie,
  CartaoValor,
  Pagina,
} from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão orçamentária > Despesas (Despesas$5) */

type Sumario = {
  valor: number;
  valorPerCapita: number;
  previsaoInicial: number;
  mediaMensal: number;
};

type DespesaEmpenhada = {
  ano: number;
  nome: string;
  valores?: { atual: number | null; anterior: number | null };
};

const CORES_RECEITA_X_DESPESA = [
  "#607d8b",
  "#607d8b",
  "#Efb4a3",
  "#Efb4a3",
  "#Efb4a3",
  "#Efb4a3",
];

/** Mesma montagem do site oficial: o 1º ponto é o ano anterior ao primeiro */
function getEmpenhadaComparada(dados: DespesaEmpenhada[] | null): SerieItem[] {
  return (dados ?? []).reduce<SerieItem[]>((acc, item, indice) => {
    if (indice === 0) {
      acc.push({
        ano: item.ano - 1,
        nome: String(item.ano - 1),
        valor: item.valores?.anterior ?? null,
      });
    }
    acc.push({ ano: item.ano, nome: item.nome, valor: item.valores?.atual ?? null });
    return acc;
  }, []);
}

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
    empenhada,
    evolucaoMensal,
    correntes,
    capital,
    funcaoAcumulada,
    funcaoNoMes,
    capitalPorGrupo,
  ] = await Promise.all([
    get<Sumario>("Despesa/GetSumarioLiquidada"),
    get<{ name: string; value: number }[]>("Despesa/GetMaioresDespesasLiquidadasPorFuncao"),
    get<{ nome: string; valor: number }[]>(
      "ReceitaDespesa/GetReceitaXDespesaPorEsferaAdministrativaBarrasHorizontais"
    ),
    get<MultiSerie>(
      "ReceitaDespesa/GetEvolucaoAnualReceitaArrecadadaXDespesaEmpenhadaXLiquidadaPorEsferaAdministrativa"
    ),
    get<DespesaEmpenhada[]>("Despesa/GetEvolucaoAnualDespesaEmpenhada"),
    get<MultiSerie>("ReceitaDespesa/GetEvolucaoMensalReceitaDespesaMultiseries"),
    get<SerieItem[]>("Despesa/GetEvolucaoMensalDespesasCorrente"),
    get<SerieItem[]>("Despesa/GetEvolucaoMensalDespesasCapital"),
    get<MultiSerie>("Despesa/GetMaioresDespesasPorFuncaoAnualAtualXAnterior"),
    get<MultiSerie>("Despesa/GetMaioresDespesasPorFuncaoMensalAtualXAnterior"),
    get<MultiSerie>("Despesa/GetEvolucaoMensalDespesasCapitalLiquidadaPorGrupo"),
  ]);

  return (
    <Pagina>
      <CartaoValor
        titulo="Despesa liquidada"
        descricao="É o montante total a ser gasto pelo Estado em serviços públicos (saúde, educação, segurança), obras, pessoal outros."
        valor={sumario?.valor}
        ano={anoExercicio}
        secundarios={
          sumario
            ? [
                { titulo: "Despesa anual prevista", valor: `R$ ${formatMoney(sumario.previsaoInicial)}` },
                { titulo: "Despesa média mensal", valor: `R$ ${formatMoney(sumario.mediaMensal)}` },
                { titulo: "Despesa per capita", valor: `R$ ${formatMoney(sumario.valorPerCapita)}` },
              ]
            : undefined
        }
      />
      <CartaoDonut
        titulo="Composição da Despesa Liquidada"
        descricao="Este indicador demonstra as maiores destinações (despesas liquidadas) dos gastos públicos."
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
        titulo="Evolução Despesas Empenhadas X Despesas Liquidadas X Despesas Pagas"
        descricao="Possibilita comparar o montante arrecadado com os gastos realizados no exercício e identificar a ocorrência de déficit (despesa maior que receita) ou superávit (receita maior que despesa)."
        dados={evolucaoAnual}
        tipos={["line", "line", "bar", "bar", "bar"]}
      />
      <CartaoSerie
        titulo="Despesa empenhada em relação ao ano anterior"
        descricao="Possibilita comparar o valor da despesa empenhada no exercício em relação à despesa empenhada ocorrida no exercício anterior."
        dados={getEmpenhadaComparada(empenhada)}
        tipo="bar"
      />
      <CartaoMulti
        largura={12}
        titulo="Evolução mensal Despesas X Receita"
        descricao="Possibilita comparar os gastos realizados com o montante arrecadado no mês e identificar a ocorrência de déficit (despesa maior que receita) ou superávit (receita maior que a despesa)."
        dados={evolucaoMensal}
        tipos={["line", "bar", "bar", "bar"]}
        corrigirIpca={anoExercicio}
      />
      <CartaoSerie
        titulo="Despesa Corrente"
        descricao="Evolução das despesas que não contribuem, diretamente, para a formação ou aquisição de um bem de capital, tais como remunerações de servidores, custeio dos órgãos públicos e pagamento de juros."
        dados={correntes}
      />
      <CartaoSerie
        titulo="Despesa de Capital"
        descricao="Evolução das despesas que contribuem, diretamente, para a formação ou aquisição de um bem de capital, tais como investimentos, aquisições de imóveis já em utilização e amortização de dívida."
        dados={capital}
      />
      <CartaoMulti
        largura={12}
        titulo="Maiores despesas liquidadas por função acumuladas até o mês"
        descricao="Comparativo, em relação ao ano anterior, das maiores despesas liquidadas acumuladas até o mês."
        dados={funcaoAcumulada}
        corrigirIpca={false}
      />
      <CartaoMulti
        largura={12}
        titulo="Despesas liquidadas por função em destaque no mês"
        descricao="Comparativo, em relação ao ano anterior, das despesas liquidadas no mês."
        dados={funcaoNoMes}
        corrigirIpca={false}
      />
      <CartaoMulti
        largura={12}
        titulo="Despesa de Capital Liquidada por grupo"
        descricao="Comportamento da despesa por grupos no exercício."
        dados={capitalPorGrupo}
        corrigirIpca={anoExercicio}
      />
    </Pagina>
  );
}
