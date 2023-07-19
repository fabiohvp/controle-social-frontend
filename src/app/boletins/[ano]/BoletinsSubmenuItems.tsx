import BoletinsInformativoIcon from "@/components/images/icones/BoletinsIcon";
import DropdownLinksBoletins from "./_components/DropdownLinksBoletins";
import DropdownLinksBoletinsAnos from "./_components/DropdownLinksBoletinsAnos";

export default function BoletinsSubmenuItems() {
  return (
    <>
      <li className="px-2 opacity-60">
        <BoletinsInformativoIcon />
        <span className="ml-1">Boletins e informativos</span>
      </li>
      <li>
        <DropdownLinksBoletins />
      </li>
      <li>
        <DropdownLinksBoletinsAnos minWidth="80px" />
      </li>
    </>
  );
}
