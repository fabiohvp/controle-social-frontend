import FiscalizacaoSubmenuLabel from "../../../_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelEducacao from "../_components/FiscalizacaoSubmenuLabelEducacao";
import FiscalizacaoSubmenuLabelDesigualdadeEducacional from "./_components/FiscalizacaoSubmenuLabelDesigualdadeEducacional";
import MenuFiscalizacaoDesigualdadeEducacionalPages from "./_components/MenuFiscalizacaoDesigualdadeEducacionalPages";

export default function FiscalizacaoDesigualdadeEducacionalSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelEducacao />
      <FiscalizacaoSubmenuLabelDesigualdadeEducacional />
      <MenuFiscalizacaoDesigualdadeEducacionalPages />
    </>
  );
}
