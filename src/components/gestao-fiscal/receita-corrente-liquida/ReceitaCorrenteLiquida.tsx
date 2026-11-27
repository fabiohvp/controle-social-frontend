import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import SectionTitle from "@/components/panel/SectionTitle";
import MoneyValue from "@/components/values/MoneyValue";
import { EsferaProps, getDadosApiEsfera } from "@/shared/esfera";
import { SerieItem } from "@/types/Serie";

/*
 * Gestão fiscal > RCL, igual para município e estado (site oficial:
 * ReceitaCorrenteLiquida / ReceitaCorrenteLiquida$1). Só muda o controller,
 * resolvido por `esfera.tipo`, e o `tipoModulo` exigido pelo Estado nas séries
 * de RCL ajustada (pessoal).
 */

const TIPO_MODULO_ESTADO_PESSOAL_CONSOLIDADO = 503;

type Bloco = {
  titulo: string;
  /** usado em "Evolução mensal/anual da ..." */
  nomeGraficos: string;
  tituloCard: string;
  descricaoCard: string;
  descricaoMensal: string;
  descricaoAnual: string;
  mensal: SerieItem[] | null;
  anual: SerieItem[] | null;
};

function getUltimoValor(serie: SerieItem[] | null) {
  return serie?.length ? (serie[serie.length - 1].valor ?? 0) : 0;
}

function BlocoRcl({ bloco, anoExercicio }: { bloco: Bloco; anoExercicio: number }) {
  const ultimo = bloco.mensal?.[bloco.mensal.length - 1];

  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-4">
      <SectionTitle>{bloco.titulo}</SectionTitle>
      <PanelWithDescription
        titulo={bloco.tituloCard}
        descricao={bloco.descricaoCard}
        bodyProps={{ className: "center min-h-[120px]" }}
      >
        <MoneyValue
          valor={getUltimoValor(bloco.mensal)}
          ano={ultimo?.ano ?? anoExercicio}
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-3"
        titulo={`Evolução mensal da ${bloco.nomeGraficos}`}
        descricao={bloco.descricaoMensal}
      >
        <SingleSeriesChart dados={bloco.mensal} />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-4"
        titulo={`Evolução anual da ${bloco.nomeGraficos}`}
        descricao={bloco.descricaoAnual}
      >
        <SingleSeriesChart dados={bloco.anual} />
      </PanelWithDescription>
    </section>
  );
}

export default async function ReceitaCorrenteLiquida({
  esfera,
  anoExercicio,
}: EsferaProps) {
  // RCL ajustada para endividamento só existe a partir de 2020 (site oficial)
  const exibirEndividamento = anoExercicio >= 2020;
  const parametrosPessoal =
    esfera.tipo === "estado"
      ? { tipoModulo: TIPO_MODULO_ESTADO_PESSOAL_CONSOLIDADO }
      : undefined;
  const get = (recurso: string, parametros?: Record<string, number>) =>
    getDadosApiEsfera<SerieItem[]>(esfera, anoExercicio, recurso, parametros);

  const [
    rclMensal,
    rclAnual,
    endividamentoMensal,
    endividamentoAnual,
    pessoalMensal,
    pessoalAnual,
  ] = await Promise.all([
    get("Receita/GetEvolucaoMensalReceitaCorrenteLiquida"),
    get("Receita/GetEvolucaoAnualReceitaCorrenteLiquida"),
    exibirEndividamento
      ? get("Endividamento/GetEvolucaoMensalRCLAjustadaEndividamento")
      : null,
    exibirEndividamento
      ? get("Endividamento/GetEvolucaoAnualRCLAjustadaEndividamento")
      : null,
    get("PessoalConsolidado/GetEvolucaoMensalRCLAjustadaPessoal", parametrosPessoal),
    get("PessoalConsolidado/GetEvolucaoAnualRCLAjustadaPessoal", parametrosPessoal),
  ]);

  const blocos: Bloco[] = [
    {
      titulo: "Receita Corrente Líquida",
      nomeGraficos: "Receita Corrente Líquida",
      tituloCard: "Receita Corrente Líquida",
      descricaoCard:
        "Segundo a Lei de Responsabilidade Fiscal, RCL (Receita Corrente Líquida) é o somatório das receitas tributárias, de contribuições, patrimoniais, agropecuárias, industriais, de serviços, transferências correntes e outras receitas correntes do ente da Federação, deduzidos alguns itens exaustivamente explicitados no artigo 2º da LRF. A RCL é apurada somando-se as receitas arrecadadas no mês em referência e nos onze anteriores.",
      descricaoMensal:
        "Evolução mensal da RCL, apurada somando-se as receitas arrecadadas no mês em referência e nos onze anteriores.",
      descricaoAnual:
        "Evolução anual da RCL, apurada somando-se as receitas arrecadadas no mês em referência e nos onze anteriores.",
      mensal: rclMensal,
      anual: rclAnual,
    },
    ...(exibirEndividamento
      ? [
          {
            titulo: "Receita Corrente Líquida Ajustada (Endividamento)",
            nomeGraficos: "Receita Corrente Líquida Ajustada",
            tituloCard: "Receita Corrente Líquida",
            descricaoCard:
              "Receita Corrente Líquida Ajustada (Endividamento) é o parâmetro para a verificação do cumprimento dos limites de endividamento (operações de crédito, dívida consolidada e garantias concedidas). Apurada a RCL dos últimos doze meses, incluído o mês de referência, após a exclusão dos valores de transferências obrigatórias da União relativas às emendas individuais, conforme disciplina o art. 166-A, § 1º, da CF.",
            descricaoMensal:
              "Evolução mensal da RCL Ajustada (Endividamento) para verificação do limite, apurada somando-se as receitas arrecadadas no mês em referência e nos onze anteriores.",
            descricaoAnual:
              "Evolução anual da RCL Ajustada (Endividamento) para verificação do limite, apurada somando-se as receitas arrecadadas no mês em referência e nos onze anteriores.",
            mensal: endividamentoMensal,
            anual: endividamentoAnual,
          },
        ]
      : []),
    {
      titulo: "Receita Corrente Líquida Ajustada (Pessoal)",
      nomeGraficos: "Receita Corrente Líquida Ajustada",
      tituloCard: "Receita Corrente Líquida Ajustada",
      descricaoCard:
        "Receita Corrente Líquida Ajustada (Pessoal) é o parâmetro para a verificação do cumprimento dos limites de pessoal (DTP do poder executivo, do poder legislativo e consolidado). Apurada a RCL dos últimos doze meses, incluído o mês de referência, após a exclusão dos valores de transferências obrigatórias da União relativas às emendas individuais e de bancada, conforme disciplina o art. 166-A, § 1º, e o art. 166, § 16, da CF, e dos valores de transferências da União relativas à remuneração dos agentes comunitários de saúde e de combate às endemias, conforme disciplina o art. 198, § 11, da CF.",
      descricaoMensal:
        "Evolução mensal da RCL Ajustada (Pessoal) para verificação do limite, apurada somando-se as receitas arrecadadas no mês em referência e nos onze anteriores.",
      descricaoAnual:
        "Evolução anual da RCL Ajustada (Pessoal) para verificação do limite, apurada somando-se as receitas arrecadadas no mês em referência e nos onze anteriores.",
      mensal: pessoalMensal,
      anual: pessoalAnual,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {blocos.map((bloco) => (
        <BlocoRcl key={bloco.titulo} bloco={bloco} anoExercicio={anoExercicio} />
      ))}
    </div>
  );
}
