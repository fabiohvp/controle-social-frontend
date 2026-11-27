import Iframe from "@/components/iframes/Iframe";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Investimentos dos institutos de previdência - Aplicação em Fundos"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Neste painel são apresentados os montantes de recursos investidos em
            cada um dos fundos de investimentos pelos RPPS capixabas.
          </p>
          <br />
          <p>
            Os dados exibidos são declaratórios, tendo como fonte os
            Demonstrativos das Aplicações e Investimentos dos Recursos – DAIR
            enviados mensalmente pelos Regimes Próprios de Previdência Social -
            RPPS ao sistema CADPREV do Ministério da Previdência Social – MPS, em
            conformidade à Portaria MTP 1.467/2022 e às Resoluções CMN nº
            4.963/2021 (vigente até 01/02/2026) e nº 5.272/2025 (vigente a partir
            de 02/02/2026).
          </p>
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZjZjY2QxNTYtMTU5Zi00ZTQ1LWFkNzEtYjFmZDdlODc3NTcwIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=b13d4da97cb6b03ea734"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
