import HomeLayout from "@/app/(home)/_components/HomeLayout";
import MenuMobileLayout from "@/components/menu/MenuMobileLayout";
import ArrecadacaoWidget from "./_components/widgets/ArrecadacaoWidget";
import ComparativosWidget from "./_components/widgets/ComparativosWidget";
import ConcessoesPppWidget from "./_components/widgets/ConcessoesPppWidget";
import ConhecaFerramentaWidget from "./_components/widgets/ConhecaFerramentaWidget";
import DestinoDinheiroWidget from "./_components/widgets/DestinoDinheiroWidget";
import Educacao2Widget from "./_components/widgets/Educacao2Widget";
import EducacaoWidget from "./_components/widgets/EducacaoWidget";
import EstruturaAdministrativaWidget from "./_components/widgets/EstruturaAdministrativaWidget";
import FiscalizacaoWidget from "./_components/widgets/FiscalizacaoWidget";
import LimitesPessoalWidget from "./_components/widgets/LimitesPessoalWidget";
import LimitesSaudeWidget from "./_components/widgets/LimitesSaudeWidget";
import PrevidenciaWidget from "./_components/widgets/PrevidenciaWidget";
import ReceitaDespesaWidget from "./_components/widgets/ReceitaDespesaWidget";
import SaudeWidget from "./_components/widgets/SaudeWidget";
import ServicosIaWidget from "./_components/widgets/ServicosIaWidget";
import UltimasNovidadesWidget from "./_components/widgets/UltimasNovidadesWidget";
import PainelWidget from "./_components/widgets/painel/PainelWidget";
import "./home.css";

export default function Page() {
  return (
    <>
      <MenuMobileLayout />
      <HomeLayout className="hidden lg:block">
        <PainelWidget className="px-8" />
        <ConhecaFerramentaWidget className="px-8" />
        <EducacaoWidget className="px-8" />
        <ServicosIaWidget className="px-8" />
        <EstruturaAdministrativaWidget className="px-8" />
        <SaudeWidget className="px-8" />
        <ArrecadacaoWidget className="px-8" />
        <DestinoDinheiroWidget className="px-8" />
        <ComparativosWidget className="px-8" />
        <PrevidenciaWidget className="px-8" />
        <ConcessoesPppWidget className="px-8" />
        <FiscalizacaoWidget className="px-8" />
        <ReceitaDespesaWidget className="px-8" />
        <Educacao2Widget className="px-8" />
        <LimitesPessoalWidget className="px-8" />
        <LimitesSaudeWidget className="px-8" />
        <UltimasNovidadesWidget className="px-8" />
      </HomeLayout>
    </>
  );
}
