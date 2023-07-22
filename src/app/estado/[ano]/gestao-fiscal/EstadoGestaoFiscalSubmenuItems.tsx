import MenuEstadoAnos from "../_components/MenuEstadoAnos";
import MenuEstadoGestaoFiscalPages from "../_components/MenuEstadoGestaoFiscalPages";
import MenuEstado from "../_components/MenuEstadoPages";

export default function EstadoGestaoFiscalSubmenuItems() {
  return (
    <>
      <MenuEstado />
      <MenuEstadoGestaoFiscalPages />
      <MenuEstadoAnos />
    </>
  );
}
