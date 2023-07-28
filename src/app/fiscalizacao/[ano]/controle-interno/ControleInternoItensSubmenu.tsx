import FiscalizacaoLabelItemSubmenu from "../../_components/FiscalizacaoLabelItemSubmenu";
import ControleInternoLabelItemSubmenu from "./_components/ControleInternoLabelItemSubmenu";
import ControleInternoMenuAnos from "./_components/ControleInternoMenuAnos";
import ControleInternoMenuPaginas from "./_components/ControleInternoMenuPaginas";

export default function ControleInternoItensSubmenu() {
  return (
    <>
      <FiscalizacaoLabelItemSubmenu />
      <ControleInternoLabelItemSubmenu />
      <ControleInternoMenuPaginas />
      <ControleInternoMenuAnos />
    </>
  );
}
