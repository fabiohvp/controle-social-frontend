import FiscalizacaoSubmenuLabel from "../../_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelTransparenciaPassiva from "./_components/FiscalizacaoSubmenuLabelTransparenciaPassiva";
import MenuFiscalizacaoTransparenciaPassiva from "./_components/MenuFiscalizacaoTransparenciaPassiva";
import MenuFiscalizacaoPortalTransparenciaAnos from "./_components/MenuFiscalizacaoTransparenciaPassivaAnos";

export default function FiscalizacaoPortalTransparenciaSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelTransparenciaPassiva />
      <MenuFiscalizacaoTransparenciaPassiva />
      <MenuFiscalizacaoPortalTransparenciaAnos />
    </>
  );
}
