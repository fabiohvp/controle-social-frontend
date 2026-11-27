import Iframe from "@/components/iframes/Iframe";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Balanço Patrimonial"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Apresenta a composição do patrimônio público em Ativo Circulante,
            Ativo Não Circulante, Passivo Circulante, Passivo Não Circulante e
            Patrimônio Líquido dos municípios e entidades capixabas.
          </p>
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZTg2YjZiNDItZTUxNS00NmQ4LWIyZDYtYzRkYmQzMjczY2ZiIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection41e50525175c994696a1"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
