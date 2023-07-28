import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PainelDeAlerta from "@/components/paineis/PainelDeAlerta";
import FiscalizacaoSaudeSubmenuItems from "../FiscalizacaoSaudeSubmenuItems";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensSubmenu={FiscalizacaoSaudeSubmenuItems}
    >
      <PainelDeAlerta type="info">
        Levantamento que teve por objetivo obter informações sobre as ações
        realizadas pelos municípios capixabas para o enfrentamento da crise
        causada pela pandemia da Covid-19, especialmente nas áreas de saúde,
        educação e assistência social, mas também ligadas a outros temas
        relevantes, como transparência, receitas, despesas e controle interno.
      </PainelDeAlerta>
      <iframe
        src="/api/saude/acoes-pandemia"
        className="h-full mt-2 w-full"
        seamless
      />
    </DashboardLayout>
  );
}
