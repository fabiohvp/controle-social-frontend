import { formatFloat } from "@/formatters/number";
import { MESES_ABREVIADOS } from "./previdenciaApi";

type Valores = {
  devido: number;
  liquidada: number;
  paga: number;
  diferencaPaga: number;
};

export type ContribuicoesApi = {
  dados: {
    nomeUnidadeGestoraResponsavel: string;
    operacoes: string[];
    totais: Valores | null;
    valorMes: ({ mesReferencia: number } & Valores)[];
  }[];
  totais: { devido: number; liquidada: number; paga: number; diferenca: number };
  totalGeral: ({ mesReferencia: number } & Omit<Valores, "diferencaPaga"> & {
      diferenca: number;
    })[];
};

const OPERACOES = [
  "A) Valor devido (Folha)",
  "B) Valor liquidado (PCM)",
  "C) Valor pago",
  "D) Diferença C-A",
];

type Linha = {
  orgao: string;
  operacoes: string[];
  /** [devido, liquidada, paga, diferença] por mês (1..12) */
  meses: Record<number, number[]>;
  total: number[];
  isTotal?: boolean;
};

function getLinhas(dados: ContribuicoesApi): Linha[] {
  const linhas: Linha[] = [...dados.dados]
    .sort((a, b) =>
      b.nomeUnidadeGestoraResponsavel.localeCompare(a.nomeUnidadeGestoraResponsavel)
    )
    .map((linha) => ({
      orgao: linha.nomeUnidadeGestoraResponsavel,
      operacoes: linha.operacoes,
      meses: Object.fromEntries(
        linha.valorMes.map((mes) => [
          mes.mesReferencia,
          [mes.devido, mes.liquidada, mes.paga, mes.diferencaPaga],
        ])
      ),
      total: linha.totais
        ? [
            linha.totais.devido,
            linha.totais.liquidada,
            linha.totais.paga,
            linha.totais.diferencaPaga,
          ]
        : [],
    }));

  linhas.push({
    orgao: "Total",
    operacoes: OPERACOES,
    meses: Object.fromEntries(
      dados.totalGeral.map((mes) => [
        mes.mesReferencia,
        [mes.devido, mes.liquidada, mes.paga, mes.diferenca],
      ])
    ),
    total: [
      dados.totais.devido,
      dados.totais.liquidada,
      dados.totais.paga,
      dados.totais.diferenca,
    ],
    isTotal: true,
  });
  return linhas;
}

function Celula({ valores }: { valores: number[] | undefined }) {
  return (
    <td className="px-2 py-1 text-right whitespace-nowrap align-top">
      {(valores?.length ? valores : [0, 0, 0, 0]).map((valor, indice) => (
        <div key={indice}>{formatFloat(valor)}</div>
      ))}
    </td>
  );
}

/** Tabela de contribuições patronais (normais ou suplementares) por órgão e mês */
export default function TabelaContribuicoes({
  dados,
}: {
  dados: ContribuicoesApi | null;
}) {
  if (!dados?.dados?.length) {
    return (
      <p className="py-4 text-center text-gray-light text-sm">
        Informação indisponível
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-300 text-left">
            <th className="px-2 py-1">Órgãos públicos</th>
            <th className="px-2 py-1">Operações</th>
            {MESES_ABREVIADOS.map((mes) => (
              <th key={mes} className="px-2 py-1 text-right">
                {mes}
              </th>
            ))}
            <th className="px-2 py-1 text-right">Total (R$)</th>
          </tr>
        </thead>
        <tbody>
          {getLinhas(dados).map((linha) => (
            <tr
              key={linha.orgao}
              className={`border-b border-gray-200 ${linha.isTotal ? "font-bold" : ""}`}
            >
              <td className="px-2 py-1 align-top">{linha.orgao}</td>
              <td className="px-2 py-1 whitespace-nowrap align-top">
                {linha.operacoes.map((operacao) => (
                  <div key={operacao}>{operacao}</div>
                ))}
              </td>
              {MESES_ABREVIADOS.map((mes, indice) => (
                <Celula key={mes} valores={linha.meses[indice + 1]} />
              ))}
              <Celula valores={linha.total} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
