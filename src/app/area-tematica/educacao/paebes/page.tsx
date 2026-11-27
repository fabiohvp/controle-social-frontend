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
            O Programa de Avaliação da Educação Básica do Espírito Santo (Paebes)
            é uma avaliação estadual, de periodicidade anual, que tem por objetivo
            avaliar a qualidade da educação básica da rede pública estadual e, por
            adesão, das redes municipais e privada.
          </p>
          <br />
          <p>
            Ele avalia no 5º ano do Ensino Fundamental os componentes
            curriculares de Língua Portuguesa e Matemática; no 9º, avalia
            anualmente Língua Portuguesa e Matemática, e alternadamente, em anos
            pares, História e Geografia e, em ímpares, Ciências; e na 3ª série do
            Ensino Médio, anualmente, Língua Portuguesa e Matemática, e,
            alternadamente, em anos pares, História e Geografia e, em ímpares,
            Ciências da Natureza (Física, Química e Biologia).
          </p>
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PanelWithTitleCollapsible>
      <Iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiYzkwODAyZjUtMzEyNi00MzgzLTkwZDYtMTkwNzFmYTJiYWUxIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection11f0662148fd6c3212c1"
        className="h-full mt-2 w-full"
      />
    </>
  );
}
