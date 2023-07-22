import FiscalizacaoSubmenuLabel from "../../_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelTransparenciaPassiva from "./_components/FiscalizacaoSubmenuLabelTransparenciaPassiva";
import MenuFiscalizacaoPortalTransparenciaAnos from "./_components/MenuFiscalizacaoTransparenciaPassivaAnos";
import MenuFiscalizacaoTransparenciaPassivaPages from "./_components/MenuFiscalizacaoTransparenciaPassivaPages";

export default function FiscalizacaoPortalTransparenciaSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelTransparenciaPassiva />
      <MenuFiscalizacaoTransparenciaPassivaPages />
      <MenuFiscalizacaoPortalTransparenciaAnos />
    </>
  );
}
