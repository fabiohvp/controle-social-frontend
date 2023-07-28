import FiscalizacaoLabelItemSubmenu from "../../_components/FiscalizacaoLabelItemSubmenu";
import PortalTransparenciaLabelItemSubmenu from "./_components/PortalTransparenciaLabelItemSubmenu";
import PortalTransparenciaMenuAnos from "./_components/PortalTransparenciaMenuAnos";
import PortalTransparenciaMenuPaginas from "./_components/PortalTransparenciaMenuPaginas";

export default function PortalTransparenciaItensSubmenu() {
  return (
    <>
      <FiscalizacaoLabelItemSubmenu />
      <PortalTransparenciaLabelItemSubmenu />
      <PortalTransparenciaMenuPaginas />
      <PortalTransparenciaMenuAnos />
    </>
  );
}
