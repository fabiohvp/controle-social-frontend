import { EstadoPanelProps } from "@/app/estado/[ano]/routes";
import MedidorLimite, { COR_MEDIDOR } from "@/components/gestao-fiscal/_comum/MedidorLimite";
import {
  faixasMinimo,
  faixasPessoal,
  pct,
  situacaoMaximo,
  situacaoMinimo,
  toNumber,
} from "@/components/gestao-fiscal/_comum/medidores";
import { fetchJson } from "@/shared/api";
import { ENV } from "@/shared/env";
import { cache } from "react";

/* Medidores da visão geral do Estado, equivalentes aos "widget-gauge" do site oficial. */

export const ID_ESFERA_ESTADO = 81;

const getApi = cache(async <T,>(rota: string, ano: string) =>
  fetchJson<T>(
    `${ENV.apiUrl}/${rota}?idEsferaAdministrativa=${ID_ESFERA_ESTADO}&anoExercicio=${ano}&v=${ENV.apiVersion}`
  )
);

type Sumario = { aplicacaoPercentual?: number | string; valorPercentual?: number | string };

/** escala do site oficial para o Estado: de 40% a 110% do limite */
function escalaEstado(limite: number, valor: number) {
  const max = Math.max(limite * 1.1, valor);
  return { min: Math.min(max * 0.4, valor * 0.9), max };
}

async function MedidorMinimoEstado({
  ano,
  rota,
  titulo,
  descricao,
  minimo,
}: {
  ano: string;
  rota: string;
  titulo: string;
  descricao: string;
  minimo: number;
}) {
  const data = await getApi<Sumario>(rota, ano);
  const valor = toNumber(data?.aplicacaoPercentual);
  return (
    <MedidorLimite
      titulo={titulo}
      descricao={descricao}
      valor={valor}
      max={70}
      faixas={faixasMinimo(minimo, 70)}
      situacao={valor === null ? "ok" : situacaoMinimo(valor, minimo)}
      nomeMedidor="Limite Constitucional"
    />
  );
}

export const SaudeEstadoWidget = ({ ano }: EstadoPanelProps) => (
  <MedidorMinimoEstado
    ano={ano}
    rota="EstadoControllers/Saude/GetSumario"
    titulo="Saúde"
    descricao="A Constituição Federal estabelece que o Estado deve aplicar o limite mínimo de 12% da receita de impostos e transferências em ações e serviços públicos de saúde."
    minimo={12}
  />
);

export const EducacaoEstadoWidget = ({ ano }: EstadoPanelProps) => (
  <MedidorMinimoEstado
    ano={ano}
    rota="EstadoControllers/Educacao/GetSumario"
    titulo="Educação"
    descricao="A Constituição Federal estabelece que o Estado deve aplicar o limite mínimo de 25% da receita resultante de impostos, incluídas transferências, na manutenção e desenvolvimento do ensino."
    minimo={25}
  />
);

const PODERES = {
  consolidado: { rota: "PessoalConsolidado", titulo: "Pessoal - Consolidado", limite: 60, nome: "do Estado" },
  executivo: { rota: "PessoalExecutivo", titulo: "Pessoal - Executivo", limite: 49, nome: "do Poder Executivo" },
  judiciario: { rota: "PessoalJudiciario", titulo: "Pessoal - Judiciário", limite: 6, nome: "do Poder Judiciário" },
  assembleia: { rota: "PessoalLegislativo", titulo: "Pessoal - Assembleia Legislativa", limite: 1.7, nome: "da Assembleia Legislativa" },
  ministerioPublico: { rota: "PessoalMinisterioPublico", titulo: "Pessoal - Ministério Público", limite: 2, nome: "do Ministério Público" },
  tribunalDeContas: { rota: "PessoalTribunalDeContas", titulo: "Pessoal - Tribunal de Contas", limite: 1.3, nome: "do Tribunal de Contas" },
} as const;

/** alerta = 90% e prudencial = 95% do limite máximo (LRF, arts. 22 e 59) */
async function MedidorPessoalEstado({ ano, poder }: { ano: string; poder: keyof typeof PODERES }) {
  const { rota, titulo, limite, nome } = PODERES[poder];
  const data = await getApi<Sumario>(`EstadoControllers/${rota}/GetSumario`, ano);
  const valor = toNumber(data?.valorPercentual);
  const alerta = +(limite * 0.9).toFixed(2);
  const prudencial = +(limite * 0.95).toFixed(2);
  const escala = escalaEstado(limite, valor ?? limite);
  return (
    <MedidorLimite
      titulo={titulo}
      descricao={`De acordo com a LRF (Lei de Responsabilidade Fiscal) as despesas com pessoal ${nome} não podem ultrapassar ${pct(limite)} da RCL (Receita Corrente Líquida). Caso esses gastos atinjam ${pct(prudencial)} da RCL entra-se no limite prudencial. Caso atinjam ${pct(alerta)} da RCL o Tribunal de Contas emitirá parecer de alerta.`}
      valor={valor}
      min={escala.min}
      max={escala.max}
      faixas={faixasPessoal(alerta, prudencial, limite, escala.max)}
      situacao={valor === null ? "ok" : situacaoMaximo(valor, alerta, limite)}
      nomeMedidor="Limite LRF"
    />
  );
}

export const PessoalConsolidadoEstadoWidget = ({ ano }: EstadoPanelProps) => <MedidorPessoalEstado ano={ano} poder="consolidado" />;
export const PessoalExecutivoEstadoWidget = ({ ano }: EstadoPanelProps) => <MedidorPessoalEstado ano={ano} poder="executivo" />;
export const PessoalJudiciarioEstadoWidget = ({ ano }: EstadoPanelProps) => <MedidorPessoalEstado ano={ano} poder="judiciario" />;
export const PessoalAssembleiaEstadoWidget = ({ ano }: EstadoPanelProps) => <MedidorPessoalEstado ano={ano} poder="assembleia" />;
export const PessoalMinisterioPublicoEstadoWidget = ({ ano }: EstadoPanelProps) => <MedidorPessoalEstado ano={ano} poder="ministerioPublico" />;
export const PessoalTribunalDeContasEstadoWidget = ({ ano }: EstadoPanelProps) => <MedidorPessoalEstado ano={ano} poder="tribunalDeContas" />;

export async function DespesaReceitaCorrentesEstadoWidget({ ano }: EstadoPanelProps) {
  const data = await getApi<{ valorAlerta?: number; valorApurado?: string | number; valorMaximo?: number }>(
    "MunicipioControllers/LimiteDespesaReceita/GetLimiteDespesaReceita",
    ano
  );
  const valor = toNumber(data?.valorApurado);
  const alerta = toNumber(data?.valorAlerta) ?? 85;
  const maximo = toNumber(data?.valorMaximo) ?? 95;
  const max = Math.max(maximo * 1.1, valor ?? 0);
  const min = Math.min(maximo * 0.55, (valor ?? maximo) * 0.7);
  return (
    <MedidorLimite
      titulo="Desp. x receitas correntes"
      descricao="As despesas correntes não devem superar 95% das receitas correntes. Mesmo não atingindo essa relação, caso as despesas correntes superem 85% das receitas correntes, o mecanismo de ajuste fiscal já pode ser adotado (art. 167-A da Constituição Federal de 1988)."
      valor={valor}
      min={min}
      max={max}
      faixas={[
        { ate: alerta, cor: COR_MEDIDOR.ok, rotulo: pct(alerta) },
        { ate: maximo, cor: COR_MEDIDOR.atencao, rotulo: pct(maximo) },
        { ate: max, cor: COR_MEDIDOR.ruim },
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

export async function DividaConsolidadaLiquidaEstadoWidget({ ano }: EstadoPanelProps) {
  const data = await getApi<{ valores?: { valorPercentual?: number } }>(
    "EstadoControllers/Endividamento/GetDividaConsolidadaLiquidaAnual",
    ano
  );
  const valor = toNumber(data?.valores?.valorPercentual);
  const alerta = 180;
  const maximo = 200;
  const max = Math.max(maximo * 1.1, valor ?? 0);
  const min = Math.min(0, (valor ?? 0) * 1.2);
  return (
    <MedidorLimite
      titulo="Dívida Consolidada Líquida"
      descricao="A dívida consolidada líquida do Estado não pode ultrapassar 200% da RCL (Receita Corrente Líquida), conforme Resolução do Senado Federal nº 40/2001. Caso atinja 180% da RCL o Tribunal de Contas emitirá parecer de alerta."
      valor={valor}
      min={min}
      max={max}
      faixas={[
        { ate: alerta, cor: COR_MEDIDOR.ok, rotulo: pct(alerta) },
        { ate: maximo, cor: COR_MEDIDOR.alerta, rotulo: pct(maximo) },
        { ate: max, cor: COR_MEDIDOR.ruim },
      ]}
      situacao={valor === null ? "ok" : situacaoMaximo(valor, alerta, maximo)}
      texto={
        valor !== null && valor >= maximo
          ? `Não obedeceu ao limite de ${pct(maximo)} da RCL`
          : `Obedeceu ao limite de ${pct(maximo)} da RCL`
      }
    />
  );
}
