import { EstadoPageProps } from "@/app/estado/[ano]/routes";
import { MultiSerie } from "@/types/Serie";
import { ReactNode } from "react";
import { getDadosEstado } from "../../_gestao/api";
import { Aviso, CartaoMulti, Pagina, Secao } from "../../_gestao/Cartoes";

/* Site oficial: Estado > Gestão orçamentária > Despesas por poder (DespesasPorPoder) */

const TIPOS_LINHA: ("line" | "bar")[] = ["line", "line", "line", "line", "line"];

const LINHAS = (texto: string[]) => (
  <>
    {texto.map((linha) => (
      <span key={linha} className="block">
        {linha}
      </span>
    ))}
  </>
);

export default async function Page({
  params,
}: {
  params: Promise<EstadoPageProps>;
}) {
  const { ano } = await params;
  const anoExercicio = Number(ano);
  const get = (tipoPoder: string, tipoFonteReduzida: string) =>
    getDadosEstado<MultiSerie>(anoExercicio, "Despesa/GetDespesaLiquidadaPorPoder", {
      tipoPoder,
      tipoFonteReduzida,
    });

  const [
    executivoOrdinarios,
    executivoSaude,
    executivoEducacao,
    executivoDemais,
    judiciario,
    assembleia,
    ministerioPublico,
    tribunalContas,
    defensoriaPublica,
  ] = await Promise.all([
    get("E", "O"),
    get("E", "S"),
    get("E", "E"),
    get("E", "D"),
    get("J", ""),
    get("L", ""),
    get("M", ""),
    get("T", ""),
    get("D", ""),
  ]);

  const observacaoAporteIncluido =
    anoExercicio < 2021
      ? "Inclui também as transferências financeiras para a cobertura do Aporte ao Regime Proprio de Previdência Social(RPPS)."
      : "";
  const observacaoAporteExtraorcamentario =
    anoExercicio === 2021
      ? "Não inclui as transferências financeiras relativas ao Aporte para cobertura do défict financeiro do RPPS executado extraorçamentariamente."
      : "";

  const grafico = (
    titulo: string,
    descricao: ReactNode,
    dados: MultiSerie | null
  ) => (
    <CartaoMulti
      largura={12}
      titulo={titulo}
      descricao={descricao}
      dados={dados}
      tipos={TIPOS_LINHA}
      corrigirIpca={anoExercicio}
    />
  );

  return (
    <Pagina>
      <Secao>Poder executivo</Secao>
      {grafico(
        "Despesa liquidada por fonte de recursos ordinários",
        "Despesa liquidada por fonte de recursos de livre aplicação, para atender a quaisquer finalidades.",
        executivoOrdinarios
      )}
      {grafico(
        "Despesa liquidada por fonte de recursos vinculados à saúde",
        LINHAS([
          "Despesa liquidada com recursos provenientes das seguintes fontes:",
          "04 - ações e serviços públicos de saúde;",
          "30 - Programa Federativo de Enfrentamento ao Covid-19 vinculado às ações de saúde e assistência social – LC 173/20;",
          "34 - incentivo SUS União;",
          "35 - SUS - Produção;",
          "55 - bloco de custeio das ações e serviços públicos de saúde;",
          "56 - bloco de investimento na rede de serviços públicos de saúde - SUS.",
        ]),
        executivoSaude
      )}
      {grafico(
        "Despesa liquidada por fonte de recursos vinculados à educação",
        LINHAS([
          "Despesa liquidada com recursos provenientes das seguintes fontes:",
          "02 - Manutenção e Desenvolvimento do Ensino;",
          "13 - FUNDEB - 60%;",
          "14 - FUNDEB - 40%;",
          "31 - Cota-Parte Estadual do Salário Educação;",
          "46 - Programa Dinheiro Direto na Escola - PDDE;",
          "47 - Programa Nacional de Alimentação Escolar - PNAE;",
          "48 - Programa Nacional Apoio Transporte; Escolar - PNATE;",
          "49 - Programa Brasil Alfabetizado;",
          "51 - Programa de Apoio Sistema de Ensino para Atendimento ao EJA;",
          "52 - Programa de Fomento às Escolas de Ensino Médio em Tempo Integral;",
          "65 - Programa Nacional de Acesso ao Ensino Técnico e Emprego - Pronatec;",
          "66 - Plano de Ações Articuladas - PAR.",
        ]),
        executivoEducacao
      )}
      {grafico(
        "Despesa liquidada por fonte de recursos - demais fontes",
        "Despesa liquidada com recursos provenientes das demais fontes não integrantes dos agrupamentos identificados como recursos ordinários, recursos vinculados à saúde e recursos vinculados à educação.",
        executivoDemais
      )}
      <Secao>Poder Judiciário</Secao>
      {grafico(
        "Despesa liquidada por fonte de recursos",
        LINHAS(
          [
            "Despesa liquidada por fonte de recursos, considerando os recursos ordinários, ou seja, de livre aplicação e os recursos vinculados ao Fundo Especial do Poder Judiciário do Estado do Espírito Santo - FUNEPJ.",
            observacaoAporteIncluido,
            observacaoAporteExtraorcamentario,
          ].filter(Boolean)
        ),
        judiciario
      )}
      <Secao>Assembleia Legislativa</Secao>
      {grafico(
        "Despesa liquidada por fonte de recursos",
        "Despesa liquidada por fonte de recursos, considerando os recursos ordinários, ou seja, de livre aplicação e os recursos vinculados ao Fundo Especial do Ministério Público do Estado do Espírito Santo - FUNEMP.",
        assembleia
      )}
      <Secao>Ministério Público</Secao>
      {grafico(
        "Despesa liquidada por fonte de recursos",
        "Despesa liquidada por fonte de recursos, considerando os recursos ordinários, ou seja, de livre aplicação e os recursos vinculados ao Fundo Especial do Ministério Público do Estado do Espírito Santo - FUNEMP.",
        ministerioPublico
      )}
      <Secao>Tribunal de Contas</Secao>
      {grafico(
        "Despesa liquidada por fonte de recursos",
        "Despesa liquidada por fonte de recursos, considerando os recursos ordinários, ou seja, de a livre aplicação.",
        tribunalContas
      )}
      <Secao>Defensoria Pública</Secao>
      {grafico(
        "Despesa liquidada por fonte de recursos",
        "Despesa liquidada por fonte de recursos, considerando os recursos ordinários, ou seja, de livre aplicação e os recursos vinculados ao Fundo de Aparelhamento da Defensoria Pública - FADESPES.",
        defensoriaPublica
      )}
      <Aviso>
        <b>Despesa liquidada</b> - É aquela despesa que foi efetivamente
        realizada, significa dizer que o material, serviço, bem ou obra,
        empenhados, foram recebidos pela Administração.
        <br />
        <b>Fontes de recursos</b> - Constituem-se de determinados agrupamentos
        de naturezas de receitas, atendendo a uma determinada regra de
        destinação legal, e servem para indicar como são financiadas as despesas
        orçamentárias. Os recursos ordinários são aqueles recursos de livre
        aplicação, para atender a quaisquer finalidades.
        <br />
        <b>Dívidas</b> - grupo de despesa composto por juros e encargos da
        dívida, amortização da dívida e refinanciamento.
        <br />
        <b>Investimentos</b> - grupo de despesa composto por inversões
        financeiras e investimentos.
      </Aviso>
    </Pagina>
  );
}
