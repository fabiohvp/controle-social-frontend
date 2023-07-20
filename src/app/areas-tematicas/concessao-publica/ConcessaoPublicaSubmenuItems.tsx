import AreaTematicaIcon from "@/components/images/icones/header/AreaTematicaIcon";
import DropdownLinksAreasTematicas from "../_components/DropdownLinksAreasTematicas";
import DropdownLinksConcessaoPublica from "../_components/DropdownLinksConcessaoPublica";

export default function ConcessaoPublicaSubmenuItems() {
  return (
    <>
      <li className="opacity-60">
        <div className="flex h-full items-center overflow-hidden px-2">
          <AreaTematicaIcon />
          <span className="ml-1 overflow-hidden text-ellipsis whitespace-nowrap">
            Boletins e informativos
          </span>
        </div>
      </li>
      <li>
        <DropdownLinksAreasTematicas />
      </li>
      <li>
        <DropdownLinksConcessaoPublica />
      </li>
    </>
  );
}
