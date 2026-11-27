import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import {
  PrevidenciaProps,
  getDadosPrevidenciaEnte,
} from "@/components/previdencia/previdenciaApi";
import { MultiSerie } from "@/types/Serie";

type Informacoes = {
  dataBaseCalculo: string;
  dataCalculo: string;
  nomeAtuarioResponsavel: string;
};

type ProjecaoXExecucao = {
  projecaoXExecucao: MultiSerie;
  diferencaProjecaoXExecucao: MultiSerie;
};

type ComparacaoProjecoes = {
  receitaPrevidenciaria: MultiSerie;
  despesaPrevidenciaria: MultiSerie;
  resultadoPrevidenciario: MultiSerie;
};

const COMPARACOES: { chave: keyof ComparacaoProjecoes; titulo: string }[] = [
  { chave: "receitaPrevidenciaria", titulo: "Receita Projetada" },
  { chave: "despesaPrevidenciaria", titulo: "Despesa Projetada" },
  { chave: "resultadoPrevidenciario", titulo: "Resultado da Projeção" },
];

/** Previdência > Projeções atuariais, igual para município e Estado */
export default async function ProjecoesAtuariais(props: PrevidenciaProps) {
  const [informacoes, projecoes, projecaoXExecucao, comparacao] =
    await Promise.all([
      getDadosPrevidenciaEnte<Informacoes>(props, "GetProjecaoAtuarialInformacoes"),
      getDadosPrevidenciaEnte<MultiSerie>(props, "GetProjecaoAtuarialMultiseries"),
      getDadosPrevidenciaEnte<ProjecaoXExecucao>(
        props,
        "GetProjecaoAtuarialXexecutadaMultiseries"
      ),
      getDadosPrevidenciaEnte<ComparacaoProjecoes>(
        props,
        "GetComparacaoProjecoesAtuariaisMultiseries"
      ),
    ]);

  const quantidadeLinhas = (serie?: MultiSerie | null) =>
    (serie?.labels ?? []).map(() => "line" as const);

  return (
    <div className="grid grid-cols-1 gap-2" id="projecoes-atuariais">
      <div className="border-y border-gray-300 py-2">
        {informacoes?.dataBaseCalculo ? (
          <>
            <p>
              Data base dos dados: <strong>{informacoes.dataBaseCalculo}</strong>
            </p>
            <p>
              Data do cálculo: <strong>{informacoes.dataCalculo}</strong>
            </p>
            <p>
              Nome do atuário responsável:{" "}
              <strong>{informacoes.nomeAtuarioResponsavel}</strong>
            </p>
          </>
        ) : (
          <p className="text-orange-700">
            Informação da projeção atuarial indisponível para o ano selecionado
          </p>
        )}
      </div>
      <PanelWithDescription
        titulo="Projeções atuariais"
        descricao={
          <>
            Projeções atuariais: compreendem as projeções de todas as receitas e
            despesas previdenciárias do RPPS, considerando o fluxo atuarial dos
            benefícios concedidos e a conceder, assim como receitas e despesas
            relativas ao custeio administrativo do regime, com o objetivo de
            atender às exigências da Lei de Responsabilidade Fiscal.
            <br />
            <b>
              Estas projeções atuariais apresentam um fluxo de receitas e
              despesas ao longo de tempo estimado de 75 anos.
            </b>
          </>
        }
      >
        <MultiSeriesChart
          dados={projecoes}
          tipos={quantidadeLinhas(projecoes)}
          corrigirIpca={false}
        />
      </PanelWithDescription>
      <PanelWithDescription
        titulo="Projeções atuariais x Execução orçamentária"
        descricao="Neste gráfico as projeções atuariais são comparadas a receitas arrecadadas, despesas empenhadas e resultado orçamentário obtido."
      >
        <MultiSeriesChart
          dados={projecaoXExecucao?.projecaoXExecucao ?? null}
          tipos={["line", "line", "line", "bar", "bar", "bar"]}
          corrigirIpca={false}
        />
      </PanelWithDescription>
      <PanelWithDescription
        titulo="Diferença entre projeção e execução"
        descricao="Este gráfico exibe a diferença entre os receitas, despesas e resultado orçamentário alcançados e os projetados. Em geral, espera-se que as receitas e o resultado sejam iguais ou superiores ao projetado, enquanto as despesas sejam iguais ou inferiores ao projetado."
      >
        <MultiSeriesChart
          dados={projecaoXExecucao?.diferencaProjecaoXExecucao ?? null}
          corrigirIpca={false}
        />
      </PanelWithDescription>
      {COMPARACOES.map(({ chave, titulo }) => (
        <PanelWithDescription
          key={chave}
          titulo={`Comparação entre projeções: ${titulo}`}
          descricao="Gráfico que permite comparação entre a projeção enviada no ano escolhido e as quatro projeções anteriores. Cada uma delas faz uma projeção para os 75 anos seguintes."
        >
          <MultiSeriesChart
            dados={comparacao?.[chave] ?? null}
            tipos={quantidadeLinhas(comparacao?.[chave])}
            corrigirIpca={false}
          />
        </PanelWithDescription>
      ))}
    </div>
  );
}
