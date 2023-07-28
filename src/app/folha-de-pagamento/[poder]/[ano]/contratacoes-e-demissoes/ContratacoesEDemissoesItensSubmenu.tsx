import FolhaDePagamentoMenuAnos from "@/app/folha-de-pagamento/_components/FolhaDePagamentoMenuAnos";
import FolhaDePagamentoMenuPaginas from "@/app/folha-de-pagamento/_components/FolhaDePagamentoMenuPaginas";
import FolhaDePagamentoMenuPoderes from "@/app/folha-de-pagamento/_components/FolhaDePagamentoMenuPoderes";
import FolhaDePagamentoMenuTipoUnidadesGestoras from "@/app/folha-de-pagamento/_components/FolhaDePagamentoMenuTipoUnidadesGestoras";
import FolhaDePagamentoPessoalLabelItemSubmenu from "@/app/folha-de-pagamento/_components/FolhaDePagamentoPessoalLabelItemSubmenu";

export default function ContratacoesEDemissoesItensSubmenu() {
  return (
    <>
      <FolhaDePagamentoPessoalLabelItemSubmenu />
      <FolhaDePagamentoMenuPaginas />
      <FolhaDePagamentoMenuPoderes />
      <FolhaDePagamentoMenuAnos />
      <FolhaDePagamentoMenuTipoUnidadesGestoras />
    </>
  );
}
