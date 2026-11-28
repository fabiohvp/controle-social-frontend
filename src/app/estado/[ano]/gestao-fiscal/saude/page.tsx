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

/* Site oficial: Estado > Gestão fiscal > Limites com saúde (Saude$3) */

type Sumario = {
  aplicacao: number;
  aplicacaoPercentual: number | null;
  aplicacaoPerCapita: number;
  populacao: number;
};
type Grafico = { aplicacao: SerieItem[]; percentual: SerieItem[] };

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const anoExercicio = Number(ano);
  const get = <T,>(metodo: string) =>
    getDadosEstado<T>(anoExercicio, `Saude/${metodo}`);

  const [sumario, mensal, anual] = await Promise.all([
    get<Sumario>("GetSumario"),
    get<Grafico>("GetGraficosEvolucaoMensalSaude"),
    get<Grafico>("GetGraficosEvolucaoAnualAplicacao"),
  ]);

  return (
    <Pagina>
      <CartaoValor
        largura={6}
        titulo="Aplicação"
        descricao="Este é o valor aplicado em saúde, com recursos próprios ( impostos e transferências)."
        valor={sumario?.aplicacao}
        ano={anoExercicio}
        secundarios={
          sumario
            ? [
                { titulo: "Aplicação per capita", valor: textoMoeda(sumario.aplicacaoPerCapita) },
                { titulo: "População", valor: textoInteiro(sumario.populacao) },
              ]
            : undefined
        }
      />
      <CartaoLimite
        largura={6}
        titulo="Limite constitucional"
        descricao="A Constituição Federal estabelece que o estado deve aplicar o limite mínimo de 12% da soma dos recursos de impostos e transferências constitucionais em ações e serviços públicos de saúde."
        percentual={sumario?.aplicacaoPercentual}
        tipo="minimo"
        limite={12}
        base="da receita"
      />
      <CartaoSerie
        titulo="Evolução mensal da aplicação em Saúde"
        descricao="Evolução dos recursos aplicados em saúde nos últimos 12 meses."
        dados={mensal?.aplicacao}
      />
      <CartaoSerie
        titulo="Evolução percentual mensal da aplicação em Saúde"
        descricao="Evolução, em percentuais, dos recursos aplicados em saúde nos últimos 12 meses."
        dados={mensal?.percentual}
        formato="percentual"
      />
      <CartaoSerie
        titulo="Evolução do limite constitucional mínimo aplicado em Saúde"
        descricao="Evolução dos recursos aplicados em saúde nos últimos exercícios."
        dados={anual?.aplicacao}
      />
      <CartaoSerie
        titulo="Evolução percentual do limite constitucional mínimo aplicado em Saúde"
        descricao="Evolução, em percentuais, dos recursos aplicados em saúde nos últimos exercícios."
        dados={anual?.percentual}
        formato="percentual"
      />
      <Aviso>
        Para conhecer maiores informações sobre estabelecimentos, leitos,
        equipamentos, gastos e planos municipais de saúde acesse as áreas
        temáticas do painel.
      </Aviso>
    </Pagina>
  );
}
