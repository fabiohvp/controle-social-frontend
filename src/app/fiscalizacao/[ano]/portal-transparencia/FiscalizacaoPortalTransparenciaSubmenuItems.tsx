import FiscalizacaoSubmenuLabel from "../../_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelPortalTransparencia from "./_components/FiscalizacaoSubmenuLabelPortalTransparencia";
import MenuFiscalizacaoPortalTransparenciaAnos from "./_components/MenuFiscalizacaoPortalTransparenciaAnos";
import MenuFiscalizacaoPortalTransparenciaPages from "./_components/MenuFiscalizacaoPortalTransparenciaPages";

export default function FiscalizacaoPortalTransparenciaSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelPortalTransparencia />
      <MenuFiscalizacaoPortalTransparenciaPages />
      <MenuFiscalizacaoPortalTransparenciaAnos />
    </>
  );
}
