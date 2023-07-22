import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelAlert from "@/components/panel/PanelAlert";
import FiscalizacaoSaudeSubmenuItems from "../FiscalizacaoSaudeSubmenuItems";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      submenuItems={FiscalizacaoSaudeSubmenuItems}
    >
      <PanelAlert type="info">
        O levantamento realizado teve por objetivo conhecer os sistemas de
        controle, programas, projetos e atividades dos 78 municípios do Estado
        do Espírito Santo, direcionados à redução da mortalidade prematura (30 a
        69 anos) pelo conjunto das 4 principais Doenças Crônicas Não
        Transmissíveis - DCNT (doenças cardiovasculares, cânceres, diabetes,
        doenças respiratórias crônicas), que representam a maior causa de óbitos
        no Brasil e no mundo. Foram abordados também os seus principais fatores
        de risco (tabagismo, uso abusivo de álcool, alimentação não saudável,
        inatividade física). A escolha do tema levou em consideração as metas de
        saúde e bem estar dos Objetivos de Desenvolvimento Sustentável (ODS) da
        Organização das Nações Unidas (ONUA) e os indicadores de pactuação
        interfederativa que retratam as prioridades nacionais em saúde.
      </PanelAlert>
      <iframe
        src="/api/saude/doencas-cronicas-nao-transmissiveis"
        className="h-full mt-2 w-full"
        seamless
      />
    </DashboardLayout>
  );
}
