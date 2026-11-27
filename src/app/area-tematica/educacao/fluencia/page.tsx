import Iframe from "@/components/iframes/Iframe";
import LogoInfoEducacao from "@/components/images/logos/LogoInfoEducacao";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Dados sobre escolas públicas, matrículas, índices e profissionais da educação no Estado e nos municípios"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            A Avaliação da Fluência em Leitura é uma avaliação estadual, de
            periodicidade anual, que tem por objetivo identificar o nível de
            fluência em leitura dos estudantes.
          </p>
          <br />
          <p>
            Possui como foco o 2º ano do Ensino Fundamental, momento em que os
            estudantes consolidam a alfabetização.
          </p>
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiYzkwODAyZjUtMzEyNi00MzgzLTkwZDYtMTkwNzFmYTJiYWUxIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSectionf27d59253003f2810b8f"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
