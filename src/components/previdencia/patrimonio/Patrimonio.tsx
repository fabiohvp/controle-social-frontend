import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import {
  PrevidenciaProps,
  getDadosPrevidencia,
} from "@/components/previdencia/previdenciaApi";
import MoneyValue from "@/components/values/MoneyValue";
import { SerieItem } from "@/types/Serie";

type Total = { ano: number; valor: number; descricao: string }[];

const GRAFICOS_EVOLUCAO = [
  {
    titulo: "recursos financeiros",
    descricao:
      "saldo de disponibilidades financeiras e ativos garantidores destinados ao pagamento de benefícios previdenciários.",
    metodo: "RecursosFinanceiros",
  },
  {
    titulo: "créditos e valores a receber de curto prazo",
    descricao:
      "saldo de créditos previdenciários a receber no curto prazo, envolvendo créditos previdenciários em geral e/ou créditos previdenciários parcelados.",
    metodo: "AtivosCurtoPrazo",
  },
  {
    titulo: "créditos e valores a receber de longo prazo",
    descricao:
      "saldo de créditos previdenciários a receber no longo prazo, envolvendo créditos previdenciários em geral e/ou créditos previdenciários parcelados.",
    metodo: "AtivosLongoPrazo",
  },
];

/** Previdência > Patrimônio. A API de patrimônio é a mesma para município e Estado (só muda a UG) */
export default async function Patrimonio({
  anoExercicio,
  codigoUnidadeGestora,
}: PrevidenciaProps) {
  const params = { anoExercicio, codigoUnidadeGestora };
  const get = <T,>(metodo: string, extras = {}) =>
    getDadosPrevidencia<T>(`Patrimonio/${metodo}`, { ...params, ...extras });

  const [[ativoTotal, passivoTotal, ativos, passivos], evolucoes] =
    await Promise.all([
      Promise.all([
        get<Total>("GetComposicaoAtivoTotal", { quantidade: 0 }),
        get<Total>("GetComposicaoPassivoTotal", { quantidade: 0 }),
        get<SerieItem[]>("GetComposicaoAtivoSingleseries", { quantidade: 3 }),
        get<SerieItem[]>("GetComposicaoPassivoSingleseries", { quantidade: 3 }),
      ]),
      Promise.all(
        GRAFICOS_EVOLUCAO.flatMap(({ metodo }) => [
          get<SerieItem[]>(`GetEvolucaoAnual${metodo}Singleseries`),
          get<SerieItem[]>(`GetEvolucaoMensal${metodo}Singleseries`),
        ])
      ),
    ]);

  const valorAtivos = ativoTotal?.[1] ? -1 * ativoTotal[1].valor : null;
  const valorPassivos = passivoTotal?.[1]?.valor ?? null;

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-12" id="patrimonio-previdencia">
      <PanelWithDescription
        className="lg:col-span-2"
        titulo="Ativos e Passivos"
        descricao="Totais dos recursos (ativos) e das obrigações (passivos + patrimônio líquido)."
        bodyProps={{ className: "center flex-col gap-2 text-center" }}
      >
        <MoneyValue valor={valorAtivos} ano={anoExercicio} />
        <span className="text-sm">(ativos)</span>
        <hr className="w-full" />
        <MoneyValue valor={valorPassivos} ano={anoExercicio} />
        <span className="text-sm">(passivos)</span>
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-5"
        titulo="Composição dos ativos"
        descricao="Composição dos recursos previdenciários por tipo de ativo."
      >
        <SingleSeriesChart dados={ativos} tipo="bar" negativoVermelho />
      </PanelWithDescription>
      <PanelWithDescription
        className="lg:col-span-5"
        titulo="Composição dos passivos"
        descricao="Composição das obrigações previdenciárias por tipo de passivo."
      >
        <SingleSeriesChart dados={passivos} tipo="bar" negativoVermelho />
      </PanelWithDescription>
      {GRAFICOS_EVOLUCAO.flatMap(({ titulo, descricao }, indice) => [
        <PanelWithDescription
          key={`${titulo}-anual`}
          className="lg:col-span-6"
          titulo={`Evolução anual dos ${titulo}`}
          descricao={`Evolução anual do ${descricao}`}
        >
          <SingleSeriesChart dados={evolucoes[indice * 2]} />
        </PanelWithDescription>,
        <PanelWithDescription
          key={`${titulo}-mensal`}
          className="lg:col-span-6"
          titulo={`Evolução mensal dos ${titulo}`}
          descricao={`Evolução mensal do ${descricao}`}
        >
          <SingleSeriesChart dados={evolucoes[indice * 2 + 1]} />
        </PanelWithDescription>,
      ])}
    </div>
  );
}
