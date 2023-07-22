import MenuAreasTematicasPages from "../_components/MenuAreasTematicasPages";
import SubmenuLabelAreaTematica from "../_components/SubmenuLabelAreaTematica";
import MenuAreasTematicasAssistenciaSocialPages from "./_components/MenuAreasTematicasAssistenciaSocialPages";

export default function AssistenciaSocialSubmenuItems() {
  return (
    <>
      <SubmenuLabelAreaTematica />
      <MenuAreasTematicasPages />
      <MenuAreasTematicasAssistenciaSocialPages />
    </>
  );
}
