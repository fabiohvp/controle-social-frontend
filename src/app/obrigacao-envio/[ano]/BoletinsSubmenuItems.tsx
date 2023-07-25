import MenuBoletinsAnos from "./_components/MenuBoletinsAnos";
import MenuBoletinsPages from "./_components/MenuBoletinsPages";
import SubmenuLabelBoletins from "./_components/SubmenuLabelBoletins";

export default function BoletinsSubmenuItems() {
  return (
    <>
      <SubmenuLabelBoletins />
      <MenuBoletinsPages />
      <MenuBoletinsAnos />
    </>
  );
}
