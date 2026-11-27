import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import IndiceChart from "@/components/previdencia/IndiceChart";
import PrevidenciaGauge from "@/components/previdencia/PrevidenciaGauge";
import {
  PrevidenciaProps,
  getDadosPrevidencia,
} from "@/components/previdencia/previdenciaApi";
import MoneyValue from "@/components/values/MoneyValue";
import { COLOR } from "@/theme/colors";
import { MultiSerie, SerieItem } from "@/types/Serie";
import { ReactNode } from "react";

type Valor = { valor: number } | null;

const AVISO_PASSIVO_ATUARIAL =
  "O passivo atuarial é atualizado, em regra, apenas no encerramento do exercício, com base na avaliação atuarial anual (dezembro). Assim, ao longo do ano corrente, esse valor pode permanecer baseado na última avaliação disponível, podendo gerar distorções temporárias";

function CardSumario({
  titulo,
  descricao,
  valor,
  ano,
}: {
  titulo: string;
  descricao: ReactNode;
  valor: number | null;
  ano: number;
}) {
  return (
    <PanelWithDescription
      className="md:col-span-3"
      titulo={titulo}
      descricao={descricao}
      bodyProps={{ className: "center min-h-[100px]" }}
    >
      <MoneyValue valor={valor} ano={ano} />
    </PanelWithDescription>
  );
}

function CardIndice({
  titulo,
  descricao,
  indice,
  faixas,
  legenda,
}: {
  titulo: string;
  descricao: ReactNode;
  indice: Valor;
  faixas: { ate: number; cor: string; nome: string }[];
  legenda: string;
}) {
  return (
    <PanelWithDescription
      className="md:col-span-6"
      titulo={titulo}
      descricao={descricao}
    >
      {indice ? (
        <div className="flex flex-col items-center">
          <PrevidenciaGauge valor={-1 * indice.valor} faixas={faixas} />
          <span className="text-gray-dark text-sm">{legenda}</span>
        </div>
      ) : (
        <span className="center min-h-[120px] text-gray-light text-sm">
          Informação indisponível
        </span>
      )}
    </PanelWithDescription>
  );
}

/**
 * Previdência > Resultado atuarial, igual para município e Estado. A necessidade
 * de cobertura financeira só existe no Fundo Financeiro (UG "...E0900001").
 */
export default async function ResultadoAtuarial({
  anoExercicio,
  codigoUnidadeGestora,
}: PrevidenciaProps) {
  const params = { anoExercicio, codigoUnidadeGestora };
  const fundoFinanceiro = codigoUnidadeGestora.includes("E0900001");
  const atuarial = <T,>(metodo: string) =>
    getDadosPrevidencia<T>(`ResultadoAtuarial/${metodo}`, params);
  const patrimonio = <T,>(metodo: string) =>
    getDadosPrevidencia<T>(`Patrimonio/${metodo}`, params);

  const [
    aConceder,
    concedidos,
    ativoDisponivel,
    indiceConcedidos,
    indiceSolvencia,
    necessidade,
    evolucaoNecessidade,
    evolucaoRecursos,
    evolucaoResultado,
    evolucaoIndiceConcedidos,
    evolucaoSolvencia,
  ] = await Promise.all([
    atuarial<Valor>("GetProvisaoBeneficiosAConceder"),
    atuarial<Valor>("GetProvisaoBeneficiosConcedidos"),
    atuarial<Valor>("GetResultadoAtuarialAtivoDisponivel"),
    patrimonio<Valor>("GetIndiceCoberturaBeneficiosConcedidos"),
    patrimonio<Valor>("GetIValorIndiceCobertura"),
    fundoFinanceiro ? patrimonio<Valor>("GetNecessidadeCoberturaFinanceira") : null,
    fundoFinanceiro
      ? patrimonio<SerieItem[]>(
          "GetEvolucaoAnualNecessidadeCoberturaFinanceiraSingleseries"
        )
      : null,
    patrimonio<SerieItem[]>("GetEvolucaoAnualRecursosFinanceirosSingleseries"),
    atuarial<MultiSerie>("GetEvolucaoAnualResultadoAtuarialMultiseries"),
    patrimonio<SerieItem[]>(
      "GetEvolucaoAnualIndiceCoberturaBeneficiosConcedidosSingleseries"
    ),
    atuarial<SerieItem[]>("GetEvolucaoAnualIndiceCoberturaSingleseries"),
  ]);

  const valorConcedidos = concedidos?.valor ?? null;
  const valorAConceder = aConceder?.valor ?? null;
  const passivoAtuarial =
    valorConcedidos && valorAConceder ? valorConcedidos + valorAConceder : null;

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12" id="resultado-atuarial">
      <CardSumario
        titulo="Ativos disponíveis"
        descricao="Disponibilidades financeiras e ativos garantidores destinados ao pagamento de benefícios previdenciários."
        valor={ativoDisponivel ? -1 * ativoDisponivel.valor : null}
        ano={anoExercicio}
      />
      <CardSumario
        titulo="Provisão de benefícios concedidos"
        descricao="Saldo evidenciado na conta contábil de provisões matemáticas previdenciárias de benefícios concedidos, deduzida a cobertura de insuficiência financeira assegurada em lei."
        valor={valorConcedidos}
        ano={anoExercicio}
      />
      <CardSumario
        titulo="Provisão de benefícios a conceder"
        descricao="Saldo evidenciado na conta contábil de provisões matemáticas previdenciárias de benefícios a conceder, deduzida a cobertura de insuficiência financeira assegurada em lei."
        valor={valorAConceder}
        ano={anoExercicio}
      />
      <CardSumario
        titulo="Passivo atuarial"
        descricao={
          <>
            Saldo evidenciado na conta contábil de provisões matemáticas
            previdenciárias, deduzida a cobertura de insuficiência financeira
            assegurada em lei.
            <br />
            {AVISO_PASSIVO_ATUARIAL} nos índices que o utilizam.
          </>
        }
        valor={passivoAtuarial}
        ano={anoExercicio}
      />
      <CardIndice
        titulo="Índice de cobertura de benefícios concedidos"
        descricao="Relação existente entre os ativos previdenciários disponíveis e as provisões matemáticas de benefícios concedidos, ou seja, a capacidade de pagamento de benefícios previdenciários já concedidos pelo RPPS."
        indice={indiceConcedidos}
        faixas={[
          { ate: 0.995, cor: COLOR["chart-negativo"], nome: "Abaixo de 1" },
          { ate: 1, cor: COLOR.positivo, nome: "1 ou mais" },
        ]}
        legenda="Índice de cobertura de benefícios concedidos"
      />
      <CardIndice
        titulo="Índice de Solvência"
        descricao={
          <>
            Solvência, em finanças e contabilidade, é o estado do devedor que
            possui seu ativo maior do que o passivo, ou a sua capacidade de
            cumprir os compromissos com os recursos que constituem seu
            patrimônio ou seu ativo.
            <br />
            {AVISO_PASSIVO_ATUARIAL} no índice de solvência até sua
            atualização.
          </>
        }
        indice={indiceSolvencia}
        faixas={[
          { ate: 0.3, cor: COLOR["chart-negativo"], nome: "Até 0,3" },
          { ate: 0.7, cor: COLOR["chart-alerta"], nome: "0,3 a 0,7" },
          { ate: 1, cor: COLOR.positivo, nome: "0,7 ou mais" },
        ]}
        legenda="Solvência do RPPS"
      />
      {fundoFinanceiro && (
        <>
          <PanelWithDescription
            className="md:col-span-4"
            titulo="Previdência - Fundo Financeiro"
            descricao="Diferença negativa entre receitas e despesas previdenciárias, revelando a necessidade de cobertura de insuficiência financeira por meio de aporte financeiro do ente federativo."
            bodyProps={{ className: "center flex-col gap-2 text-center" }}
          >
            <MoneyValue
              valor={necessidade ? -1 * necessidade.valor : null}
              ano={anoExercicio}
            />
            <span className="text-gray-dark text-sm">
              Necessidade de cobertura financeira nos próximos 75 anos
            </span>
          </PanelWithDescription>
          <PanelWithDescription
            className="md:col-span-8"
            titulo="Evolução anual da necessidade de cobertura financeira"
            descricao="Evolução anual da necessidade de cobertura financeira, Diferença negativa entre receitas e despesas previdenciárias, revelando a necessidade de cobertura de insuficiência financeira por meio de aporte financeiro do ente federativo."
          >
            <SingleSeriesChart dados={evolucaoNecessidade} />
          </PanelWithDescription>
        </>
      )}
      <PanelWithDescription
        className="md:col-span-6"
        titulo="Evolução anual dos recursos financeiros"
        descricao="Evolução anual do saldo de disponibilidades financeiras e ativos garantidores destinados ao pagamento de benefícios previdenciários."
      >
        <SingleSeriesChart dados={evolucaoRecursos} />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-6"
        titulo="Evolução anual do resultado atuarial"
        descricao="Evolução anual da diferença entre os recursos previdenciários constituídos (disponibilidades financeiras e ativos garantidores) e as provisões matemáticas previdenciárias (passivo previdenciário), deduzida a cobertura de insuficiência financeira assegurada em lei."
      >
        <MultiSeriesChart dados={evolucaoResultado} />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-6"
        titulo="Evolução anual do índice de cobertura de PMBC"
        descricao="Evolução anual do índice de cobertura das provisões matemáticas de benefícios concedidos: Evolução anual da relação existente entre os recursos previdenciários constituídos (disponibilidades financeiras e ativos garantidores) e as provisões matemáticas de benefícios concedidos (PMBC), demonstrando a proporção de recursos existentes para cobertura de cada R$ 1,00 de dívida previdenciária."
      >
        <IndiceChart dados={evolucaoIndiceConcedidos} />
      </PanelWithDescription>
      <PanelWithDescription
        className="md:col-span-6"
        titulo="Evolução anual do índice de solvência"
        descricao="Evolução anual do índice de cobertura do passivo previdenciário: Evolução anual da relação existente entre os recursos previdenciários constituídos (disponibilidades financeiras e ativos garantidores) e as provisões matemáticas previdenciárias (passivo previdenciário), demonstrando a proporção de recursos existentes para a cobertura de cada R$ 1,00 de dívida previdenciária."
      >
        <IndiceChart dados={evolucaoSolvencia} />
      </PanelWithDescription>
    </div>
  );
}
