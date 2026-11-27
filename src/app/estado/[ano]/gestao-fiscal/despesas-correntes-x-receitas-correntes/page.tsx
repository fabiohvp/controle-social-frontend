import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { getDadosLimiteDespesaReceita } from "../../_gestao/api";
import {
  Aviso,
  CartaoLimite,
  CartaoMulti,
  CartaoSerie,
  CartaoValores,
  Pagina,
} from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão fiscal > Despesas correntes x receitas correntes (DespesasReceitas$1) */

const DESCRICAO_RELACAO =
  "A relação entre despesas correntes e receitas correntes é apurada em 12 meses móveis. As despesas correntes não devem superar 95% das receitas correntes.";

type Limite = { valorApurado: string; valorAlerta: number; valorMaximo: number };
type Valores = { receitaCorrente: number; despesaCorrente: number };

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const anoExercicio = Number(ano);
  const get = <T,>(metodo: string) =>
    getDadosLimiteDespesaReceita<T>(anoExercicio, metodo);

  const [limite, relacaoMensal, relacaoAnual, valores, valoresMensal, valoresAnual] =
    await Promise.all([
      get<Limite>("GetLimiteDespesaReceita"),
      get<SerieItem[]>("GetEvolucaoMensalLimiteDespesaReceita"),
      get<SerieItem[]>("GetEvolucaoAnualLimiteDespesaReceita"),
      get<Valores>("GetValorDespesaReceita"),
      get<MultiSerie>("GetEvolucaoMensalValorDespesaReceita"),
      get<MultiSerie>("GetEvolucaoAnualValorDespesaReceita"),
    ]);

  // "valorApurado" vem como texto pt-BR ("76,32")
  const apurado = limite ? Number(limite.valorApurado.replace(",", ".")) : null;

  return (
    <Pagina>
      <CartaoLimite
        titulo="Relação despesas correntes x receitas correntes"
        descricao="As despesas correntes não devem superar 95% das receitas correntes. Mesmo não atingindo essa relação, caso as despesas correntes superem 85% das receitas correntes, o mecanismo de ajuste fiscal já pode ser adotado (art. 167-A da Constituição Federal de 1988)."
        percentual={apurado !== null && !Number.isNaN(apurado) ? apurado : null}
        tipo="maximo"
        limite={limite?.valorMaximo ?? 95}
        alerta={limite?.valorAlerta ?? 85}
        base="das receitas correntes"
      />
      <CartaoSerie
        largura={8}
        titulo="Evolução mensal da relação entre despesas correntes e receitas correntes"
        descricao={DESCRICAO_RELACAO}
        dados={relacaoMensal}
        formato="percentual"
      />
      <CartaoSerie
        largura={12}
        titulo="Evolução anual da relação entre despesas correntes e receitas correntes"
        descricao={DESCRICAO_RELACAO}
        dados={relacaoAnual}
        formato="percentual"
      />
      <CartaoValores
        titulo="Despesas correntes e receitas correntes"
        descricao="A relação percentual é obtida a partir dos valores de despesas correntes e receitas correntes aqui apresentados."
        itens={[
          { rotulo: "Despesa corrente", valor: valores?.despesaCorrente },
          { rotulo: "Receita corrente", valor: valores?.receitaCorrente },
        ]}
        ano={anoExercicio}
      />
      <CartaoMulti
        largura={8}
        titulo="Evolução mensal de despesas correntes e receitas correntes"
        descricao="Evolução das despesas correntes e das receitas correntes."
        dados={valoresMensal}
        tipos={["line", "line"]}
        corrigirIpca={anoExercicio}
      />
      <CartaoMulti
        largura={12}
        titulo="Evolução anual de despesas correntes e receitas correntes"
        descricao="Evolução das despesas correntes e das receitas correntes."
        dados={valoresAnual}
        tipos={["bar", "bar"]}
      />
      <Aviso>
        A apuração da relação entre a receita corrente e a despesa corrente
        considera 12 (doze) meses móveis no mesmo formato da apuração da Receita
        Corrente Líquida - RCL e da despesa total com pessoal apurada para fins
        dos limites previstos na Lei de Responsabilidade Fiscal - LRF.
        <br />
        Para fins de cálculo, foram utilizados os dados das receitas correntes e
        despesas correntes, exceto intraorçamentárias (Nota Técnica 005/2021 da
        Secretaria Geral de Controle Externo do TCE-ES).
      </Aviso>
    </Pagina>
  );
}
