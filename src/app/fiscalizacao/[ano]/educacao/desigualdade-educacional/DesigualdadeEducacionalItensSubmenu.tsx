import FiscalizacaoLabelItemSubmenu from "../../../_components/FiscalizacaoLabelItemSubmenu";
import EducacaoLabelItemSubmenu from "../_components/EducacaoLabelItemSubmenu";
import DesigualdadeEducacionalLabelItemSubmenu from "./_components/DesigualdadeEducacionalLabelItemSubmenu";
import DesigualdadeEducacionalMenuPaginas from "./_components/DesigualdadeEducacionalMenuPaginas";

export default function DesigualdadeEducacionalItensSubmenu() {
  return (
    <>
      <FiscalizacaoLabelItemSubmenu />
      <EducacaoLabelItemSubmenu />
      <DesigualdadeEducacionalLabelItemSubmenu />
      <DesigualdadeEducacionalMenuPaginas />
    </>
  );
}
