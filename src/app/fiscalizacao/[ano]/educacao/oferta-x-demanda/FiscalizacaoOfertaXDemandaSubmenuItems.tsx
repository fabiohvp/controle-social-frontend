import FiscalizacaoSubmenuLabel from "@/app/fiscalizacao/_components/FiscalizacaoSubmenuLabel";
import FiscalizacaoSubmenuLabelEducacao from "../_components/FiscalizacaoSubmenuLabelEducacao";
import FiscalizacaoSubmenuLabelOfertaXDemanda from "./_components/FiscalizacaoSubmenuLabelOfertaXDemanda";
import MenuFiscalizacaoOfertaXDemandaPages from "./_components/MenuFiscalizacaoOfertaXDemandaPages";

export default function FiscalizacaoOfertaXDemandaSubmenuItems() {
  return (
    <>
      <FiscalizacaoSubmenuLabel />
      <FiscalizacaoSubmenuLabelEducacao />
      <FiscalizacaoSubmenuLabelOfertaXDemanda />
      <MenuFiscalizacaoOfertaXDemandaPages />
    </>
  );
}
