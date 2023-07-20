import DropdownLinksGestaoOrcamentaria from "../_components/dropdowns/DropdownLinksGestaoOrcamentaria";
import DropdownLinksMunicipiosAnos from "../_components/dropdowns/DropdownLinksMunicipiosAnos";
import DropdownLinksMunicipiosNomes from "../_components/dropdowns/DropdownLinksMunicipiosNomes";
import DropdownLinksRootPages from "../_components/dropdowns/DropdownLinksRootPages";

export default function MunicipioGestaoOrcamentariaSubmenuItems() {
  return (
    <>
      <li>
        <DropdownLinksMunicipiosNomes />
      </li>
      <li>
        <DropdownLinksRootPages />
      </li>
      <li>
        <DropdownLinksGestaoOrcamentaria />
      </li>
      <li>
        <DropdownLinksMunicipiosAnos />
      </li>
    </>
  );
}
