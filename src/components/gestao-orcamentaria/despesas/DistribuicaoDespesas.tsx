"use client";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { useState } from "react";
import TreemapChart, { TreemapNo } from "../_shared/TreemapChart";

const ABAS = ["Função e Subfunção", "Natureza"];

/** `CardTreemaps$1` do site oficial: treemap das despesas liquidadas, com abas */
export default function DistribuicaoDespesas({
  funcional,
  natureza,
}: {
  funcional: TreemapNo[] | null;
  natureza: TreemapNo[] | null;
}) {
  const [aba, setAba] = useState(0);

  return (
    <PanelWithDescription
      className="lg:col-span-6"
      titulo="Distribuição das despesas liquidadas por:"
      descricao="Representa de forma espacial a distribuição do valores das despesas liquidadas por função, subfunção e natureza. Cada retângulo tem área proporcional ao valor do dado."
    >
      <div role="tablist" className="mb-2 flex gap-2">
        {ABAS.map((nome, indice) => (
          <button
            key={nome}
            type="button"
            role="tab"
            aria-selected={aba === indice}
            onClick={() => setAba(indice)}
            className={`rounded px-3 py-1 ${aba === indice ? "bg-blue-dark text-white" : "bg-gray-100"}`}
          >
            {nome}
          </button>
        ))}
      </div>
      <TreemapChart key={aba} dados={aba === 0 ? funcional : natureza} />
    </PanelWithDescription>
  );
}
