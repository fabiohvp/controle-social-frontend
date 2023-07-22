import FiscalizacaoSubmenuLabel from "@/app/fiscalizacao/_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelSaude from "./_components/FiscalizacaoSubmenuLabelSaude";
import MenuFiscalizacaoSaude from "./_components/MenuFiscalizacaoSaude";

export default function FiscalizacaoSaudeSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelSaude />
      <MenuFiscalizacaoSaude />
    </>
  );
}
