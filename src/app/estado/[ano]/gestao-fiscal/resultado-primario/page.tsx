import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { getDadosEstado } from "../../_gestao/api";
import {
  CartaoMeta,
  CartaoMulti,
  CartaoSerie,
  Pagina,
} from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão fiscal > Resultado primário (ResultadoPrimario) */

type Meta = { previsao: number; realizado: number };
type SumarioMetas = {
  receitaArrecadada: Meta;
  receitaPrimariaArrecadada: Meta;
  despesaPrimariaTotal: Meta;
  despesaPrimaria: Meta;
};

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const anoExercicio = Number(ano);
  const get = <T,>(metodo: string) =>
    getDadosEstado<T>(anoExercicio, `MetasFiscais/${metodo}`);

  const [
    metas,
    receitaDespesaPrimaria,
    resultadoPrimario,
    mensalReceitaDespesa,
    mensalResultado,
    anualResultado,
  ] = await Promise.all([
    get<SumarioMetas>("GetSumarioMetasFiscais"),
    get<SerieItem[]>("GetSumarioReceitaDespesaPrimaria"),
    get<SerieItem[]>("GetSumarioResultadoPrimario"),
    get<MultiSerie>("GetEvolucaoMensalReceitaDespesaPrimaria"),
    get<SerieItem[]>("GetEvolucaoMensalResultadoPrimario"),
    get<MultiSerie>("GetEvolucaoAnualResultadoPrimario"),
  ]);

  // Até 2019 o site oficial também mostra receita total e despesa total
  const exibirTotais = anoExercicio < 2020;

  return (
    <Pagina>
      {exibirTotais && (
        <CartaoMeta
          titulo="Receita Total"
          descricao="O percentual demonstra o montante de receitas realizadas em relação a meta fiscal prevista na LDO."
          previsao={metas?.receitaArrecadada?.previsao}
          realizado={metas?.receitaArrecadada?.realizado}
          rotuloRealizado="Receita arrecadada"
        />
      )}
      <CartaoMeta
        titulo="Receita Primária"
        descricao="O percentual demonstra o montante de receitas primárias realizadas em relação a meta fiscal prevista na LDO."
        previsao={metas?.receitaPrimariaArrecadada?.previsao}
        realizado={metas?.receitaPrimariaArrecadada?.realizado}
        rotuloRealizado="Receita primária arrecadada"
      />
      {exibirTotais && (
        <CartaoMeta
          titulo="Despesa Total"
          descricao="O percentual demonstra o montante de despesas executadas em relação a meta fiscal prevista na LDO."
          previsao={metas?.despesaPrimariaTotal?.previsao}
          realizado={metas?.despesaPrimariaTotal?.realizado}
          rotuloRealizado="Despesa executada"
        />
      )}
      <CartaoMeta
        titulo="Despesa Primária"
        descricao="O percentual demonstra o montante de despesas primárias executadas em relação a meta fiscal prevista na LDO."
        previsao={metas?.despesaPrimaria?.previsao}
        realizado={metas?.despesaPrimaria?.realizado}
        rotuloRealizado="Despesa primária executada"
      />
      <CartaoSerie
        titulo="Receita e Despesa Primária"
        cor="#3D4C57"
        descricao="O gráfico compara as receitas primárias realizadas e as despesas primarias executadas."
        dados={receitaDespesaPrimaria}
        tipo="bar"
        negativoVermelho
      />
      <CartaoSerie
        titulo="Resultado Primário"
        cor="#3D4C57"
        descricao="O gráfico compara o Resultado Primário apresentado com a Meta Fiscal prevista na LDO."
        dados={resultadoPrimario}
        tipo="bar"
        negativoVermelho
      />
      <CartaoMulti
        largura={12}
        titulo="Evolução mensal - Receita e Despesa Primária"
        cores={["#607D8B", "#3D4C57"]}
        descricao="O gráfico demonstra o comportamento das receitas e despesas primárias durante o exercício."
        dados={mensalReceitaDespesa}
        tipos={["line", "bar"]}
        corrigirIpca={anoExercicio}
      />
      <CartaoSerie
        largura={12}
        titulo="Evolução mensal - Resultado Primário"
        cor="#3D4C57"
        descricao="O gráfico demonstra o comportamento do resultado primário durante o exercício."
        dados={mensalResultado}
        tipo="bar"
        negativoVermelho
      />
      <CartaoMulti
        largura={12}
        titulo="Evolução anual - Resultado Primário"
        cores={["#3D4C57", "#CEDEE5"]}
        descricao="O gráfico demonstra o comportamento do resultado primário anual em relação aos anos anteriores"
        dados={anualResultado}
        tipos={["line", "line"]}
      />
    </Pagina>
  );
}
