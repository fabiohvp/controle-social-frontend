import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { formatFloat } from "@/formatters/number";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { getDadosEstado, getDadosMunicipioNoEstado } from "../../_gestao/api";
import {
  CartaoDonut,
  CartaoLimite,
  CartaoMulti,
  CartaoSerie,
  CartaoValores,
  Pagina,
} from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão fiscal > Educação - FUNDEB (EducacaoFundeb) */

type DadosFundeb = {
  receitaArrecadadaFUNDEB: number;
  aplicacaoDestinadaFUNDEB: number;
  aplicacaoMagisterio: number;
  aplicacaoPercentualMagisterio: number | null;
};
type Composicao = { name: string; value: number }[];

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const anoExercicio = Number(ano);
  const get = <T,>(metodo: string) =>
    getDadosEstado<T>(anoExercicio, `Educacao/${metodo}`);

  const [dados, destinada, arrecadada, evolucaoAnual, magisterio] =
    await Promise.all([
      get<DadosFundeb>("GetDadosFundebEstado"),
      getDadosMunicipioNoEstado<Composicao>(
        anoExercicio,
        "Receita/GetComposicaoReceitaDestinadaFundeb"
      ),
      getDadosMunicipioNoEstado<Composicao>(
        anoExercicio,
        "Receita/GetComposicaoReceitaArrecadadaFundeb"
      ),
      get<MultiSerie>("GetGraficosEvolucaoAnualFundeb"),
      get<SerieItem[]>("GetGraficosEvolucaoAnualAplicacaoMagisterio"),
    ]);

  const destinado = dados?.aplicacaoDestinadaFUNDEB;
  const recebido = dados?.receitaArrecadadaFUNDEB;
  const diferenca =
    destinado && recebido !== undefined
      ? ((recebido - destinado) / destinado) * 100
      : null;
  // a partir de 2021 o mínimo para profissionais da educação básica passou de 60% para 70%
  const minimo = anoExercicio < 2021 ? 60 : 70;

  return (
    <Pagina>
      <CartaoValores
        titulo="FUNDEB - Destinado x Recebido"
        itens={[
          { rotulo: "Destinado", valor: destinado },
          { rotulo: "Recebido", valor: recebido },
        ]}
        ano={anoExercicio}
        rodape={
          diferenca !== null &&
          `Recebeu ${formatFloat(Math.abs(diferenca))}% ${diferenca >= 0 ? "a mais" : "a menos"}`
        }
      />
      <CartaoDonut
        titulo="Recursos destinados ao FUNDEB"
        dados={destinada}
        ano={anoExercicio}
      />
      <CartaoDonut
        titulo="Recursos recebidos do FUNDEB"
        dados={arrecadada}
        ano={anoExercicio}
      />
      <CartaoMulti
        largura={8}
        titulo="FUNDEB - Evolução anual do Estado"
        descricao="Este é o valor aplicado em manutenção e desenvolvimento do ensino, exceto o gasto com remuneração de professores."
        dados={evolucaoAnual}
        tipos={["bar", "bar"]}
      />
      <CartaoLimite
        titulo="Fundeb - Profissionais Educação Básica"
        descricao="Até 2020 a Constituição Federal estabelecia que pelo menos 60% do Fundeb devem ser destinados ao pagamento de profissionais da educação básica que estão em atividade dentro da escola, tais como professores, coordenadores e diretores. A partir de 2021, o percentual passou a ser de 70%."
        percentual={dados?.aplicacaoPercentualMagisterio}
        tipo="minimo"
        limite={minimo}
        base="do FUNDEB"
      />
      <CartaoSerie
        largura={12}
        titulo="Evolução anual da aplicação profissionais da educação básica"
        descricao="Evolução do percentual de aplicação dos recursos recebidos do FUNDEB, em pagamento de profissionais da educação básica que estão em atividade dentro da escola, tais como professores, coordenadores e diretores."
        dados={magisterio}
        formato="percentual"
      />
    </Pagina>
  );
}
