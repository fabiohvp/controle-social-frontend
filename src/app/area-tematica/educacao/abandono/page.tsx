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
            A Taxa de Abandono Escolar é um indicador que demonstra o percentual
            de alunos matriculados na etapa de ensino que deixaram de frequentar a
            escola durante o período letivo.
          </p>
          <br />
          <p>
            Os dados exibidos são do Censo Escolar realizado anualmente pelo Inep
            (Instituto Nacional de Estudos e Pesquisas Educacionais Anísio
            Teixeira), ligado ao MEC (Ministério da Educação).
          </p>
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiYzkwODAyZjUtMzEyNi00MzgzLTkwZDYtMTkwNzFmYTJiYWUxIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection97fadce3c916e2d93615"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
