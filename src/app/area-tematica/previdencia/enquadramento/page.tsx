import Iframe from "@/components/iframes/Iframe";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Investimentos dos institutos de previdência - Enquadramento"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Neste painel são analisadas as aplicações dos RPPS para verificar o
            cumprimento dos limites por segmento, tipo de ativo e emissor,
            conforme exigido pelas Resoluções CMN nº 4.963/2021 (vigente até
            01/02/2026) e nº 5.272/2025 (vigente a partir de 02/02/2026).
          </p>
          <br />
          <p>
            O enquadramento é essencial para comprovar a regularidade da gestão
            dos recursos e para a manutenção do Certificado de Regularidade
            Previdenciária (CRP). A partir de 02/02/2026, a Resolução CMN nº
            5.272/2025 substituiu os limites uniformes de alocação da regra
            anterior (Res. 4.963/2021). No novo modelo, os limites de aplicação dos
            RPPS passam a depender do seu nível de certificação no Pró-Gestão:
            quanto maior a certificação institucional, mais amplos são os limites
            permitidos para investimento.
          </p>
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZjZjY2QxNTYtMTU5Zi00ZTQ1LWFkNzEtYjFmZDdlODc3NTcwIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=4c7da6f35f3408542c26"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
