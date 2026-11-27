import Iframe from "@/components/iframes/Iframe";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Planos Municipais de Saúde - Detalhamento de Metas"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Os dados foram extraídos dos Planos Municipais de Saúde (PMS), dos
            Relatórios Anuais de Gestão (RAG) e da Programação Anual de Saúde
            (PAS) mediante a utilização da API do DigiSUS.
          </p>
          <br />
          <p>
            A quantidade de metas atingidas reflete a capacidade de planejamento
            e execução das políticas públicas de saúde no município.
          </p>
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiNTVjMDk1NDEtOGFhOS00MWZmLTk0ODctYTY4ODNiNDVjODgyIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSectionbb58161b8a1a57c908c1"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
