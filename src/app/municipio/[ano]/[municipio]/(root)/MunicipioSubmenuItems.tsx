import MenuMunicipios from "../_components/MenuMunicipios";
import MenuMunicipiosAnos from "../_components/MenuMunicipiosAnos";
import MenuMunicipiosPages from "../_components/MenuMunicipiosPages";

export default function MunicipioSubmenuItems() {
  return (
    <>
      <MenuMunicipios />
      <MenuMunicipiosPages />
      <MenuMunicipiosAnos />
    </>
  );
}
