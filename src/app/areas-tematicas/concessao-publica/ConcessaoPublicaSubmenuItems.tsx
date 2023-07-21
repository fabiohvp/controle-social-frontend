import MenuAreasTematicasConcessaoPublica from "../_components/MenuAreasTematicasConcessaoPublica";
import MenuAreasTematicasPages from "../_components/MenuAreasTematicasPages";
import SubmenuLabelAreaTematica from "../_components/SubmenuLabelAreaTematica";

export default function ConcessaoPublicaSubmenuItems() {
  return (
    <>
      <SubmenuLabelAreaTematica />
      <MenuAreasTematicasPages />
      <MenuAreasTematicasConcessaoPublica />
    </>
  );
}
