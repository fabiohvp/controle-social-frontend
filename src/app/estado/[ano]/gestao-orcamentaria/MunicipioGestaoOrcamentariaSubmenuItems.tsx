import MenuEstadoAnos from "../_components/MenuEstadoAnos";
import MenuEstadoGestaoOrcamentariaPages from "../_components/MenuEstadoGestaoOrcamentariaPages";
import {
  default as MenuEstado,
  default as MenuMunicipiosPages,
} from "../_components/MenuEstadoPages";

export default function MunicipioGestaoOrcamentariaSubmenuItems() {
  return (
    <>
      <MenuEstado />
      <MenuMunicipiosPages />
      <MenuEstadoGestaoOrcamentariaPages />
      <MenuEstadoAnos />
    </>
  );
}
