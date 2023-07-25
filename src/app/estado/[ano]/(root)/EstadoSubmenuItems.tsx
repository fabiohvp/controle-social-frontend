import MenuEstadoAnos from "../_components/MenuEstadoAnos";
import MenuEstadoPages from "../_components/MenuEstadoPages";
import SubmenuLabelEstado from "../_components/SubmenuLabelEstado";

export default function EstadoSubmenuItems() {
  return (
    <>
      <SubmenuLabelEstado />
      <MenuEstadoPages />
      <MenuEstadoAnos />
    </>
  );
}
