import FiscalizacaoSubmenuLabel from "@/app/fiscalizacao/_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelSaude from "./_components/FiscalizacaoSubmenuLabelSaude";
import MenuFiscalizacaoSaudePages from "./_components/MenuFiscalizacaoSaudePages";

export default function FiscalizacaoSaudeSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelSaude />
      <MenuFiscalizacaoSaudePages />
    </>
  );
}
