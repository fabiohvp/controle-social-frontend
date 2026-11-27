import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import RankingIcon from "@/components/images/icons/RankingIcon";

export default function BreadcrumbRankingsLabel() {
  return (
    <DropdownItemLabel className="opacity-60">
      <RankingIcon small />
      <span className="ml-1 ellipsis">Rankings</span>
    </DropdownItemLabel>
  );
}
