import FiscalizacaoSubmenuLabel from "../../../_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelEducacao from "../_components/FiscalizacaoSubmenuLabelEducacao";
import FiscalizacaoSubmenuLabelDesigualdadeEducacional from "./_components/FiscalizacaoSubmenuLabelDesigualdadeEducacional";
import MenuFiscalizacaoDesigualdadeEducacional from "./_components/MenuFiscalizacaoDesigualdadeEducacional";

export default function FiscalizacaoDesigualdadeEducacionalSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelEducacao />
      <FiscalizacaoSubmenuLabelDesigualdadeEducacional />
      <MenuFiscalizacaoDesigualdadeEducacional />
    </>
  );
}
