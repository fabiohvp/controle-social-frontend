import MenuMunicipios from "../_components/MenuMunicipios";
import MenuMunicipiosAnos from "../_components/MenuMunicipiosAnos";
import MenuMunicipiosGestaoOrcamentaria from "../_components/MenuMunicipiosGestaoOrcamentaria";
import MenuMunicipiosPages from "../_components/MenuMunicipiosPages";

export default function MunicipioGestaoOrcamentariaSubmenuItems() {
  return (
    <>
      <MenuMunicipios />
      <MenuMunicipiosPages />
      <MenuMunicipiosGestaoOrcamentaria />
      <MenuMunicipiosAnos />
    </>
  );
}
