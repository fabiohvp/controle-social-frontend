"use client";
import { COLOR } from "@/theme/colors";
import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaCheckCircle,
  FaExclamationCircle,
  FaHandPaper,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaSort,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";
import {
  CelulaIndicador,
  ColunaIndicador,
  IconeIndicador,
  LinhaIndicador,
  TabelaIndicadorDados,
} from "./tabelaTipos";

const ICONES: Record<IconeIndicador, (props: { color?: string; size?: number }) => ReactNode> = {
  polegarCima: (p) => <FaRegThumbsUp {...p} />,
  polegarBaixo: (p) => <FaRegThumbsDown {...p} />,
  mao: (p) => <FaHandPaper {...p} />,
  check: (p) => <FaCheckCircle {...p} />,
  alerta: (p) => <FaExclamationCircle {...p} />,
  setaCima: (p) => <FaArrowCircleUp {...p} />,
  setaBaixo: (p) => <FaArrowCircleDown {...p} />,
};

const DUAS_CASAS = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const ATE_DUAS_CASAS = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });

/** "79,10M", "2,44K", "146,36" (mesmo formato das tabelas do site oficial) */
export function formatarMoedaIndicador(valor: number) {
  const abs = Math.abs(valor);
  const sinal = valor < 0 ? "-" : "";
  for (const [base, sufixo] of [
    [1e12, "T"],
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"],
  ] as const) {
    if (abs >= base) return `${sinal}${DUAS_CASAS.format(abs / base)}${sufixo}`;
  }
  return `${sinal}${DUAS_CASAS.format(abs)}`;
}

function formatar(celula: CelulaIndicador, coluna: ColunaIndicador) {
  const { v } = celula;
  if (v === null || v === undefined || v === "") return "-";
  if (typeof v === "string") return v + (celula.sufixo ?? "");
  switch (coluna.formato) {
    case "moeda":
      return formatarMoedaIndicador(v);
    case "percentual":
      return `${ATE_DUAS_CASAS.format(v)}%`;
    case "decimal":
      return DUAS_CASAS.format(v);
    case "inteiro":
      return Math.round(v).toLocaleString("pt-BR");
    default:
      return String(v) + (celula.sufixo ?? "");
  }
}

function valorOrdenacao(celula: CelulaIndicador | undefined) {
  const v = celula?.v;
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number") return v;
  // notas: A > B+ > B > C+ > C ...
  return celula?.barra ?? v;
}

type Ordem = { chave: string; direcao: "asc" | "desc" };

export default function TabelaIndicador({ dados }: { dados: TabelaIndicadorDados }) {
  const { colunas, grupos, linhas, nota } = dados;
  const [ordem, setOrdem] = useState<Ordem>();

  const maximos = useMemo(() => {
    const m: Record<string, number> = {};
    for (const coluna of colunas) {
      if (!coluna.barra) continue;
      m[coluna.chave] = Math.max(
        0,
        ...linhas.map((l) => {
          const v = l.celulas[coluna.chave]?.v;
          return typeof v === "number" ? Math.abs(v) : 0;
        })
      );
    }
    return m;
  }, [colunas, linhas]);

  const ordenadas = useMemo(() => {
    if (!ordem) return linhas;
    const fator = ordem.direcao === "asc" ? 1 : -1;
    return [...linhas].sort((a, b) => {
      const va = ordem.chave === "__municipio" ? a.municipio : valorOrdenacao(a.celulas[ordem.chave]);
      const vb = ordem.chave === "__municipio" ? b.municipio : valorOrdenacao(b.celulas[ordem.chave]);
      if (va === null) return 1;
      if (vb === null) return -1;
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * fator;
      return String(va).localeCompare(String(vb), "pt-BR") * fator;
    });
  }, [linhas, ordem]);

  function ordenar(chave: string) {
    setOrdem((atual) =>
      atual?.chave === chave
        ? { chave, direcao: atual.direcao === "asc" ? "desc" : "asc" }
        : { chave, direcao: "desc" }
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="max-h-[75vh] overflow-auto rounded border border-gray-200 bg-white">
        <table className="w-full border-collapse text-sm text-[#495057]">
          <thead className="sticky top-0 z-[1] bg-gray-header">
            {grupos && (
              <tr>
                {grupos.map((g, i) => (
                  <th
                    key={i}
                    colSpan={g.span}
                    className={`px-2 py-1 text-right font-semibold ${g.titulo ? "border-b-2 border-gray-light" : ""}`}
                  >
                    {g.titulo}
                  </th>
                ))}
              </tr>
            )}
            <tr>
              <Cabecalho chave="__municipio" titulo="Municípios" ordem={ordem} onOrdenar={ordenar} />
              {colunas.map((c) => (
                <Cabecalho
                  key={c.chave}
                  chave={c.chave}
                  titulo={c.titulo}
                  alinhar={c.alinhar}
                  ordem={ordem}
                  onOrdenar={ordenar}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {ordenadas.map((linha) => (
              <Linha key={linha.chave} linha={linha} colunas={colunas} maximos={maximos} />
            ))}
          </tbody>
        </table>
      </div>
      {nota && <p className="text-xs text-gray-medium">{nota}</p>}
    </div>
  );
}

function Cabecalho({
  chave,
  titulo,
  alinhar,
  ordem,
  onOrdenar,
}: {
  chave: string;
  titulo: string;
  alinhar?: string;
  ordem?: Ordem;
  onOrdenar: (chave: string) => void;
}) {
  const ativo = ordem?.chave === chave;
  return (
    <th
      scope="col"
      aria-sort={ativo ? (ordem!.direcao === "asc" ? "ascending" : "descending") : undefined}
      className={`border-b px-2 py-2 font-semibold whitespace-nowrap ${alinhar === "left" ? "text-left" : "text-right"}`}
    >
      <button type="button" className="inline-flex items-center gap-1" onClick={() => onOrdenar(chave)}>
        {titulo}
        {!ativo ? (
          <FaSort aria-hidden className="text-xs opacity-40" />
        ) : ordem!.direcao === "asc" ? (
          <FaSortUp aria-hidden className="text-xs" />
        ) : (
          <FaSortDown aria-hidden className="text-xs" />
        )}
      </button>
    </th>
  );
}

function Linha({
  linha,
  colunas,
  maximos,
}: {
  linha: LinhaIndicador;
  colunas: ColunaIndicador[];
  maximos: Record<string, number>;
}) {
  return (
    <tr className="border-b hover:bg-gray-header">
      <td className="px-2 py-2 text-right font-semibold whitespace-nowrap">{linha.municipio}</td>
      {colunas.map((coluna) => {
        const celula = linha.celulas[coluna.chave] ?? { v: null };
        const largura =
          celula.barra !== undefined && celula.barra !== null
            ? celula.barra
            : coluna.barra && typeof celula.v === "number" && maximos[coluna.chave]
              ? Math.abs(celula.v) / maximos[coluna.chave]
              : null;
        const conteudo = (
          <span className="inline-flex items-center gap-1">
            {celula.icone && ICONES[celula.icone]({ color: celula.corIcone ?? COLOR.padraoNivel6, size: 14 })}
            {celula.icone && (celula.icone === "check" || celula.icone === "alerta") && celula.v === null
              ? null
              : formatar(celula, coluna)}
          </span>
        );
        return (
          <td
            key={coluna.chave}
            title={celula.titulo}
            className={`px-2 py-2 whitespace-nowrap ${coluna.alinhar === "center" ? "text-center" : coluna.alinhar === "left" ? "text-left" : "text-right"}`}
          >
            {celula.link ? (
              <Link href={celula.link} className="no-underline">
                {conteudo}
              </Link>
            ) : (
              conteudo
            )}
            {largura !== null && (
              <div
                aria-hidden
                className="ml-auto h-[10px]"
                style={{ width: `${Math.round(largura * 100)}px`, maxWidth: 100, backgroundColor: COLOR.receita }}
              />
            )}
          </td>
        );
      })}
    </tr>
  );
}
