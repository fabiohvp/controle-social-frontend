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
          Informações detalhadas sobre as escolas, como: quantidade de
          matrículas, modalidade (Ensino Regular e Educação de Jovens e Adultos)
          e etapas (ensino infantil, fundamental e médio).
          <br />
          Os dados exibidos são do Censo Escolar realizado anualmente pelo Inep
          (Instituto Nacional de Estudos e Pesquisas Educacionais Anísio
          Teixeira), ligado ao MEC (Ministério da Educação).
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PanelWithTitleCollapsible>
      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZmVjMzBjYzctZWFjNi00Nzk1LThkZDQtMjk3MGVmNDU2MzRiIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSectiona411778c4d849418b6cb"
        className="h-full mt-2 w-full"
        seamless
      />
    </>
  );
}
