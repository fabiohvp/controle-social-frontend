import DropdownLinksAnos from "../_components/dropdowns/DropdownLinksAnos";
import DropdownLinksGestaoFiscal from "../_components/dropdowns/DropdownLinksGestaoFiscal";
import DropdownLinksMunicipios from "../_components/dropdowns/DropdownLinksMunicipios";
import DropdownLinksRootPages from "../_components/dropdowns/DropdownLinksRootPages";

export default function MunicipioGestaoFiscalSubmenuItems() {
  return (
    <>
      <li>
        <DropdownLinksMunicipios />
      </li>
      <li>
        <DropdownLinksRootPages />
      </li>
      <li>
        <DropdownLinksGestaoFiscal />
      </li>
      <li>
        <DropdownLinksAnos minWidth="100px" />
      </li>
    </>
  );
}
