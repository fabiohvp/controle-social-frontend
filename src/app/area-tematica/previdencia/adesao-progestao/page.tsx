import Iframe from "@/components/iframes/Iframe";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Investimentos dos institutos de previdência - Adesão ao Pró-Gestão"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Neste painel são apresentadas as adesões dos RPPS ao Programa de
            Certificação Institucional e Modernização da Gestão dos Regimes
            Próprios de Previdência Social (Pró-Gestão RPPS). A adesão ao programa
            representa um compromisso com boas práticas de governança, controles
            internos e transparência, impactando diretamente na qualidade da
            gestão previdenciária.
          </p>
          <br />
          <p>
            Os dados exibidos são declaratórios, tendo como fonte a lista de entes
            que aderiram e se certificaram junto ao Ministério da Previdência
            Social – MPS.
          </p>
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZjZjY2QxNTYtMTU5Zi00ZTQ1LWFkNzEtYjFmZDdlODc3NTcwIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=926b5c85b87c1e65b3cd"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
