import MenuAreasTematicasPages from "../_components/MenuAreasTematicasPages";
import MenuAreasTematicasSaudePages from "../_components/MenuAreasTematicasSaudePages";
import SubmenuLabelAreaTematica from "../_components/SubmenuLabelAreaTematica";

export default function SaudeSubmenuItems() {
  return (
    <>
      <SubmenuLabelAreaTematica />
      <MenuAreasTematicasPages />
      <MenuAreasTematicasSaudePages />
    </>
  );
}
