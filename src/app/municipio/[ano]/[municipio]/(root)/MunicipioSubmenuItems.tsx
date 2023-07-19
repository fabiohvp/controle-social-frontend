import DropdownLinksMunicipiosAnos from "../_components/dropdowns/DropdownLinksMunicipiosAnos";
import DropdownLinksMunicipiosNomes from "../_components/dropdowns/DropdownLinksMunicipiosNomes";
import DropdownLinksRootPages from "../_components/dropdowns/DropdownLinksRootPages";

export default function MunicipioSubmenuItems() {
  return (
    <>
      <li>
        <DropdownLinksMunicipiosNomes />
      </li>
      <li>
        <DropdownLinksRootPages />
      </li>
      <li>
        <DropdownLinksMunicipiosAnos minWidth="80px" />
      </li>
    </>
  );
}
