import BreadcrumbFolhaDePagamentoPaginas from "../[poder]/[ano]/_components/BreadcrumbFolhaDePagamentoPaginas";
import BreadcrumbPessoalLabel from "./BreadcrumbPessoalLabel";

export default function BreadcrumbPessoalSemFiltros() {
  return (
    <>
      <BreadcrumbPessoalLabel />
      <BreadcrumbFolhaDePagamentoPaginas />
    </>
  );
}
