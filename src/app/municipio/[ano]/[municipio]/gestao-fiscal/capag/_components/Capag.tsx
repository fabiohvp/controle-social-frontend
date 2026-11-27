import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import SectionTitle from "@/components/panel/SectionTitle";
import { COLOR } from "@/theme/colors";
import { EsferaProps } from "@/shared/esfera";
import { MultiSerie, SerieItem } from "@/types/Serie";
import AvisoPagina from "@/components/gestao-fiscal/_comum/AvisoPagina";
import {
  getDadosApiController,
  percentualParaNumero,
} from "@/components/gestao-fiscal/_comum/apiController";
import EvolucaoNotas from "@/components/gestao-fiscal/_comum/EvolucaoNotas";
import LinhaValor from "@/components/gestao-fiscal/_comum/LinhaValor";
import MedidorLimite, {
  COR_MEDIDOR,
  SituacaoMedidor,
} from "@/components/gestao-fiscal/_comum/MedidorLimite";
import NotaCirculo from "@/components/gestao-fiscal/_comum/NotaCirculo";
import ValorDinheiro from "@/components/gestao-fiscal/_comum/ValorDinheiro";

/*
 * Gestão fiscal > CAPAG - Capacidade de pagamento TCEES (site oficial: Capag).
 * API: CAPAGControllers/CAPAG. Só existe para município.
 */

type Classificacao = {
  ano: number;
  notaCAPAG: string;
  notaEndividamento: string;
  valorEndividamento: string;
  valorEndividamentoDCB: number;
  valorEndividamentoRCL: number;
  notaPoupancaCorrente: string;
  valorPoupancaCorrente: string;
  valorPC1: string;
  valorPC2: string;
  valorPC3: string;
  notaLiquidez: string;
  valorLiquidez: string;
  valorOFLiquidez: number;
  valorDCBLiquidez: number;
  valorICFVLiquidez: number;
};

type Graficos = {
  capag: SerieItem[];
  endividamento: MultiSerie;
  liquidez: MultiSerie;
  indicadores: MultiSerie;
};

type GraficosAnuais = { capag: SerieItem[]; indicadores: MultiSerie };

const DESCRICAO_RECEITA_DESPESA =
  "Possibilita comparar os gastos realizados com o montante arrecadado no mês e identificar a ocorrência de déficit (despesa maior que receita) ou superávit (receita maior que a despesa).";

/** Combinações de notas (endividamento, poupança corrente, liquidez) e CAPAG final */
const COMBINACOES = [
  ["A", "A", "A", "A"],
  ["A", "B", "A", "A"],
  ["A", "A", "B", "A"],
  ["B", "A", "A", "B"],
  ["C", "A", "A", "B"],
  ["B", "B", "A", "B"],
  ["C", "B", "A", "B"],
  ["B", "A", "B", "B"],
  ["C", "A", "B", "B"],
  ["A", "B", "B", "B"],
  ["B", "B", "B", "B"],
  ["C", "B", "B", "B"],
  ["C", "C", "C", "D"],
];

function CardNotaCapag({ dados }: { dados: Classificacao | null }) {
  return (
    <PanelWithDescription
      className="md:col-span-6 lg:col-span-3"
      titulo="Capacidade de Pagamento"
      descricao="A análise da Capacidade de Pagamento (Capag) apura a situação fiscal do município, considerando os indicadores: endividamento, poupança corrente e liquidez."
      bodyProps={{ className: "flex-col items-center justify-center gap-2" }}
    >
      {dados ? (
        <>
          <NotaCirculo nota={dados.notaCAPAG} tamanho={72} />
          <LinhaValor titulo="Endividamento">{dados.notaEndividamento}</LinhaValor>
          <LinhaValor titulo="Poupança Corrente">
            {dados.notaPoupancaCorrente}
          </LinhaValor>
          <LinhaValor titulo="Liquidez">{dados.notaLiquidez}</LinhaValor>
        </>
      ) : (
        <span className="text-gray-medium text-sm">Informação indisponível</span>
      )}
    </PanelWithDescription>
  );
}

function CardComponentes({
  titulo,
  descricao,
  principal,
  outros,
  ano,
}: {
  titulo: string;
  descricao: string;
  principal: { valor: number | undefined; legenda: string };
  outros?: { valor: number | undefined; legenda: string }[];
  ano: number;
}) {
  return (
    <PanelWithDescription
      className="md:col-span-6 lg:col-span-3"
      titulo={titulo}
      descricao={descricao}
      bodyProps={{ className: "flex-col items-center justify-center gap-1 text-center" }}
    >
      <ValorDinheiro valor={principal.valor} ano={ano} />
      <span className="text-xs text-gray-medium">({principal.legenda})</span>
      {outros && (
        <>
          <hr className="w-full" />
          <div className="flex w-full justify-evenly gap-2">
            {outros.map((item) => (
              <div key={item.legenda} className="flex flex-col items-center">
                <ValorDinheiro valor={item.valor} ano={ano} className="text-lg" />
                <span className="text-xs text-gray-medium">({item.legenda})</span>
              </div>
            ))}
          </div>
        </>
      )}
    </PanelWithDescription>
  );
}

export default async function Capag({ esfera, anoExercicio }: EsferaProps) {
  const get = <T,>(recurso: string) =>
    getDadosApiController<T>(`CAPAGControllers/CAPAG/${recurso}`, esfera, anoExercicio);

  const [classificacao, mensais, anuais, poupanca] = await Promise.all([
    get<Classificacao>("GetClassificacaoCapag"),
    get<Graficos>("GetGraficosEvolucaoMensalCapag"),
    get<GraficosAnuais>("GetGraficosEvolucaoAnualCapag"),
    get<MultiSerie>("GetEvolucaoAnualPoupancaCorrente"),
  ]);

  const endividamento = percentualParaNumero(classificacao?.valorEndividamento);
  const poupancaCorrente = percentualParaNumero(classificacao?.valorPoupancaCorrente);
  const liquidez = percentualParaNumero(classificacao?.valorLiquidez);

  const situacaoPorFaixa = (
    valor: number | null,
    laranja: number,
    vermelho: number
  ): SituacaoMedidor =>
    valor === null ? "ok" : valor >= vermelho ? "ruim" : valor >= laranja ? "alerta" : "ok";

  const situacaoLiquidez: SituacaoMedidor =
    liquidez === null ? "ok" : liquidez <= 0 ? "ruim" : liquidez < 5 ? "alerta" : "ok";

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <AvisoPagina>
        <b>Capacidade de Pagamento (CAPAG) calculada pelo TCEES.</b> O cálculo é
        composto por três indicadores: endividamento, poupança corrente e
        liquidez relativa. Avalia-se com isso, a saúde fiscal e o grau de
        solvência do Município (capacidade de cumprir obrigações financeiras).
        <br />
        <br />
        <b>Nota:</b> O resultado apurado pelo TCEES, exibido nesse Painel não
        vincula a posição do Tesouro Nacional.{" "}
        <b>O cálculo definitivo da CAPAG será efetuado pelo Tesouro</b> por
        ocasião da verificação do cumprimento dos limites e condições para
        contratação de operações de crédito com garantia da União.{" "}
        <a
          className="font-bold underline"
          href="https://www.tcees.tc.br/wp-content/uploads/formidable/39/Nota-explicativa-sobre-os-indicadores-da-CAPAG-calculados-pelo-TCEES.zip"
          rel="noopener noreferrer"
        >
          Clique aqui
        </a>{" "}
        para ler observações <b>importantes</b> a respeito da geração da CAPAG
        pelo TCEES.
      </AvisoPagina>

      <SectionTitle>Capacidade de Pagamento</SectionTitle>
      <CardNotaCapag dados={classificacao} />
      <EvolucaoNotas
        className="md:col-span-6 lg:col-span-4"
        titulo="Evolução anual da capacidade de pagamento"
        dados={anuais?.capag ?? null}
      />
      <EvolucaoNotas
        className="md:col-span-12 lg:col-span-5"
        titulo="Evolução mensal da capacidade de pagamento"
        dados={mensais?.capag ?? null}
      />

      <SectionTitle>Indicadores</SectionTitle>
      <CardComponentes
        titulo="Componentes de endividamento"
        descricao="O Endividamento é calculado pelo divisão entre Dívida Consolidada e Receita Corrente Líquida."
        principal={{
          valor: classificacao?.valorEndividamentoDCB,
          legenda: "dívida consolidada bruta",
        }}
        outros={[
          {
            valor: classificacao?.valorEndividamentoRCL,
            legenda: "receita corrente líquida",
          },
        ]}
        ano={anoExercicio}
      />
      <MedidorLimite
        className="md:col-span-6 lg:col-span-3"
        titulo="Endividamento"
        descricao="Classificação obtida no indicador Endividamento ou Dívida Consolidada (DC). Nota A, se DC < 60%; Nota B, se 60% <= DC < 100%; e Nota C, se DC >= 100%."
        valor={endividamento}
        max={110}
        faixas={[
          { ate: 60, cor: COR_MEDIDOR.ok, rotulo: "60%" },
          { ate: 100, cor: COR_MEDIDOR.alerta, rotulo: "100%" },
          { ate: 110, cor: COR_MEDIDOR.ruim },
        ]}
        situacao={situacaoPorFaixa(endividamento, 60, 100)}
        legenda="A, se < 60%; B, se >= 60% e < 100%; C se >= 100%"
        nomeMedidor="Endividamento"
      />
      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução mensal do endividamento"
        descricao="Evolução mensal da Dívida Consolidada e da Receita Corrente Líquida."
      >
        <MultiSeriesChart
          dados={mensais?.endividamento ?? null}
          corrigirIpca={anoExercicio}
        />
      </PanelWithDescription>

      <CardComponentes
        titulo="Componentes de liquidez relativa"
        descricao="A liquidez relativa (LR) é calculada subtraindo Obrigações Financeiras (OF) de Disponibilidade de Caixa Bruta (DCB) e somando a Insuficiência de Caixa em Fontes Vinculadas (ICFV). Na sequência divide-se o resultado pela Receita Corrente Líquida (RCL)."
        principal={{
          valor: classificacao?.valorOFLiquidez,
          legenda: "obrigações financeiras",
        }}
        outros={[
          {
            valor: classificacao?.valorDCBLiquidez,
            legenda: "disponibilidade de caixa bruto",
          },
          {
            valor: classificacao?.valorICFVLiquidez,
            legenda: "insuficiência de caixa em fontes vinculadas",
          },
        ]}
        ano={anoExercicio}
      />
      <MedidorLimite
        className="md:col-span-6 lg:col-span-3"
        titulo="Liquidez relativa"
        descricao="Classificação obtida no indicador de Liquidez Relativa (LR). Nota a se LR >= 5%; nota B, se 0% < LR < 5%; e nota C, se LR <= 0%."
        valor={liquidez}
        max={110}
        faixas={[
          { ate: 0, cor: COR_MEDIDOR.ruim, rotulo: "0%" },
          { ate: 5, cor: COR_MEDIDOR.alerta, rotulo: "5%" },
          { ate: 110, cor: COR_MEDIDOR.ok },
        ]}
        situacao={situacaoLiquidez}
        legenda="A, se >= 5%; B, se > 0% e < 5%; C, se <= 0%"
        nomeMedidor="Liquidez"
      />
      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução mensal da liquidez relativa"
        descricao="Evolução mensal de Obrigações Financeiras, Disponibilidade de Caixa Bruta e Insuficiência de Caixa em Fontes Vinculadas."
      >
        <MultiSeriesChart
          dados={mensais?.liquidez ?? null}
          corrigirIpca={anoExercicio}
        />
      </PanelWithDescription>

      <PanelWithDescription
        className="md:col-span-6 lg:col-span-3"
        titulo="Poupança corrente"
        descricao="A Poupança Corrente é calcula pela divisão de Despesa Corrente e Receita Corrente no ano corrente e nos dois anteriores. É utilizada uma média ponderada em que o ano corrente tem peso de 0,5; ano corrente - 1 tem peso 0,3; e o ano corrente - 2 tem peso de 0,2."
        bodyProps={{ className: "flex-col items-center justify-center gap-2" }}
      >
        {classificacao ? (
          <>
            <NotaCirculo nota={classificacao.notaPoupancaCorrente} tamanho={56} />
            <LinhaValor titulo="Valor obtido">
              {classificacao.valorPoupancaCorrente}
            </LinhaValor>
            <LinhaValor titulo={String(classificacao.ano)}>
              {classificacao.valorPC1}
            </LinhaValor>
            <LinhaValor titulo={String(classificacao.ano - 1)}>
              {classificacao.valorPC2}
            </LinhaValor>
            <LinhaValor titulo={String(classificacao.ano - 2)}>
              {classificacao.valorPC3}
            </LinhaValor>
          </>
        ) : (
          <span className="text-gray-medium text-sm">Informação indisponível</span>
        )}
      </PanelWithDescription>
      <MedidorLimite
        className="md:col-span-6 lg:col-span-3"
        titulo="Poupança corrente"
        descricao="Classificação obtida no indicador Poupança Corrente (PC). Nota A, se PC < 85%; nota B, se 85% <= PC < 95%; e nota C, se PC >= 95%."
        valor={poupancaCorrente}
        max={110}
        faixas={[
          { ate: 85, cor: COR_MEDIDOR.ok, rotulo: "85%" },
          { ate: 95, cor: COR_MEDIDOR.alerta, rotulo: "95%" },
          { ate: 110, cor: COR_MEDIDOR.ruim },
        ]}
        situacao={situacaoPorFaixa(poupancaCorrente, 85, 95)}
        legenda="A, se < 85%; B, se >= 85% e < 95%; C se >= 95%"
        nomeMedidor="Poupança corrente"
      />
      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução anual da poupança corrente"
        descricao={DESCRICAO_RECEITA_DESPESA}
      >
        <MultiSeriesChart
          dados={poupanca}
          tipos={["bar", "bar"]}
          cores={[COLOR.despesa, COLOR.receita]}
        />
      </PanelWithDescription>

      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução anual dos indicadores"
        descricao={DESCRICAO_RECEITA_DESPESA}
      >
        <MultiSeriesChart
          dados={anuais?.indicadores ?? null}
          formato="percentual"
        />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-6"
        titulo="Evolução mensal dos indicadores"
        descricao="Evolução mensal das Obrigações Financeiras e da Disponibilidade de Caixa."
      >
        <MultiSeriesChart
          dados={mensais?.indicadores ?? null}
          formato="percentual"
        />
      </PanelWithDescription>

      <PanelWithDescription
        className="md:col-span-12"
        titulo="Possíveis combinações de resultados"
        bodyProps={{ className: "overflow-x-auto" }}
      >
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2">Endividamento</th>
              <th className="p-2">Poupança corrente</th>
              <th className="p-2">Liquidez</th>
              <th className="p-2">Classificação final (CAPAG)</th>
            </tr>
          </thead>
          <tbody>
            {COMBINACOES.map((combinacao) => (
              <tr key={combinacao.join("")} className="border-b">
                {combinacao.map((nota, indice) => (
                  <td key={indice} className="p-1">
                    <NotaCirculo nota={nota} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-2">Demais combinações</td>
              <td />
              <td />
              <td className="p-1">
                <NotaCirculo nota="C" />
              </td>
            </tr>
          </tbody>
        </table>
      </PanelWithDescription>
    </div>
  );
}
