import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import PrestacaoContaIcon from "@/components/images/icons/header/PrestacaoContaIcon";

export default function BreadcrumbPrestacaoDeContaLabel() {
  return (
    <DropdownItemLabel className="opacity-60">
      <PrestacaoContaIcon small />
      <span className="ml-1 ellipsis">Prestações de contas anuais</span>
    </DropdownItemLabel>
  );
}
