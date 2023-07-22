import {
  default as MenuEstado,
  default as MenuMunicipiosPages,
} from "../_components/MenuEstadoPages";

export default function MunicipioSubmenuItems() {
  return (
    <>
      <MenuEstado />
      <MenuMunicipiosPages />
    </>
  );
}
