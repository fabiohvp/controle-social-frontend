import MenuAreasTematicasPages from "../_components/MenuAreasTematicasPages";
import SubmenuLabelAreaTematica from "../_components/SubmenuLabelAreaTematica";
import MenuAreasTematicasSaudePages from "./_components/MenuAreasTematicasSaudePages";

export default function SaudeSubmenuItems() {
  return (
    <>
      <SubmenuLabelAreaTematica />
      <MenuAreasTematicasPages />
      <MenuAreasTematicasSaudePages />
    </>
  );
}
