import BoletinsInformativoIcon from "@/components/images/icones/BoletinsIcon";
import DropdownLinksBoletins from "./_components/DropdownLinksBoletins";
import DropdownLinksBoletinsAnos from "./_components/DropdownLinksBoletinsAnos";

export default function BoletinsSubmenuItems() {
  return (
    <>
      <li className="opacity-60">
        <div className="flex h-full items-center overflow-hidden px-2">
          <BoletinsInformativoIcon />
          <span className="ml-1 overflow-hidden text-ellipsis whitespace-nowrap">
            Boletins e informativos
          </span>
        </div>
      </li>
      <li>
        <DropdownLinksBoletins />
      </li>
      <li>
        <DropdownLinksBoletinsAnos />
      </li>
    </>
  );
}
