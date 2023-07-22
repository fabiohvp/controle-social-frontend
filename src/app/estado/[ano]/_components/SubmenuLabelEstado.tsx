import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import EstadoIcon from "@/components/images/icones/header/EstadoIcon";

export default function SubmenuLabelEstado() {
  return (
    <DropdownItemLabel className="opacity-60">
      <EstadoIcon />
      <span className="ml-1 ellipsis">Estado</span>
    </DropdownItemLabel>
  );
}
