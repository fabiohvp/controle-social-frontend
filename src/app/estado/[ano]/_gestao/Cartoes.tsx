import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import MedidorLimite, {
  COR_MEDIDOR,
  FaixaMedidor,
  SituacaoMedidor,
} from "@/components/gestao-fiscal/_comum/MedidorLimite";
import {
  faixasMinimo,
  faixasPessoal,
  pct,
  situacaoMaximo,
  situacaoMinimo,
} from "@/components/gestao-fiscal/_comum/medidores";
import SingleSeriesChart from "@/components/charts/SingleSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import SectionTitle from "@/components/panel/SectionTitle";
import { formatFloat, formatInt, formatMoney, formatPercent } from "@/formatters/number";
import { FormatoValor, MultiSerie, SerieItem } from "@/types/Serie";
import { ReactNode } from "react";
import { BarrasHorizontais, DonutValores, ValorMonetario } from "./Graficos";

/*
 * Blocos de layout das páginas de gestão do Estado (#14). Replicam os cards do
 * site oficial (Widget/CardECharts*) usando só os componentes que já existem
 * em `src/components`. Ficam aqui, e não em `src/components/gestao-*`, porque as
 * issues #10/#11 criam os equivalentes de município em paralelo.
 */

type Largura = 3 | 4 | 6 | 8 | 9 | 12;

const COLUNAS: Record<Largura, string> = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  6: "md:col-span-6",
  8: "md:col-span-8",
  9: "md:col-span-9",
  12: "md:col-span-12",
};

export function Pagina({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">{children}</div>
  );
}

export function Secao({ children }: { children: ReactNode }) {
  return <SectionTitle className="md:col-span-12 mt-2">{children}</SectionTitle>;
}

export function Aviso({ children }: { children: ReactNode }) {
  return (
    <p className="bg-blue-50 border border-blue-200 col-span-full md:col-span-12 p-2 rounded-md text-sm">
      {children}
    </p>
  );
}

type CartaoBase = {
  titulo: string;
  descricao?: ReactNode;
  largura?: Largura;
};

export function CartaoValor({
  titulo,
  descricao,
  largura = 4,
  valor,
  ano,
  secundarios,
}: CartaoBase & {
  valor: number | null | undefined;
  ano: number;
  secundarios?: { titulo: string; valor: string }[];
}) {
  return (
    <PanelWithDescription
      className={COLUNAS[largura]}
      titulo={titulo}
      descricao={descricao}
      bodyProps={{ className: "flex-col items-center justify-center min-h-[140px]" }}
    >
      <ValorMonetario valor={valor} ano={ano} />
      {secundarios && (
        <dl className="mt-4 text-sm text-center">
          {secundarios.map((item) => (
            <div key={item.titulo}>
              <dt className="inline text-gray-dark">{item.titulo}: </dt>
              <dd className="inline font-bold">{item.valor}</dd>
            </div>
          ))}
        </dl>
      )}
    </PanelWithDescription>
  );
}

/** Cartão com mais de um valor principal (ex.: despesa corrente e receita corrente) */
export function CartaoValores({
  titulo,
  descricao,
  largura = 4,
  itens,
  ano,
  rodape,
}: CartaoBase & {
  itens: { rotulo: string; valor: number | null | undefined }[];
  ano: number;
  rodape?: ReactNode;
}) {
  return (
    <PanelWithDescription
      className={COLUNAS[largura]}
      titulo={titulo}
      descricao={descricao}
      bodyProps={{ className: "flex-col items-center justify-center min-h-[140px] gap-2" }}
    >
      {itens.map((item) => (
        <div key={item.rotulo} className="text-center">
          <div className="text-gray-dark text-xs">{item.rotulo}</div>
          <ValorMonetario valor={item.valor} ano={ano} />
        </div>
      ))}
      {rodape && <div className="text-center text-xs">{rodape}</div>}
    </PanelWithDescription>
  );
}

/** Gauge "meta fiscal x realizado": percentual atingido da meta da LDO */
export function CartaoMeta({
  titulo,
  descricao,
  largura = 3,
  previsao,
  realizado,
  rotuloRealizado,
}: CartaoBase & {
  previsao: number | null | undefined;
  realizado: number | null | undefined;
  rotuloRealizado: string;
}) {
  const percentual = previsao ? ((realizado ?? 0) / previsao) * 100 : null;
  const atingiu = percentual !== null && percentual >= 100;

  return (
    <PanelWithDescription
      className={COLUNAS[largura]}
      titulo={titulo}
      descricao={descricao}
      bodyProps={{ className: "flex-col items-center justify-center min-h-[140px]" }}
    >
      {percentual === null ? (
        <span className="text-gray-light text-sm">Informação indisponível</span>
      ) : (
        <>
          <span
            className={`font-extrabold text-3xl ${atingiu ? "text-blue-dark" : "text-red-700"}`}
          >
            {formatPercent(percentual)}
          </span>
          <div className="bg-gray-200 h-3 mt-3 relative rounded-full w-full">
            <div
              className={`absolute h-3 left-0 rounded-full ${atingiu ? "bg-blue-dark" : "bg-red-600"}`}
              style={{ width: `${Math.min(100, (percentual / 150) * 100)}%` }}
            />
            <div
              className="absolute bg-black h-5 -top-1 w-0.5"
              style={{ left: `${(100 / 150) * 100}%` }}
              title="Meta: 100%"
            />
          </div>
          <dl className="mt-3 text-center text-xs">
            <div>
              <dt className="inline">Meta fiscal: </dt>
              <dd className="inline font-bold" title={`R$ ${formatFloat(previsao ?? 0)}`}>
                {textoMoeda(previsao)}
              </dd>
            </div>
            <div>
              <dt className="inline">{rotuloRealizado}: </dt>
              <dd className="inline font-bold" title={`R$ ${formatFloat(realizado ?? 0)}`}>
                {textoMoeda(realizado)}
              </dd>
            </div>
          </dl>
        </>
      )}
    </PanelWithDescription>
  );
}

export function CartaoSerie({
  titulo,
  descricao,
  largura = 6,
  dados,
  formato,
  tipo,
  negativoVermelho,
  cor,
}: CartaoBase & {
  dados: SerieItem[] | null | undefined;
  formato?: FormatoValor;
  tipo?: "line" | "bar";
  negativoVermelho?: boolean;
  /** cor da série (padrão #607D8B, como no site oficial) */
  cor?: string;
}) {
  return (
    <PanelWithDescription
      className={COLUNAS[largura]}
      titulo={titulo}
      descricao={descricao}
    >
      <SingleSeriesChart
        dados={dados ?? null}
        formato={formato}
        tipo={tipo}
        negativoVermelho={negativoVermelho}
        cor={cor}
      />
    </PanelWithDescription>
  );
}

export function CartaoMulti({
  titulo,
  descricao,
  largura = 6,
  dados,
  tipos,
  formato,
  corrigirIpca,
  cores,
}: CartaoBase & {
  cores?: string[];
  dados: MultiSerie | null | undefined;
  tipos?: ("line" | "bar")[];
  formato?: FormatoValor;
  /** ver MultiSeriesChart: "categoria" (default p/ anos), um ano (p/ meses) ou false */
  corrigirIpca?: "categoria" | number | false;
}) {
  return (
    <PanelWithDescription
      className={COLUNAS[largura]}
      titulo={titulo}
      descricao={descricao}
    >
      <MultiSeriesChart
        dados={dados ?? null}
        tipos={tipos}
        formato={formato}
        corrigirIpca={corrigirIpca}
        cores={cores}
      />
    </PanelWithDescription>
  );
}

export function CartaoDonut({
  titulo,
  descricao,
  largura = 4,
  dados,
  ano,
}: CartaoBase & {
  dados: { name: string; value: number }[] | null | undefined;
  ano: number;
}) {
  return (
    <PanelWithDescription
      className={COLUNAS[largura]}
      titulo={titulo}
      descricao={descricao}
    >
      <DonutValores dados={dados ?? null} ano={ano} />
    </PanelWithDescription>
  );
}

export function CartaoBarras({
  titulo,
  descricao,
  largura = 4,
  dados,
  ano,
  cores,
}: CartaoBase & {
  dados: { nome: string; valor: number | null }[] | null | undefined;
  ano: number;
  cores?: string[];
}) {
  return (
    <PanelWithDescription
      className={COLUNAS[largura]}
      titulo={titulo}
      descricao={descricao}
    >
      <BarrasHorizontais dados={dados ?? null} ano={ano} cores={cores} />
    </PanelWithDescription>
  );
}

type Limites = {
  /** limite máximo (a despesa/dívida não pode ultrapassar) ou mínimo (a aplicação deve atingir) */
  limite: number;
  tipo: "maximo" | "minimo";
  /** percentuais intermediários (ex.: alerta 90% e prudencial 95% do máximo, na LRF) */
  alerta?: number;
  prudencial?: number;
  /** texto depois do número no limite (ex.: "da RCL") */
  base: string;
  /** substitui "Obedeceu ao limite de" (ex.: "Tende a obedecer ao limite de", na dívida) */
  textoObedece?: string;
};

function getSituacao(percentual: number, limites: Limites) {
  const { limite, tipo, alerta, prudencial, base } = limites;
  if (tipo === "minimo") {
    return percentual >= limite
      ? { texto: `Obedeceu o limite mínimo de ${pct(limite)} ${base}`, cor: "text-green-700", barra: "bg-green-600" }
      : { texto: `Não obedeceu o limite mínimo de ${pct(limite)} ${base}`, cor: "text-red-700", barra: "bg-red-600" };
  }
  if (percentual > limite) {
    return { texto: `Ultrapassou o limite máximo de ${formatFloat(limite)}% ${base}`, cor: "text-red-700", barra: "bg-red-600" };
  }
  if (prudencial !== undefined && percentual >= prudencial) {
    return { texto: `Ultrapassou o limite prudencial de ${formatFloat(prudencial)}% ${base}`, cor: "text-orange-600", barra: "bg-orange-500" };
  }
  if (alerta !== undefined && percentual >= alerta) {
    return { texto: `Ultrapassou o limite de alerta de ${formatFloat(alerta)}% ${base}`, cor: "text-yellow-600", barra: "bg-yellow-500" };
  }
  return { texto: `${limites.textoObedece ?? "Obedeceu ao limite de"} ${pct(limite)} ${base}`, cor: "text-blue-dark", barra: "bg-blue-dark" };
}

/**
 * Cartão "Limite da LRF/constitucional" (o gauge do site oficial): percentual
 * apurado, barra com a posição do limite e a situação.
 */
export function CartaoLimite({
  titulo,
  descricao,
  largura = 4,
  percentual,
  corAlerta,
  ...limites
}: CartaoBase &
  Limites & {
    percentual: number | null | undefined;
    /** cor da faixa entre alerta e limite quando não há prudencial (padrão: amarelo) */
    corAlerta?: string;
  }) {
  const temDado = percentual !== null && percentual !== undefined && !Number.isNaN(percentual);
  const valor = temDado ? (percentual as number) : null;
  const { limite, tipo, alerta, prudencial } = limites;

  let min = 0;
  let max: number;
  let faixas: FaixaMedidor[];
  let situacao: SituacaoMedidor;

  if (tipo === "minimo") {
    // site oficial: escala de 0 a 70% (ou 100% para limites altos, como o FUNDEB)
    max = Math.max(limite >= 50 ? 100 : 70, valor ?? 0);
    faixas = faixasMinimo(limite, max);
    situacao = valor === null ? "ok" : situacaoMinimo(valor, limite);
  } else {
    // site oficial: escala de 40% a 110% do limite máximo (70% do valor, se menor)
    max = Math.max(limite * 1.1, valor ?? 0);
    min = Math.min(max * 0.4, Math.max(valor ?? max, 0) * 0.7, valor ?? 0);
    if (alerta !== undefined && prudencial !== undefined) {
      faixas = faixasPessoal(alerta, prudencial, limite, max);
    } else if (alerta !== undefined) {
      faixas = [
        { ate: alerta, cor: COR_MEDIDOR.ok, rotulo: pct(alerta) },
        { ate: limite, cor: corAlerta ?? COR_MEDIDOR.atencao, rotulo: pct(limite) },
        { ate: max, cor: COR_MEDIDOR.ruim },
      ];
    } else {
      faixas = [
        { ate: limite, cor: COR_MEDIDOR.ok, rotulo: pct(limite) },
        { ate: max, cor: COR_MEDIDOR.ruim },
      ];
    }
    if (min < 0) faixas = [{ ate: 0, cor: COR_MEDIDOR.muitoPositivo, rotulo: "0%" }, ...faixas];
    situacao = valor === null ? "ok" : situacaoMaximo(valor, alerta ?? limite, limite);
  }

  return (
    <MedidorLimite
      className={COLUNAS[largura]}
      titulo={titulo}
      descricao={descricao}
      valor={valor}
      min={min}
      max={max}
      faixas={faixas}
      situacao={situacao}
      texto={valor === null ? undefined : getSituacao(valor, limites).texto}
    />
  );
}

/** "R$ 1.234,56" para valores secundários (per capita etc.) */
export const textoMoeda = (valor: number | null | undefined) =>
  valor === null || valor === undefined ? "-" : `R$ ${formatMoney(valor)}`;
export const textoInteiro = (valor: number | null | undefined) =>
  valor === null || valor === undefined ? "-" : formatInt(valor);
