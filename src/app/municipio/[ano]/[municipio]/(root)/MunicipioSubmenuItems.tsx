import DropdownLinksAnos from "../_components/dropdowns/DropdownLinksAnos";
import DropdownLinksMunicipios from "../_components/dropdowns/DropdownLinksMunicipios";
import DropdownLinksRootPages from "../_components/dropdowns/DropdownLinksRootPages";

export default function MunicipioSubmenuItems() {
  return (
    <>
      <li>
        <DropdownLinksMunicipios />
      </li>
      <li>
        <DropdownLinksRootPages />
      </li>
      <li>
        <DropdownLinksAnos minWidth="80px" />
      </li>
    </>
  );
}
