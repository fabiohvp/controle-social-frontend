import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";

export default function Page() {
  return (
    <DashboardLayout className="pt-2 px-2" exibirFooter={false}>
      <AlertPanel type="info">
        Entre o segundo semestre de 2015 e o primeiro semestre de 2019, o
        Tribunal de Contas do ES realizou auditorias em todos os municípios
        capixabas para analisar a estrutura legislativa, física e organizacional
        da Administração Tributária Municipal. O trabalho foi norteado pelos
        seguintes temas principais: Legislação, Recursos Humanos,
        Infraestrutura, Fiscalização, Cobrança e Registro do Crédito, a partir
        dos quais, em geral, se desenvolveram 18 pontos de controle, dos quais
        se expõe 39 tipos de irregularidades encontradas. A partir da correção
        de tais irregularidades, se espera que os municípios implementem o dever
        de instituir, prever e arrecadar todos os tributos de sua competência, o
        fazendo de forma justa para com seus contribuintes e revertendo os
        respectivos recursos em favor da sociedade.
      </AlertPanel>
      <iframe
        src="https://public.tableau.com/views/AuditoriadeReceitasMunicipais/Painel1?:embed=y&:toolbar=yes&:embed_code_version=3&:loadOrderID=6&:display_count=yes&:tabs=no?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:toolbar=no&:animate_transition=false&:display_static_image=false&:display_spinner=yes&:display_overlay=yes&:display_count=yes&:tabs=no&:loadOrderID=0"
        className="h-full mt-2 w-full"
        seamless
      />
    </DashboardLayout>
  );
}
