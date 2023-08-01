import BreadcrumbFiscalizacaoLabel from "../../_components/BreadcrumbFiscalizacaoLabel";
import BreadcrumbControleInternoLabel from "./_components/BreadcrumbControleInternoLabel";
import BreadcrumbControleInternoPaginas from "./_components/BreadcrumbControleInternoPaginas";
import ControleInternoMenuAnos from "./_components/ControleInternoMenuAnos";

export default function BreadcrumbControleInterno() {
  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <BreadcrumbControleInternoLabel />
      <BreadcrumbControleInternoPaginas />
      <ControleInternoMenuAnos />
    </>
  );
}
