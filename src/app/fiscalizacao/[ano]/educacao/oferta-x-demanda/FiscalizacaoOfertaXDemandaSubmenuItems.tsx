import FiscalizacaoSubmenuLabel from "@/app/fiscalizacao/_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelEducacao from "../_components/FiscalizacaoSubmenuLabelEducacao";
import FiscalizacaoSubmenuLabelOfertaXDemanda from "./_components/FiscalizacaoSubmenuLabelOfertaXDemanda";
import MenuFiscalizacaoOfertaXDemanda from "./_components/MenuFiscalizacaoOfertaXDemanda";

export default function FiscalizacaoOfertaXDemandaSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelEducacao />
      <FiscalizacaoSubmenuLabelOfertaXDemanda />
      <MenuFiscalizacaoOfertaXDemanda />
    </>
  );
}
