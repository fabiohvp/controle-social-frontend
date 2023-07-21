import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelAlert from "@/components/panel/PanelAlert";

export default function Page() {
  return (
    <DashboardLayout className="pt-2 px-2">
      <PanelAlert type="info">
        Levantamento que teve por objetivo obter informações sobre as ações
        realizadas pelos municípios capixabas para o enfrentamento da crise
        causada pela pandemia da Covid-19, especialmente nas áreas de saúde,
        educação e assistência social, mas também ligadas a outros temas
        relevantes, como transparência, receitas, despesas e controle interno.
      </PanelAlert>
      <iframe
        src="/api/saude/acoes-pandemia"
        className="h-full mt-2 w-full"
        seamless
      />
    </DashboardLayout>
  );
}
