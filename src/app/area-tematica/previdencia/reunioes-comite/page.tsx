import Iframe from "@/components/iframes/Iframe";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Investimentos dos institutos de previdência - Reuniões do Comitê de Investimentos"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Neste painel são apresentadas informações sobre a realização de
            reuniões dos Comitês de Investimentos dos RPPS, instâncias colegiadas
            responsáveis por assessorar na definição da política de investimentos
            e acompanhar sua execução. A regularidade e a transparência dessas
            reuniões refletem o nível de governança e de participação na gestão
            dos recursos.
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
        src="https://app.powerbi.com/view?r=eyJrIjoiZjZjY2QxNTYtMTU5Zi00ZTQ1LWFkNzEtYjFmZDdlODc3NTcwIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=712c44d8abe200c74657"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
