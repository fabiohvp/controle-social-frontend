import DropdownLinksGestaoFiscal from "../_components/dropdowns/DropdownLinksGestaoFiscal";
import DropdownLinksMunicipiosAnos from "../_components/dropdowns/DropdownLinksMunicipiosAnos";
import DropdownLinksMunicipiosNomes from "../_components/dropdowns/DropdownLinksMunicipiosNomes";
import DropdownLinksRootPages from "../_components/dropdowns/DropdownLinksRootPages";

export default function MunicipioGestaoFiscalSubmenuItems() {
  return (
    <>
      <li>
        <DropdownLinksMunicipiosNomes />
      </li>
      <li>
        <DropdownLinksRootPages />
      </li>
      <li>
        <DropdownLinksGestaoFiscal />
      </li>
      <li>
        <DropdownLinksMunicipiosAnos />
      </li>
    </>
  );
}
