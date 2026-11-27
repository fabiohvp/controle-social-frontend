import Iframe from "@/components/iframes/Iframe";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Variações Patrimoniais"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Demonstração das Variações Patrimoniais Aumentativas (VPA),
            Diminutivas (VPD) e o Resultado Patrimonial apurado pelos municípios
            capixabas.
          </p>
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZTg2YjZiNDItZTUxNS00NmQ4LWIyZDYtYzRkYmQzMjczY2ZiIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection1c1f2fe0cb95730ae575"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
