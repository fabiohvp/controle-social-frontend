import FiscalizacaoSubmenuLabel from "../../_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelPortalTransparencia from "./_components/FiscalizacaoSubmenuLabelPortalTransparencia";
import MenuFiscalizacaoPortalTransparenciaPages from "./_components/MenuFiscalizacaoPortalTransparencia";
import MenuFiscalizacaoPortalTransparenciaAnos from "./_components/MenuFiscalizacaoPortalTransparenciaAnos";

export default function FiscalizacaoPortalTransparenciaSubmenuItemsPages() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelPortalTransparencia />
      <MenuFiscalizacaoPortalTransparenciaPages />
      <MenuFiscalizacaoPortalTransparenciaAnos />
    </>
  );
}
