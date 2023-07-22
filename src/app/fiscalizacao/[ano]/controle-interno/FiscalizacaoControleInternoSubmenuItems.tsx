import FiscalizacaoSubmenuLabel from "../../_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelControleInterno from "./_components/FiscalizacaoSubmenuLabelControleInterno";
import MenuFiscalizacaoControleInterno from "./_components/MenuFiscalizacaoControleInterno";
import MenuFiscalizacaoControleInternoAnos from "./_components/MenuFiscalizacaoControleInternoAnos";

export default function ControleInternoSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelControleInterno />
      <MenuFiscalizacaoControleInterno />
      <MenuFiscalizacaoControleInternoAnos />
    </>
  );
}
