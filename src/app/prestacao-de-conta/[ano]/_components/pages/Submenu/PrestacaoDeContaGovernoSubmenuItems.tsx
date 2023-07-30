import PrestacaoDeContaLabelItemSubmenu from "./PrestacaoDeContaLabelItemSubmenu";
import PrestacaoDeContaMenuAnos from "./PrestacaoDeContaMenuAnos";
import PrestacaoDeContaMenuPaginas from "./PrestacaoDeContaMenuPaginas";
import PrestacaoDeContaMenuTipoUnidadeGestora from "./PrestacaoDeContaMenuTipoUnidadeGestora";

export default function PrestacaoDeContaGovernoSubmenuItems() {
  return (
    <>
      <PrestacaoDeContaLabelItemSubmenu />
      <PrestacaoDeContaMenuPaginas />
      <PrestacaoDeContaMenuAnos />
      <PrestacaoDeContaMenuTipoUnidadeGestora />
    </>
  );
}
