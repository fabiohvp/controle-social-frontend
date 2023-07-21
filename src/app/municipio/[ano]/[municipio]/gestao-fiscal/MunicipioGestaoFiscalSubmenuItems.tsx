import MenuMunicipios from "../_components/MenuMunicipios";
import MenuMunicipiosAnos from "../_components/MenuMunicipiosAnos";
import MenuMunicipiosGestaoFiscal from "../_components/MenuMunicipiosGestaoFiscal";
import MenuMunicipiosPages from "../_components/MenuMunicipiosPages";

export default function MunicipioGestaoFiscalSubmenuItems() {
  return (
    <>
      <MenuMunicipios />
      <MenuMunicipiosPages />
      <MenuMunicipiosGestaoFiscal />
      <MenuMunicipiosAnos />
    </>
  );
}
