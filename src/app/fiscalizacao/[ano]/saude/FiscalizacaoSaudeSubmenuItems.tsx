import FiscalizacaoLabelItemSubmenu from "@/app/fiscalizacao/_components/FiscalizacaoLabelItemSubmenu";
import FiscalizacaoSubmenuLabelSaude from "./_components/FiscalizacaoSubmenuLabelSaude";
import MenuFiscalizacaoSaudePages from "./_components/MenuFiscalizacaoSaudePages";

export default function FiscalizacaoSaudeSubmenuItems() {
  return (
    <>
      <FiscalizacaoLabelItemSubmenu />
      <FiscalizacaoSubmenuLabelSaude />
      <MenuFiscalizacaoSaudePages />
    </>
  );
}
