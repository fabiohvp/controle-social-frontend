import Iframe from "@/components/iframes/Iframe";
import LogoInfoEducacao from "@/components/images/logos/LogoInfoEducacao";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Distribuição de escolas públicas, matrículas e profissionais da educação no Estado e nos municípios"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          O painel apresenta informações sobre professores inativos, que estão
          recebendo seus proventos de aposentadoria por meio do regime próprio
          de previdência estadual ou municipal.
          <br />
          Os dados exibidos são declaratórios, tendo como fonte as remessas
          mensalmente enviadas e homologadas por meio do sistema CidadES-Folha
          de Pagamento, conforme Anexo V da IN 68/2020.
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiYzkwODAyZjUtMzEyNi00MzgzLTkwZDYtMTkwNzFmYTJiYWUxIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection"
        className="h-full mt-2 w-full"
      />
    </>
  );
}

