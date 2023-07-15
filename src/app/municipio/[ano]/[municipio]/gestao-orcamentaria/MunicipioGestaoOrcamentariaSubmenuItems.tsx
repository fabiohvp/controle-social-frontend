import DropdownLinksAnos from "../_components/dropdowns/DropdownLinksAnos";
import DropdownLinksGestaoOrcamentaria from "../_components/dropdowns/DropdownLinksGestaoOrcamentaria";
import DropdownLinksMunicipios from "../_components/dropdowns/DropdownLinksMunicipios";
import DropdownLinksRootPages from "../_components/dropdowns/DropdownLinksRootPages";

export default function MunicipioGestaoOrcamentariaSubmenuItems() {
  return (
    <>
      <li>
        <DropdownLinksMunicipios />
      </li>
      <li>
        <DropdownLinksRootPages />
      </li>
      <li>
        <DropdownLinksGestaoOrcamentaria />
      </li>
      <li>
        <DropdownLinksAnos minWidth="80px" />
      </li>
    </>
  );
}
