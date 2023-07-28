import FiscalizacaoLabelItemSubmenu from "../../_components/FiscalizacaoLabelItemSubmenu";
import FiscalizacaoSubmenuLabelTransparenciaPassiva from "./_components/FiscalizacaoSubmenuLabelTransparenciaPassiva";
import MenuFiscalizacaoPortalTransparenciaAnos from "./_components/MenuFiscalizacaoTransparenciaPassivaAnos";
import MenuFiscalizacaoTransparenciaPassivaPages from "./_components/MenuFiscalizacaoTransparenciaPassivaPages";

export default function FiscalizacaoPortalTransparenciaSubmenuItems() {
  return (
    <>
      <FiscalizacaoLabelItemSubmenu />
      <FiscalizacaoSubmenuLabelTransparenciaPassiva />
      <MenuFiscalizacaoTransparenciaPassivaPages />
      <MenuFiscalizacaoPortalTransparenciaAnos />
    </>
  );
}
