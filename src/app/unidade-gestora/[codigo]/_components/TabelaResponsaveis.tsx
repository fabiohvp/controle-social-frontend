"use client";
import { useState, useMemo } from "react";
import Input from "@/components/inputs/Input";

export type Responsavel = {
  inicioVigencia: string;
  fimVigencia: string;
  papel: string;
  nome: string;
  cpf: string;
};

export default function TabelaResponsaveis({
  responsaveis,
}: {
  responsaveis: Responsavel[];
}) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    if (!busca.trim()) return responsaveis;
    const termo = busca.toLowerCase();
    return responsaveis.filter(
      (r) =>
        r.nome?.toLowerCase().includes(termo) ||
        r.papel?.toLowerCase().includes(termo) ||
        r.cpf?.includes(termo)
    );
  }, [responsaveis, busca]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-blue-dark">
          Quadro de Responsáveis ({filtrados.length})
        </h2>
        <Input
          type="text"
          placeholder="Buscar por nome, papel ou CPF..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-72 text-sm"
        />
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="table w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-left">
              <th className="p-3 font-semibold">Papel / Função</th>
              <th className="p-3 font-semibold">Nome</th>
              <th className="p-3 font-semibold">Início Vigência</th>
              <th className="p-3 font-semibold">Fim Vigência</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-medium">
                  Nenhum responsável encontrado.
                </td>
              </tr>
            ) : (
              filtrados.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-dark">
                    {item.papel}
                  </td>
                  <td className="p-3 text-blue-dark">{item.nome}</td>
                  <td className="p-3">{item.inicioVigencia}</td>
                  <td className="p-3">{item.fimVigencia}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
