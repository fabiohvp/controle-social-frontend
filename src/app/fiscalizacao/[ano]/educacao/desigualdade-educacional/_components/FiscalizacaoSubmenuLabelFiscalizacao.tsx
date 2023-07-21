import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import FiscalizacaoIcon from "@/components/images/icones/header/FiscalizacaoIcon";

export default function FiscalizacaoSubmenuLabelFiscalizacao() {
  return (
    <DropdownItemLabel className="opacity-60">
      <FiscalizacaoIcon />
      <span className="ml-1 ellipsis">Fiscalizações</span>
    </DropdownItemLabel>
  );
}
