import MenuAreasTematicasAssistenciaSocialPages from "../_components/MenuAreasTematicasAssistenciaSocialPages";
import MenuAreasTematicasPages from "../_components/MenuAreasTematicasPages";
import SubmenuLabelAreaTematica from "../_components/SubmenuLabelAreaTematica";

export default function AssistenciaSocialSubmenuItems() {
  return (
    <>
      <SubmenuLabelAreaTematica />
      <MenuAreasTematicasPages />
      <MenuAreasTematicasAssistenciaSocialPages />
    </>
  );
}
