import BreadcrumbFiscalizacaoLabel from "../../_components/BreadcrumbFiscalizacaoLabel";
import BreadcrumbPortalTransparenciaLabel from "./_components/BreadcrumbPortalTransparenciaLabel";
import BreadcrumbPortalTransparenciaPaginas from "./_components/BreadcrumbPortalTransparenciaPaginas";
import PortalTransparenciaMenuAnos from "./_components/PortalTransparenciaMenuAnos";

export default function BreadcrumbPortalTransparencia() {
  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <BreadcrumbPortalTransparenciaLabel />
      <BreadcrumbPortalTransparenciaPaginas />
      <PortalTransparenciaMenuAnos />
    </>
  );
}
