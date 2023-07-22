import MenuEstadoAnos from "../_components/MenuEstadoAnos";
import MenuEstadoGestaoFiscalPages from "../_components/MenuEstadoGestaoFiscalPages";
import {
  default as MenuEstado,
  default as MenuMunicipiosPages,
} from "../_components/MenuEstadoPages";

export default function MunicipioGestaoFiscalSubmenuItems() {
  return (
    <>
      <MenuEstado />
      <MenuMunicipiosPages />
      <MenuEstadoGestaoFiscalPages />
      <MenuEstadoAnos />
    </>
  );
}
