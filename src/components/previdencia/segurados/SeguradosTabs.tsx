"use client";

import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { MultiSerie } from "@/types/Serie";
import { useState } from "react";

export type EstatisticaItem = {
  quantidade?: MultiSerie;
  remuneracao?: MultiSerie;
  idadeMedia?: MultiSerie;
  idadeMediaProjetada?: MultiSerie;
};

type Props = {
  labels: [string, string, string];
  servidores?: EstatisticaItem;
  aposentados?: EstatisticaItem;
  pensionistas?: EstatisticaItem;
};

const CORES_GENERO = ["#8AA2AD", "#9D8AAC"];

export default function SeguradosTabs({
  labels,
  servidores,
  aposentados,
  pensionistas,
}: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const selecionado = [servidores, aposentados, pensionistas][tabIndex];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex border-b border-gray-200">
        {labels.map((label, idx) => (
          <button
            key={label}
            type="button"
            onClick={() => setTabIndex(idx)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              tabIndex === idx
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PanelWithDescription
          titulo="Quantidade"
          descricao="A classificação entre tipos de aposentadoria está baseada na contagem de tempo de contribuição. Professores possuem contagem diferenciada para aposentadoria. Na categoria Especial foram incluídos os Magistrados, Membros de Ministério Público e Membros do Tribunal de Contas."
        >
          <MultiSeriesChart
            dados={selecionado?.quantidade ?? null}
            cores={CORES_GENERO}
            formato="numero"
            corrigirIpca={false}
          />
        </PanelWithDescription>

        <PanelWithDescription
          titulo="Remuneração média"
          descricao="A média considera a soma da remuneração bruta dividida pela quantidade de servidores. O resultado não tem a finalidade de comparação entre os sexos, mas demonstrar a média da remuneração bruta de um grupo."
        >
          <MultiSeriesChart
            dados={selecionado?.remuneracao ?? null}
            cores={CORES_GENERO}
            formato="moeda"
            corrigirIpca="categoria"
          />
        </PanelWithDescription>

        <PanelWithDescription
          titulo="Idade média"
          descricao="Demonstra a idade média do grupo de servidores selecionados por sexo."
        >
          <MultiSeriesChart
            dados={selecionado?.idadeMedia ?? null}
            cores={CORES_GENERO}
            formato="numero"
            corrigirIpca={false}
          />
        </PanelWithDescription>
      </div>
    </div>
  );
}
