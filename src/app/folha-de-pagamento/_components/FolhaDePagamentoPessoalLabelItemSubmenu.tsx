import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import PessoalIcon from "@/components/images/icons/header/PessoalIcon";

export default function FolhaDePagamentoPessoalLabelItemSubmenu() {
  return (
    <DropdownItemLabel className="opacity-60">
      <PessoalIcon />
      <span className="ml-1 ellipsis">Pessoal</span>
    </DropdownItemLabel>
  );
}
