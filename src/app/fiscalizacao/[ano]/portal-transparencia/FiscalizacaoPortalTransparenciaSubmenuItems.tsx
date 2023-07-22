import FiscalizacaoSubmenuLabel from "../../_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelPortalTransparencia from "./_components/FiscalizacaoSubmenuLabelPortalTransparencia";
import MenuFiscalizacaoPortalTransparencia from "./_components/MenuFiscalizacaoPortalTransparencia";
import MenuFiscalizacaoPortalTransparenciaAnos from "./_components/MenuFiscalizacaoPortalTransparenciaAnos";

export default function FiscalizacaoPortalTransparenciaSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelPortalTransparencia />
      <MenuFiscalizacaoPortalTransparencia />
      <MenuFiscalizacaoPortalTransparenciaAnos />
    </>
  );
}
