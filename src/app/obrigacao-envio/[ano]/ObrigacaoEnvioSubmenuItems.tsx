import MenuObrigacaoEnvioAnos from "./_components/MenuObrigacaoEnvioAnos";
import MenuObrigacaoEnvioPages from "./_components/MenuObrigacaoEnvioPages";
import SubmenuLabelObrigacaoEnvio from "./_components/SubmenuLabelObrigacaoEnvio";

export default function ObrigacaoEnvioSubmenuItems() {
  return (
    <>
      <SubmenuLabelObrigacaoEnvio />
      <MenuObrigacaoEnvioPages />
      <MenuObrigacaoEnvioAnos />
    </>
  );
}
