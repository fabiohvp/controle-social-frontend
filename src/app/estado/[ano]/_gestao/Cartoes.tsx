import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
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
}: CartaoBase & {
  dados: SerieItem[] | null | undefined;
  formato?: FormatoValor;
  tipo?: "line" | "bar";
  negativoVermelho?: boolean;
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
}: CartaoBase & {
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
};

function getSituacao(percentual: number, limites: Limites) {
  const { limite, tipo, alerta, prudencial, base } = limites;
  if (tipo === "minimo") {
    return percentual >= limite
      ? { texto: `Obedeceu ao limite mínimo de ${formatFloat(limite)}% ${base}`, cor: "text-green-700", barra: "bg-green-600" }
      : { texto: `Não obedeceu ao limite mínimo de ${formatFloat(limite)}% ${base}`, cor: "text-red-700", barra: "bg-red-600" };
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
  return { texto: `Obedeceu ao limite de ${formatFloat(limite)}% ${base}`, cor: "text-blue-dark", barra: "bg-blue-dark" };
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
  ...limites
}: CartaoBase & Limites & { percentual: number | null | undefined }) {
  const temDado = percentual !== null && percentual !== undefined;
  const topo = Math.max(limites.limite * 1.2, temDado ? percentual * 1.05 : 0, 1);
  const posicao = (valor: number) => `${Math.min(100, Math.max(0, (valor / topo) * 100))}%`;
  const situacao = temDado ? getSituacao(percentual, limites) : null;

  return (
    <PanelWithDescription
      className={COLUNAS[largura]}
      titulo={titulo}
      descricao={descricao}
      bodyProps={{ className: "flex-col items-center justify-center min-h-[140px]" }}
    >
      {temDado && situacao ? (
        <>
          <span className={`font-extrabold text-3xl ${situacao.cor}`}>
            {formatPercent(percentual)}
          </span>
          <div className="bg-gray-200 h-3 mt-3 relative rounded-full w-full">
            <div
              className={`absolute h-3 left-0 rounded-full ${situacao.barra}`}
              style={{ width: posicao(Math.max(percentual, 0)) }}
            />
            <div
              className="absolute bg-black h-5 -top-1 w-0.5"
              style={{ left: posicao(limites.limite) }}
              title={`Limite: ${formatFloat(limites.limite)}%`}
            />
          </div>
          <span className="mt-2 text-center text-xs">{situacao.texto}</span>
        </>
      ) : (
        <span className="text-gray-light text-sm">Informação indisponível</span>
      )}
    </PanelWithDescription>
  );
}

/** "R$ 1.234,56" para valores secundários (per capita etc.) */
export const textoMoeda = (valor: number | null | undefined) =>
  valor === null || valor === undefined ? "-" : `R$ ${formatMoney(valor)}`;
export const textoInteiro = (valor: number | null | undefined) =>
  valor === null || valor === undefined ? "-" : formatInt(valor);
