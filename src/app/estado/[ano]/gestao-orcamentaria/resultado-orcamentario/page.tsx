import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { SerieItem } from "@/types/Serie";
import { getDadosEstado } from "../../_gestao/api";
import { CartaoSerie, Pagina } from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão orçamentária > Resultado orçamentário (ResultadoOrcamentario$2) */

type ComparacaoAnual = {
  receitaRealizada: SerieItem[];
  despesaExecutada: SerieItem[];
  resultadoOrcamentario: SerieItem[];
};

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const dados = await getDadosEstado<ComparacaoAnual>(
    Number(ano),
    "ReceitaDespesa/GetResultadoOrcamentarioComparacaoAnual"
  );

  return (
    <Pagina>
      <CartaoSerie
        largura={4}
        titulo="Receita realizada acumulada"
        descricao="Comparativo de receitas arrecadadas, acumuladas no período, ano atual versus ano anterior."
        dados={dados?.receitaRealizada}
        tipo="bar"
      />
      <CartaoSerie
        largura={4}
        titulo="Despesa executada acumulada"
        descricao="Comparativo de despesas executadas, acumuladas no período, ano atual versus ano anterior. No período de janeiro a novembro a despesa executada refere-se às despesas liquidadas no período,enquanto que em dezembro trata-se do total de despesa empenhada no ano."
        dados={dados?.despesaExecutada}
        tipo="bar"
      />
      <CartaoSerie
        largura={4}
        titulo="Resultado orçamentário"
        descricao="Comparativo de resultado orçamento no período, ano atual versus ano anterior. O resultado orçamentário é obtido pela diferença entre 'receita realizada acumulada' e a 'despesa executada acumulada'."
        dados={dados?.resultadoOrcamentario}
        tipo="bar"
        negativoVermelho
      />
    </Pagina>
  );
}
