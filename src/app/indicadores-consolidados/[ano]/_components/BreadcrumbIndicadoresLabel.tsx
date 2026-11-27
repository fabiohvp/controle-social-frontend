import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import IndicadoresIcon from "@/components/images/icons/IndicadoresIcon";

export default function BreadcrumbIndicadoresLabel() {
  return (
    <DropdownItemLabel className="opacity-60">
      <IndicadoresIcon small />
      <span className="ml-1 ellipsis">Indicadores Consolidados</span>
    </DropdownItemLabel>
  );
}
