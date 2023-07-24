import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import FiscalizacaoIcon from "@/components/images/icons/header/FiscalizacaoIcon";

export default function FiscalizacaoSubmenuLabel() {
  return (
    <DropdownItemLabel className="opacity-60">
      <FiscalizacaoIcon />
      <span className="ml-1 ellipsis">Fiscalizações</span>
    </DropdownItemLabel>
  );
}
