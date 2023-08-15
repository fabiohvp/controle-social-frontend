import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";
import BreadcrumbSaude from "../BreadcrumbSaude";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbSaude}
    >
      <AlertPanel type="info">
        Levantamento que teve por objetivo obter informações sobre as ações
        realizadas pelos municípios capixabas para o enfrentamento da crise
        causada pela pandemia da Covid-19, especialmente nas áreas de saúde,
        educação e assistência social, mas também ligadas a outros temas
        relevantes, como transparência, receitas, despesas e controle interno.
      </AlertPanel>
      <iframe
        src="/api/saude/acoes-pandemia"
        className="h-full mt-2 w-full"
        seamless
      />
    </DashboardLayout>
  );
}
