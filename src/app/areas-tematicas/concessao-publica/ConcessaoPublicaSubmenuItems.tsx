import MenuAreasTematicasConcessaoPublicaPages from "../_components/MenuAreasTematicasConcessaoPublicaPages";
import MenuAreasTematicasPages from "../_components/MenuAreasTematicasPages";
import SubmenuLabelAreaTematica from "../_components/SubmenuLabelAreaTematica";

export default function ConcessaoPublicaSubmenuItems() {
  return (
    <>
      <SubmenuLabelAreaTematica />
      <MenuAreasTematicasPages />
      <MenuAreasTematicasConcessaoPublicaPages />
    </>
  );
}
