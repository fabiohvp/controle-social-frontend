import LogoInfoEducacao from "@/components/images/logos/LogoInfoEducacao";
import PainelComTituloMinimizavel from "@/components/paineis/PainelComTituloMinimizavel";

export default function Page() {
  return (
    <>
      <PainelComTituloMinimizavel
        header="Distribuição de escolas públicas, matrículas e profissionais da educação no Estado e nos municípios"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          Visão inicial sobre matrículas e escolas nas redes municipais e
          estadual: quantidade, distribuição nos municípios e localização
          (urbana e rural).
          <br />
          Os dados exibidos são do Censo Escolar realizado anualmente pelo Inep
          (Instituto Nacional de Estudos e Pesquisas Educacionais Anísio
          Teixeira), ligado ao MEC (Ministério da Educação).
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PainelComTituloMinimizavel>
      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZmVjMzBjYzctZWFjNi00Nzk1LThkZDQtMjk3MGVmNDU2MzRiIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection"
        className="h-full mt-2 w-full"
        seamless
      />
    </>
  );
}
