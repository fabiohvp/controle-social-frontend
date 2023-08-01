import BreadcrumbFiscalizacaoLabel from "@/app/fiscalizacao/_components/BreadcrumbFiscalizacaoLabel";
import FiscalizacaoSubmenuLabelSaude from "./_components/BreadcrumbSaudeLabel";
import BreadcrumbSaudePaginas from "./_components/BreadcrumbSaudePaginas";

export default function BreadcrumbSaude() {
  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <FiscalizacaoSubmenuLabelSaude />
      <BreadcrumbSaudePaginas />
    </>
  );
}
