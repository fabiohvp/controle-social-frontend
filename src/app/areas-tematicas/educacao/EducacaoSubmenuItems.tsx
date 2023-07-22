import MenuAreasTematicasPages from "../_components/MenuAreasTematicasPages";
import SubmenuLabelAreaTematica from "../_components/SubmenuLabelAreaTematica";
import MenuAreasTematicasEducacaoPages from "./_components/MenuAreasTematicasEducacaoPages";

export default function ConcessaoPublicaSubmenuItems() {
  return (
    <>
      <SubmenuLabelAreaTematica />
      <MenuAreasTematicasPages />
      <MenuAreasTematicasEducacaoPages />
    </>
  );
}
