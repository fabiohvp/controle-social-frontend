import BoletinsInformativoIcon from "@/components/images/icones/BoletinsIcon";
import DropdownLinksBoletins from "./_components/DropdownLinksBoletins";

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
      <li>{/* <DropdownLinksAnos minWidth="80px" /> */}</li>
    </>
  );
}
