import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { getDadosEstado } from "../../_gestao/api";
import {
  Aviso,
  CartaoMulti,
  CartaoSerie,
  CartaoValor,
  Pagina,
} from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão fiscal > Resultado nominal (ResultadoNominal) */

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const anoExercicio = Number(ano);
  const get = <T,>(metodo: string) =>
    getDadosEstado<T>(anoExercicio, `MetasFiscais/${metodo}`);

  const [resultado, comparativo, evolucaoAnual, evolucaoMensal] =
    await Promise.all([
      get<{ valor: number }>("GetResultadoNominal"),
      get<SerieItem[]>("GetSumarioReceitaDespesaNominal"),
      get<MultiSerie>("GetEvolucaoAnualResultadoNominal"),
      get<SerieItem[]>("GetEvolucaoMensalResultadoNominal"),
    ]);

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
      <CartaoValor
        largura={3}
        titulo="Resultado nominal"
        descricao="Resultado nominal no mês atual."
        valor={resultado?.valor}
        ano={anoExercicio}
      />
      <CartaoSerie
        largura={9}
        titulo="Resultado nominal"
        descricao="O gráfico compara o Resultado Primário apresentado com a Meta Fiscal prevista na LDO."
        dados={comparativo}
        tipo="bar"
        negativoVermelho
      />
      <CartaoMulti
        largura={12}
        titulo="Evolução anual"
        cores={["#607D8B", "#CEDEE5"]}
        descricao="Evolução do Resultado nominal dos últimos 5 anos"
        dados={evolucaoAnual}
        tipos={["line", "line"]}
      />
      <CartaoSerie
        largura={12}
        titulo="Evolução mensal - Resultado nominal"
        cor="#3D4C57"
        descricao="O gráfico demonstra o comportamento do resultado primário durante o exercício."
        dados={evolucaoMensal}
        tipo="bar"
        negativoVermelho
      />
    </Pagina>
  );
}
