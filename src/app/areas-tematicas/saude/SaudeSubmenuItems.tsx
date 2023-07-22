import MenuAreasTematicasPages from "../_components/MenuAreasTematicasPages";
import MenuAreasTematicasSaude from "../_components/MenuAreasTematicasSaude";
import SubmenuLabelAreaTematica from "../_components/SubmenuLabelAreaTematica";

export default function SaudeSubmenuItems() {
  return (
    <>
      <SubmenuLabelAreaTematica />
      <MenuAreasTematicasPages />
      <MenuAreasTematicasSaude />
    </>
  );
}
