import MenuAreasTematicasPages from "../_components/MenuAreasTematicasPages";
import SubmenuLabelAreaTematica from "../_components/SubmenuLabelAreaTematica";
import MenuAreasTematicasConcessaoPublicaPages from "./_components/MenuAreasTematicasConcessaoPublicaPages";

export default function ConcessaoPublicaSubmenuItems() {
  return (
    <>
      <SubmenuLabelAreaTematica />
      <MenuAreasTematicasPages />
      <MenuAreasTematicasConcessaoPublicaPages />
    </>
  );
}
