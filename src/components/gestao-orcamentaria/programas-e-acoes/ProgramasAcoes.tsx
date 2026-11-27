import AlertPanel from "@/components/panel/AlertPanel";
import { EsferaProps } from "@/shared/esfera";
import { getDadosPlanejamento } from "../_shared/api";
import SankeyFiltrado from "../_shared/SankeyFiltrado";

/** Gestão orçamentária > Programas e ações (site oficial: ProgramasAcoes), igual para município e estado */

type Funcao = { nome: string; codigos: string[] };

type Registro = {
  nomeFuncao: string;
  nomePrograma: string;
  nomeAcao: string;
  value: number;
};

export default async function ProgramasAcoes({
  esfera,
  anoExercicio,
  funcao,
}: EsferaProps & { funcao?: string }) {
  const funcoes = (
    (await getDadosPlanejamento<Funcao[]>(esfera, "GetFuncoesEmpenho", {
      anoExercicio,
    })) ?? []
  )
    .filter((item) => item.nome !== "-" && item.codigos?.length)
    .map((item) => ({ valor: item.codigos[0], nome: item.nome }));

  const selecionada =
    funcoes.find((item) => item.valor === funcao)?.valor ?? funcoes[0]?.valor;
  const registros = selecionada
    ? await getDadosPlanejamento<Registro[]>(esfera, "GetProgramasAcoesEmpenho", {
        anoExercicio,
        codigoFuncao: selecionada,
      })
    : null;

  return (
    <div className="flex flex-col gap-3">
      <AlertPanel type="info" className="min-h-0">
        Para atender as diferentes necessidades da sociedade, o governo precisa
        organizar seu trabalho de forma detalhada. A área de Saúde, por exemplo,
        tem diferentes desafios: atuação preventiva, construção de hospitais,
        distribuição de medicamentos pelo país, conter epidemias, implementar
        estratégias para grupos de maior risco, promover pesquisas - e um sem
        número de outras atividades. Para organizar sua atuação, o orçamento não
        se limita à divisão pelas áreas de atuação (chamadas formalmente de
        funções orçamentárias), ele também apresenta os programas e ações
        orçamentários.
        <br />
        <br />
        <strong>
          Os valores executados correspondem às despesas liquidadas e os restos
          a pagar não processados liquidados.
        </strong>
      </AlertPanel>

      {funcoes.length === 0 ? (
        <AlertPanel type="warning">
          <strong>Sem dados de despesas.</strong> Não foram realizadas despesas
          no ano de {anoExercicio}.
        </AlertPanel>
      ) : (
        <SankeyFiltrado
          opcoes={funcoes}
          selecionado={selecionada ?? ""}
          parametro="funcao"
          niveis={[
            { campo: "nomeFuncao", rotulo: "Função", fixo: true },
            { campo: "nomePrograma", rotulo: "Programa" },
            { campo: "nomeAcao", rotulo: "Ação" },
          ]}
          registros={registros}
          mensagemSemDados={`Não foram realizadas despesas na função selecionada no ano de ${anoExercicio}.`}
        />
      )}
    </div>
  );
}
