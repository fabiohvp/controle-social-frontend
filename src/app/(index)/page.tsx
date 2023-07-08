import IndexFooter from "@/components/layout/index/IndexFooter";
import IndexHeader from "@/components/layout/index/IndexHeader";
import IndexLayout from "@/components/layout/index/IndexLayout";
import ArrecadacaoSection from "./_components/sections/arrecadacao-section/ArrecadacaoSection";
import ComparativosSection from "./_components/sections/comparativos-section/ComparativosSection";
import ConcessoesPPPSection from "./_components/sections/concessoes-ppp-section/ConcessoesPPPSection";
import ConhecaFerramentaSection from "./_components/sections/conheca-ferramenta-section/ConhecaFerramentaSection";
import DestinoDinheiroSection from "./_components/sections/destino-dinheiro-section/DestinoDinheiroSection";
import EducacaoSection from "./_components/sections/educacao-section/EducacaoSection";
import Educacao2Section from "./_components/sections/educacao2-section/Educacao2Section";
import EstruturaAdministrativaSection from "./_components/sections/estrutura-administrativa-section/EstruturaAdministrativaSection";
import FiscalizacaoSection from "./_components/sections/fiscalizacao-section/FiscalizacaoSection";
import LimitesPessoalSection from "./_components/sections/limites-pessoal-section/LimitesPessoalSection";
import LimitesSaudeSection from "./_components/sections/limites-saude-section/LimitesSaudeSection";
import PanelSection from "./_components/sections/panel-section/PanelSection";
import PrevidenciaSection from "./_components/sections/previdencia-section/PrevidenciaSection";
import ReceitaDespesaSection from "./_components/sections/receita-despesa-section/ReceitaDespesaSection";
import SaudeSection from "./_components/sections/saude-section/SaudeSection";
import ServicosIASection from "./_components/sections/servicos-ia-section/ServicosIASection";
import UltimasNovidadesSection from "./_components/sections/ultimas-novidades-section/UltimasNovidadesSection";
import "./index.css";

export default function Home() {
  return (
    <IndexLayout>
      <IndexHeader />
      <>
        <PanelSection className="px-8" />
        <ConhecaFerramentaSection />
        <EducacaoSection className="px-8" />
        <ServicosIASection className="px-8" />
        <EstruturaAdministrativaSection className="px-8" />
        <SaudeSection className="px-8" />
        <ArrecadacaoSection className="px-8" />
        <DestinoDinheiroSection className="px-8" />
        <ComparativosSection className="px-8" />
        <PrevidenciaSection className="px-8" />
        <ConcessoesPPPSection className="px-8" />
        <FiscalizacaoSection className="px-8" />
        <ReceitaDespesaSection className="px-8" />
        <Educacao2Section className="px-8" />
        <LimitesPessoalSection className="px-8" />
        <LimitesSaudeSection className="px-8" />
        <UltimasNovidadesSection className="px-8" />
      </>
      <IndexFooter />
    </IndexLayout>
  );
}
