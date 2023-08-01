import BreadcrumbFiscalizacaoLabel from "@/app/fiscalizacao/_components/BreadcrumbFiscalizacaoLabel";
import BreadcrumbEducacaoLabel from "../_components/BreadcrumbEducacaoLabel";
import OfertaXDemandaLabelItemSubmenu from "./_components/OfertaXDemandaLabelItemSubmenu";
import OfertaXDemandaMenuPaginas from "./_components/OfertaXDemandaMenuPaginas";

export default function OfertaXDemandaItensSubmenu() {
  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <BreadcrumbEducacaoLabel />
      <OfertaXDemandaLabelItemSubmenu />
      <OfertaXDemandaMenuPaginas />
    </>
  );
}
