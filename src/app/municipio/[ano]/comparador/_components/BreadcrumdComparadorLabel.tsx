import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import ComparadorIcon from "@/components/images/icons/ComparadorIcon";

export default function BreadcrumdComparadorLabel() {
  return (
    <DropdownItemLabel className="opacity-60">
      <ComparadorIcon small />
      <span className="ml-1 ellipsis">Comparação de municípios</span>
    </DropdownItemLabel>
  );
}
