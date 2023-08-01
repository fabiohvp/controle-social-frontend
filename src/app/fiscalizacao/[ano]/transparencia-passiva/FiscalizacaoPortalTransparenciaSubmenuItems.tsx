import BreadcrumbFiscalizacaoLabel from "../../_components/BreadcrumbFiscalizacaoLabel";
import FiscalizacaoSubmenuLabelTransparenciaPassiva from "./_components/FiscalizacaoSubmenuLabelTransparenciaPassiva";
import MenuFiscalizacaoPortalTransparenciaAnos from "./_components/MenuFiscalizacaoTransparenciaPassivaAnos";
import MenuFiscalizacaoTransparenciaPassivaPages from "./_components/MenuFiscalizacaoTransparenciaPassivaPages";

export default function FiscalizacaoPortalTransparenciaSubmenuItems() {
  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <FiscalizacaoSubmenuLabelTransparenciaPassiva />
      <MenuFiscalizacaoTransparenciaPassivaPages />
      <MenuFiscalizacaoPortalTransparenciaAnos />
    </>
  );
}
