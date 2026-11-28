import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { SerieItem } from "@/types/Serie";
import { getDadosEstado } from "../../_gestao/api";
import {
  Aviso,
  CartaoLimite,
  CartaoSerie,
  CartaoValor,
  Pagina,
  textoInteiro,
  textoMoeda,
} from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão fiscal > Limites com educação (Educacao$4) */

type Sumario = { aplicacao: number; aplicacaoPercentual: number | null };
type Grafico = { aplicacao: SerieItem[]; percentual: SerieItem[] };

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const anoExercicio = Number(ano);
  const get = <T,>(metodo: string) =>
    getDadosEstado<T>(anoExercicio, `Educacao/${metodo}`);

  const [sumario, alunos, mensal, anual] = await Promise.all([
    get<Sumario>("GetSumario"),
    get<{ alunos: number }>("GetQuantidadeAlunos"),
    get<Grafico>("GetGraficosEvolucaoMensalEducacao"),
    get<Grafico>("GetGraficosEvolucaoAnualAplicacao"),
  ]);

  return (
    <Pagina>
      <CartaoValor
        largura={6}
        titulo="Aplicação"
        descricao="Este é o valor aplicado em manutenção e desenvolvimento do ensino. Considerado o artigo 21, parágrafo 4º, da Resolução TC 238 de 15/05/2012."
        valor={sumario?.aplicacao}
        ano={anoExercicio}
        secundarios={
          sumario && alunos?.alunos
            ? [
                { titulo: "Aplicação por aluno", valor: textoMoeda(sumario.aplicacao / alunos.alunos) },
                { titulo: "Quantidade de alunos", valor: textoInteiro(alunos.alunos) },
              ]
            : undefined
        }
      />
      <CartaoLimite
        largura={6}
        titulo="Limite constitucional"
        descricao="A Constituição Federal estabelece que o estado deve aplicar o limite mínimo de 25% da receita resultante de impostos, incluídas as transferências constitucionais, para a manutenção e desenvolvimento do ensino."
        percentual={sumario?.aplicacaoPercentual}
        tipo="minimo"
        limite={25}
        base="da receita"
      />
      <CartaoSerie
        titulo="Evolução mensal da aplicação em Educação"
        descricao="Evolução dos recursos aplicados em educação nos últimos 12 meses."
        dados={mensal?.aplicacao}
      />
      <CartaoSerie
        titulo="Evolução percentual mensal da aplicação em Educação"
        descricao="Evolução, em percentuais, dos recursos aplicados em educação nos últimos 12 meses."
        dados={mensal?.percentual}
        formato="percentual"
      />
      <CartaoSerie
        titulo="Evolução da aplicação em Educação"
        descricao="Evolução dos recursos aplicados em educação nos últimos exercícios."
        dados={anual?.aplicacao}
      />
      <CartaoSerie
        titulo="Evolução percentual da aplicação em Educação"
        descricao="Evolução, em percentuais, dos recursos aplicados em educação nos últimos exercícios."
        dados={anual?.percentual}
        formato="percentual"
      />
      <Aviso>
        Para informações sobre escolas, matrículas e profissionais da educação
        acesse as áreas temáticas do painel.
      </Aviso>
    </Pagina>
  );
}
