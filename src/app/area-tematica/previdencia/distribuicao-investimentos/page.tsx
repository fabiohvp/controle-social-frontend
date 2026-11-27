import Iframe from "@/components/iframes/Iframe";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Investimentos dos institutos de previdência - Distribuição dos Investimentos"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Neste painel são apresentados os percentuais de aplicação em cada
            segmento de investimento, conforme critérios definidos pela Resolução
            CMN nº 4.963/2021 (vigente até 01/02/2026) e nº 5.272/2025 (vigente a
            partir de 02/02/2026).
          </p>
          <br />
          <p>
            Os dados exibidos são declaratórios, tendo como fonte os
            Demonstrativos das Aplicações e Investimentos dos Recursos – DAIR
            enviados mensalmente pelos Regimes Próprios de Previdência Social -
            RPPS ao sistema CADPREV do Ministério da Previdência Social – MPS.
          </p>
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZjZjY2QxNTYtMTU5Zi00ZTQ1LWFkNzEtYjFmZDdlODc3NTcwIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=83616e02b91c0d60400f"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
