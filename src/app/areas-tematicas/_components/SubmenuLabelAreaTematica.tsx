import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import AreaTematicaIcon from "@/components/images/icons/header/AreaTematicaIcon";

export default function SubmenuLabelAreaTematica() {
  return (
    <DropdownItemLabel className="opacity-60">
      <AreaTematicaIcon />
      <span className="ml-1 ellipsis">Áreas temáticas</span>
    </DropdownItemLabel>
  );
}
