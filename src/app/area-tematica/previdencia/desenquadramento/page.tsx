import Iframe from "@/components/iframes/Iframe";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Investimentos dos institutos de previdência - Desenquadramento"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Neste painel são evidenciadas situações em que os investimentos
            declarados pelos RPPS não atendem aos limites e condições previstos
            nas Resoluções CMN nº 4.963/2021 (vigente até 01/02/2026) e nº
            5.272/2025 (vigente a partir de 02/02/2026).
          </p>
          <br />
          <p>
            O acompanhamento do desenquadramento é fundamental para avaliar riscos
            de descumprimento normativo e auxiliar na adoção de medidas
            corretivas, resguardando a segurança, liquidez e rentabilidade dos
            recursos previdenciários. Os RPPS que ficaram desenquadrados com as
            novas regras da Resolução CMN nº 5.272/2025, por falta ou nível
            insuficiente de certificação no Pró-Gestão, têm até 2 anos para
            regularizar suas carteiras. Durante esse período, ficam vedados novos
            aportes nos ativos e segmentos em situação irregular.
          </p>
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZjZjY2QxNTYtMTU5Zi00ZTQ1LWFkNzEtYjFmZDdlODc3NTcwIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=e617ce340ecee5884367"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
