import FiscalizacaoLabelItemSubmenu from "@/app/fiscalizacao/_components/FiscalizacaoLabelItemSubmenu";
import EducacaoLabelItemSubmenu from "../_components/EducacaoLabelItemSubmenu";
import OfertaXDemandaLabelItemSubmenu from "./_components/OfertaXDemandaLabelItemSubmenu";
import OfertaXDemandaMenuPaginas from "./_components/OfertaXDemandaMenuPaginas";

export default function OfertaXDemandaItensSubmenu() {
  return (
    <>
      <FiscalizacaoLabelItemSubmenu />
      <EducacaoLabelItemSubmenu />
      <OfertaXDemandaLabelItemSubmenu />
      <OfertaXDemandaMenuPaginas />
    </>
  );
}
