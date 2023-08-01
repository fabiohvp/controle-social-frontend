import BreadcrumbFiscalizacaoLabel from "../../../_components/BreadcrumbFiscalizacaoLabel";
import BreadcrumbEducacaoLabel from "../_components/BreadcrumbEducacaoLabel";
import BreadcrumbDesigualdadeEducacionalLabel from "./_components/BreadcrumbDesigualdadeEducacionalLabel";
import BreadcrumbDesigualdadeEducacionalPaginas from "./_components/BreadcrumbDesigualdadeEducacionalPaginas";

export default function BreadcrumbDesigualdadeEducacional() {
  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <BreadcrumbEducacaoLabel />
      <BreadcrumbDesigualdadeEducacionalLabel />
      <BreadcrumbDesigualdadeEducacionalPaginas />
    </>
  );
}
