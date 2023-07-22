import MenuMunicipios from "../_components/MenuMunicipios";
import MenuMunicipiosAnos from "../_components/MenuMunicipiosAnos";
import MenuMunicipiosGestaoFiscalPages from "../_components/MenuMunicipiosGestaoFiscalPages";
import MenuMunicipiosPages from "../_components/MenuMunicipiosPages";

export default function MunicipioGestaoFiscalSubmenuItems() {
  return (
    <>
      <MenuMunicipios />
      <MenuMunicipiosPages />
      <MenuMunicipiosGestaoFiscalPages />
      <MenuMunicipiosAnos />
    </>
  );
}
