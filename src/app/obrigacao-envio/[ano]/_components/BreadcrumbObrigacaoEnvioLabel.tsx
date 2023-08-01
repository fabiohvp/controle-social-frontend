import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import ObrigacoesIcon from "@/components/images/icons/header/ObrigacoesIcon";

export default function BreadcrumbObrigacaoEnvioLabel() {
  return (
    <DropdownItemLabel className="opacity-60">
      <ObrigacoesIcon />
      <span className="ml-1 ellipsis">Obrigações junto ao TCE-ES</span>
    </DropdownItemLabel>
  );
}
