import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import BoletinsInformativoIcon from "@/components/images/icons/BoletinsIcon";

export default function BreadcrumbBoletinsLabel() {
  return (
    <DropdownItemLabel className="opacity-60">
      <BoletinsInformativoIcon small />
      <span className="ml-1 ellipsis">Boletins e informativos</span>
    </DropdownItemLabel>
  );
}
