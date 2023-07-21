import MenuFolhaDePagamentoAnos from "@/app/folha-de-pagamento/_components/MenuFolhaDePagamentoAnos";
import MenuFolhaDePagamentoMeses from "@/app/folha-de-pagamento/_components/MenuFolhaDePagamentoMeses";
import MenuFolhaDePagamento from "@/app/folha-de-pagamento/_components/MenuFolhaDePagamentoPages";
import MenuFolhaDePagamentoPoder from "@/app/folha-de-pagamento/_components/MenuFolhaDePagamentoPoder";
import MenuFolhaDePagamentoTipoUnidadesGestoras from "@/app/folha-de-pagamento/_components/MenuFolhaDePagamentoTipoUnidadesGestoras";
import SubmenuLabelPessoal from "@/app/folha-de-pagamento/_components/SubmenuLabelPessoal";

export default function FolhaDePagamentoSubmenuItems() {
  return (
    <>
      <SubmenuLabelPessoal />
      <MenuFolhaDePagamento />
      <MenuFolhaDePagamentoPoder />
      <MenuFolhaDePagamentoAnos />
      <MenuFolhaDePagamentoMeses />
      <MenuFolhaDePagamentoTipoUnidadesGestoras />
    </>
  );
}
