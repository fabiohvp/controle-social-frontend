import BreadcrumbFiscalizacaoLabel from "@/app/fiscalizacao/_components/BreadcrumbFiscalizacaoLabel";
import BreadcrumbEducacaoLabel from "../_components/BreadcrumbEducacaoLabel";
import BreadcrumbOfertaXDemandPaginas from "./_components/BreadcrumbOfertaXDemandPaginas";
import BreadcrumbOfertaXDemandaLabel from "./_components/BreadcrumbOfertaXDemandaLabel";

export default function BreadcrumbOfertaXDemanda() {
  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <BreadcrumbEducacaoLabel />
      <BreadcrumbOfertaXDemandaLabel />
      <BreadcrumbOfertaXDemandPaginas />
    </>
  );
}
