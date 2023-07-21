import MenuAreasTematicasAssistenciaSocial from "../_components/MenuAreasTematicasAssistenciaSocial";
import MenuAreasTematicasPages from "../_components/MenuAreasTematicasPages";
import SubmenuLabelAreaTematica from "../_components/SubmenuLabelAreaTematica";

export default function AssistenciaSocialSubmenuItems() {
  return (
    <>
      <SubmenuLabelAreaTematica />
      <MenuAreasTematicasPages />
      <MenuAreasTematicasAssistenciaSocial />
    </>
  );
}
