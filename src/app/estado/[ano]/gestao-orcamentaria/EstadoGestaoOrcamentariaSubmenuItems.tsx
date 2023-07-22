import MenuEstadoAnos from "../_components/MenuEstadoAnos";
import MenuEstadoGestaoOrcamentariaPages from "../_components/MenuEstadoGestaoOrcamentariaPages";
import MenuEstado from "../_components/MenuEstadoPages";

export default function EstadoGestaoOrcamentariaSubmenuItems() {
  return (
    <>
      <MenuEstado />
      <MenuEstadoGestaoOrcamentariaPages />
      <MenuEstadoAnos />
    </>
  );
}
