"use client";
import { useMemo, useState } from "react";
import { formatarNotaIegm } from "../iegm";

export type LinhaIegm = {
  municipio: string;
  iIEGM: string;
  iEduc: string;
  iSaude: string;
  iPlanejamento: string;
  iFiscal: string;
  iAmb: string;
  iCidade: string;
  iGovTI: string;
};

const COLUNAS: { chave: keyof LinhaIegm; titulo: string }[] = [
  { chave: "municipio", titulo: "Município" },
  { chave: "iIEGM", titulo: "IEGM" },
  { chave: "iEduc", titulo: "i-Educ" },
  { chave: "iSaude", titulo: "i-Saúde" },
  { chave: "iPlanejamento", titulo: "i-Planejamento" },
  { chave: "iFiscal", titulo: "i-Fiscal" },
  { chave: "iAmb", titulo: "i-Amb" },
  { chave: "iCidade", titulo: "i-Cidade" },
  { chave: "iGovTI", titulo: "i-GovTI" },
];

export default function TabelaIegm({ linhas }: { linhas: LinhaIegm[] }) {
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState<{ chave: keyof LinhaIegm; asc: boolean }>({
    chave: "municipio",
    asc: true,
  });

  const exibidas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return linhas
      .filter((l) => !termo || l.municipio.toLowerCase().includes(termo))
      .sort((a, b) => {
        const cmp = String(a[ordem.chave]).localeCompare(String(b[ordem.chave]));
        return ordem.asc ? cmp : -cmp;
      });
  }, [linhas, busca, ordem]);

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-end">
        <input
          aria-label="Buscar município"
          className="rounded border border-gray-300 px-2 py-1 text-sm"
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Busca"
          type="search"
          value={busca}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr className="border-b">
              {COLUNAS.map((c) => (
                <th className="p-2" key={c.chave}>
                  <button
                    onClick={() =>
                      setOrdem((o) => ({
                        chave: c.chave,
                        asc: o.chave === c.chave ? !o.asc : true,
                      }))
                    }
                    type="button"
                  >
                    {c.titulo}
                    {ordem.chave === c.chave && (ordem.asc ? " ▲" : " ▼")}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exibidas.map((l) => (
              <tr className="border-b odd:bg-gray-50" key={l.municipio}>
                {COLUNAS.map((c) => (
                  <td className="p-2" key={c.chave}>
                    {c.chave === "municipio"
                      ? l.municipio
                      : formatarNotaIegm(l[c.chave])}
                  </td>
                ))}
              </tr>
            ))}
            {!exibidas.length && (
              <tr>
                <td className="p-2" colSpan={COLUNAS.length}>
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
