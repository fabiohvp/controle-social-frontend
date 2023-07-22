import FiscalizacaoSubmenuLabel from "../../_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelControleInterno from "./_components/FiscalizacaoSubmenuLabelControleInterno";
import MenuFiscalizacaoControleInternoAnos from "./_components/MenuFiscalizacaoControleInternoAnos";
import MenuFiscalizacaoControleInternoPages from "./_components/MenuFiscalizacaoControleInternoPages";

export default function ControleInternoSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelControleInterno />
      <MenuFiscalizacaoControleInternoPages />
      <MenuFiscalizacaoControleInternoAnos />
    </>
  );
}
