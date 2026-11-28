import MedidorLimite, { COR_MEDIDOR } from "@/components/gestao-fiscal/_comum/MedidorLimite";
import { formatMoneyKMB } from "@/formatters/number";
import { fetchJson } from "@/shared/api";
import { ENV } from "@/shared/env";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { cache } from "react";
import { MunicipioPanelProps } from "../../../../routes";
import {
  escalaLimiteMaximo,
  faixasMinimo,
  faixasPessoal,
  pct,
  situacaoMaximo,
  situacaoMinimo,
  toNumber,
} from "@/components/gestao-fiscal/_comum/medidores";

/* Medidores da visão geral do município, equivalentes aos "widget-gauge" do site oficial. */

const getCodigo = cache(async (municipio: string) => {
  const municipios = await getMunicipios();
  return getCodigoMunicipio(municipios, municipio);
});

const getApi = cache(async <T,>(controller: string, ano: string, municipio: string) => {
  const codigo = await getCodigo(municipio);
  if (!codigo) return null;
  return fetchJson<T>(
    `${ENV.apiUrl}/MunicipioControllers/${controller}?idEsferaAdministrativa=${codigo}&anoExercicio=${ano}&v=${ENV.apiVersion}`
  );
});

type Sumario = { aplicacaoPercentual?: number | string; [key: string]: unknown };
type SumarioEducacao = Sumario & {
  aplicacaoPercentualMagisterio?: number;
  receitaArrecadadaFUNDEB?: number;
  receitaArrecadadaFUNDEBComputada?: number;
};
type SumarioPessoal = { valorPercentual?: number | string; [key: string]: unknown };

function MedidorMinimo({
  titulo,
  descricao,
  valor,
  minimo,
  max = 70,
  texto,
}: {
  titulo: string;
  descricao: string;
  valor: number | null;
  minimo: number;
  max?: number;
  texto?: string;
}) {
  return (
    <MedidorLimite
      titulo={titulo}
      descricao={descricao}
      valor={valor}
      max={max}
      faixas={faixasMinimo(minimo, max)}
      situacao={valor === null ? "ok" : situacaoMinimo(valor, minimo)}
      texto={
        texto ??
        (valor !== null && valor >= minimo
          ? `Obedeceu o limite mínimo de ${pct(minimo)} da receita`
          : `Não obedeceu o limite mínimo de ${pct(minimo)} da receita`)
      }
    />
  );
}

export async function SaudeWidget({ ano, municipio }: MunicipioPanelProps) {
  const data = await getApi<Sumario>("Saude/GetSumario", ano, municipio);
  return (
    <MedidorMinimo
      titulo="Saúde"
      descricao="A Constituição Federal estabelece que o município deve aplicar o limite mínimo de 15% da soma dos recursos de impostos e transferências em ações e serviços públicos de saúde."
      valor={toNumber(data?.aplicacaoPercentual)}
      minimo={15}
    />
  );
}

export async function EducacaoWidget({ ano, municipio }: MunicipioPanelProps) {
  const data = await getApi<SumarioEducacao>("Educacao/GetSumario", ano, municipio);
  return (
    <MedidorMinimo
      titulo="Educação"
      descricao="A Constituição Federal estabelece que o município deve aplicar o limite mínimo de 25% da receita resultante de impostos, incluídas transferências de impostos, para a manutenção e desenvolvimento do ensino."
      valor={toNumber(data?.aplicacaoPercentual)}
      minimo={25}
    />
  );
}

export async function FundebWidget({ ano, municipio }: MunicipioPanelProps) {
  const data = await getApi<SumarioEducacao>("Educacao/GetSumario", ano, municipio);
  const valor = toNumber(data?.aplicacaoPercentualMagisterio);
  const minimo = Number(ano) >= 2021 ? 70 : 60;
  const recebido = toNumber(data?.receitaArrecadadaFUNDEBComputada ?? data?.receitaArrecadadaFUNDEB);
  const destinado = valor !== null && recebido !== null ? (recebido * valor) / 100 : null;
  const cumpriu = valor !== null && valor >= minimo;
  return (
    <MedidorMinimo
      titulo="Fundeb - Profissionais Educação Básica"
      descricao={`O município deve destinar no mínimo ${minimo}% dos recursos recebidos do FUNDEB ao pagamento da remuneração dos profissionais da educação básica em efetivo exercício.`}
      valor={valor}
      minimo={minimo}
      max={100}
      texto={
        recebido !== null && destinado !== null
          ? `Dos R$ ${formatMoneyKMB(recebido)} recebidos do FUNDEB , destinou R$ ${formatMoneyKMB(destinado)} a profissionais da educação básica, ${cumpriu ? "obedecendo" : "não obedecendo"} o limite mínimo de ${minimo}%`
          : undefined
      }
    />
  );
}

function MedidorPessoal({
  titulo,
  descricao,
  valor,
  alerta,
  prudencial,
  maximo,
}: {
  titulo: string;
  descricao: string;
  valor: number | null;
  alerta: number;
  prudencial: number;
  maximo: number;
}) {
  const escala = escalaLimiteMaximo(maximo, valor ?? maximo);
  return (
    <MedidorLimite
      titulo={titulo}
      descricao={descricao}
      valor={valor}
      min={escala.min}
      max={escala.max}
      faixas={faixasPessoal(alerta, prudencial, maximo, escala.max)}
      situacao={valor === null ? "ok" : situacaoMaximo(valor, alerta, maximo)}
      texto={
        valor !== null && valor < maximo
          ? `Obedeceu ao limite de ${pct(maximo)} da RCL`
          : `Não obedeceu ao limite de ${pct(maximo)} da RCL`
      }
    />
  );
}

export async function PessoalConsolidadoWidget({ ano, municipio }: MunicipioPanelProps) {
  const data = await getApi<SumarioPessoal>("PessoalConsolidado/GetSumario", ano, municipio);
  return (
    <MedidorPessoal
      titulo="Pessoal - Consolidado"
      descricao="De acordo com a LRF (Lei de Responsabilidade Fiscal) as despesas com pessoal nos municípios não podem ultrapassar 60% da RCL (Receita Corrente Líquida) do Município. Caso esses gastos atinjam 57% da RCL o município entra no limite prudencial. Caso esses gastos atinjam 54% da RCL o Tribunal de Contas emitirá parecer de alerta."
      valor={toNumber(data?.valorPercentual)}
      alerta={54}
      prudencial={57}
      maximo={60}
    />
  );
}

export async function PessoalExecutivoWidget({ ano, municipio }: MunicipioPanelProps) {
  const data = await getApi<SumarioPessoal>("PessoalExecutivo/GetSumario", ano, municipio);
  return (
    <MedidorPessoal
      titulo="Pessoal - Executivo"
      descricao="De acordo com a LRF (Lei de Responsabilidade Fiscal) as despesas com pessoal do Poder Executivo não podem ultrapassar 54% da RCL (Receita Corrente Líquida) do Município. Caso esses gastos atinjam 51,3% da RCL o município entra no limite prudencial. Caso esses gastos atinjam 48,6% da RCL o Tribunal de Contas emitirá parecer de alerta."
      valor={toNumber(data?.valorPercentual)}
      alerta={48.6}
      prudencial={51.3}
      maximo={54}
    />
  );
}

export async function PessoalLegislativoWidget({ ano, municipio }: MunicipioPanelProps) {
  const data = await getApi<SumarioPessoal>("PessoalLegislativo/GetSumario", ano, municipio);
  return (
    <MedidorPessoal
      titulo="Pessoal - Legislativo"
      descricao="De acordo com a LRF (Lei de Responsabilidade Fiscal) as despesas com pessoal do Poder Legislativo não podem ultrapassar 6% da RCL (Receita Corrente Líquida) do Município. Caso esses gastos atinjam 5,4% da RCL o Tribunal de Contas emitirá parecer de alerta. Caso esses gastos atinjam 5,7% da RCL o município entra no limite prudencial."
      valor={toNumber(data?.valorPercentual)}
      alerta={5.4}
      prudencial={5.7}
      maximo={6}
    />
  );
}

export async function DespesaReceitaCorrentesWidget({ ano, municipio }: MunicipioPanelProps) {
  const data = await getApi<{ valorAlerta?: number; valorApurado?: string | number; valorMaximo?: number }>(
    "LimiteDespesaReceita/GetLimiteDespesaReceita",
    ano,
    municipio
  );
  const valor = toNumber(data?.valorApurado);
  const alerta = toNumber(data?.valorAlerta) ?? 85;
  const maximo = toNumber(data?.valorMaximo) ?? 95;
  const escala = escalaLimiteMaximo(maximo, valor ?? maximo);
  return (
    <MedidorLimite
      titulo="Desp. x receitas correntes"
      descricao="As despesas correntes não devem superar 95% das receitas correntes. Mesmo não atingindo essa relação, caso as despesas correntes superem 85% das receitas correntes, o mecanismo de ajuste fiscal já pode ser adotado (art. 167-A da Constituição Federal de 1988)."
      valor={valor}
      min={escala.min}
      max={escala.max}
      faixas={[
        { ate: alerta, cor: COR_MEDIDOR.ok, rotulo: pct(alerta) },
        { ate: maximo, cor: COR_MEDIDOR.atencao, rotulo: pct(maximo) },
        { ate: escala.max, cor: COR_MEDIDOR.ruim },
      ]}
      situacao={valor === null ? "ok" : situacaoMaximo(valor, alerta, maximo)}
      texto={
        valor !== null && valor > alerta
          ? `Despesas correntes superam ${pct(alerta)} das receitas correntes`
          : `Despesas correntes não superam ${pct(alerta)} das receitas correntes`
      }
    />
  );
}

export async function DividaConsolidadaLiquidaWidget({ ano, municipio }: MunicipioPanelProps) {
  const data = await getApi<{ valores?: { valorPercentual?: number } }>(
    "Endividamento/GetDividaConsolidadaLiquidaAnual",
    ano,
    municipio
  );
  const valor = toNumber(data?.valores?.valorPercentual);
  const alerta = 108;
  const maximo = 120;
  const max = Math.max(maximo * 1.1, valor ?? 0);
  const min = Math.min(-maximo * 0.55, (valor ?? 0) * 1.1);
  return (
    <MedidorLimite
      titulo="Dívida Consolidada Líquida"
      descricao="A dívida consolidada líquida do município não pode ultrapassar 120% da RCL (Receita Corrente Líquida). Caso atinja 108% da RCL o Tribunal de Contas emitirá parecer de alerta."
      valor={valor}
      min={min}
      max={max}
      faixas={[
        { ate: 0, cor: COR_MEDIDOR.muitoPositivo, rotulo: "0%" },
        { ate: alerta, cor: COR_MEDIDOR.ok, rotulo: pct(alerta) },
        { ate: maximo, cor: COR_MEDIDOR.alerta, rotulo: pct(maximo) },
        { ate: max, cor: COR_MEDIDOR.ruim },
      ]}
      situacao={valor === null ? "ok" : situacaoMaximo(valor, alerta, maximo)}
      texto={
        valor !== null && valor >= maximo
          ? `Não obedeceu ao limite de ${pct(maximo)} da RCL`
          : `Tende a obedecer ao limite de ${pct(maximo)} da RCL`
      }
    />
  );
}
