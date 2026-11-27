import Iframe from "@/components/iframes/Iframe";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Investimentos dos institutos de previdência - Cumprimento de Prazos do DAIR"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Neste painel é realizado o monitoramento dos prazos de envio do DAIR
            pelos RPPS, permitindo verificar o nível de conformidade das unidades
            gestoras com as exigências da Portaria MTP nº 1.467/2022. O envio
            tempestivo garante maior confiabilidade e transparência das
            informações analisadas.
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
        src="https://app.powerbi.com/view?r=eyJrIjoiZjZjY2QxNTYtMTU5Zi00ZTQ1LWFkNzEtYjFmZDdlODc3NTcwIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=5b40bed972306d133bec"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
