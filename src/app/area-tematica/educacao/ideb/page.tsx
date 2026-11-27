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
            O{" "}
            <a
              href="https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Índice de Desenvolvimento da Educação Básica Brasileira (Ideb)
            </a>{" "}
            é um indicador criado pelo governo federal para medir a qualidade do
            ensino nas escolas públicas.
          </p>
          <br />
          <p>É calculado a partir de dois componentes:</p>
          <ul className="list-disc pl-5 my-2">
            <li>
              A taxa de aprovação escolar, obtida a partir do Censo Escolar, que é
              realizado anualmente
            </li>
            <li>
              As médias de desempenho nos exames, obtidas no Sistema de Avaliação
              da Educação Básica (Saeb)/Inep, que é aplicado a cada dois anos.
            </li>
          </ul>
          <p>
            Os dados deste Painel são bianuais. Há opções de filtros para as
            redes estadual, municipal e pública (estadual e municipal). Utilize
            os filtros localizados à esquerda do painel e lembre que uma esfera
            pode não possuir pontuação para todas as etapas e redes.
          </p>
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiYzkwODAyZjUtMzEyNi00MzgzLTkwZDYtMTkwNzFmYTJiYWUxIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSectionbb9bd0fe6013208386b2"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
