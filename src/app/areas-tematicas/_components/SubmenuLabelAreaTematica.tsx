import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import AreaTematicaIcon from "@/components/images/icones/header/AreaTematicaIcon";

export default function SubmenuLabelAreaTematica() {
  return (
    <DropdownItemLabel className="opacity-60">
      <AreaTematicaIcon />
      <span className="ml-1 ellipsis">Áreas temáticas</span>
    </DropdownItemLabel>
  );
}
