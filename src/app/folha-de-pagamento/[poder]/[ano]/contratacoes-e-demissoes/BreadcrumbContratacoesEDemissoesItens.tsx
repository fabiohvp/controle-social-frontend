import BreadcrumbFolhaDePagamentoPaginas from "@/app/folha-de-pagamento/_components/BreadcrumbFolhaDePagamentoPaginas";
import BreadcrumbFolhaDePagamentoPoderes from "@/app/folha-de-pagamento/_components/BreadcrumbFolhaDePagamentoPoderes";
import BreadcrumbFolhaDePagamentoTipoUnidadesGestoras from "@/app/folha-de-pagamento/_components/BreadcrumbFolhaDePagamentoTipoUnidadesGestoras";
import BreadcrumbPessoalLabel from "@/app/folha-de-pagamento/_components/BreadcrumbPessoalLabel";
import FolhaDePagamentoMenuAnos from "@/app/folha-de-pagamento/_components/FolhaDePagamentoMenuAnos";

export default function BreadcrumbContratacoesEDemissoes() {
  return (
    <>
      <BreadcrumbPessoalLabel />
      <BreadcrumbFolhaDePagamentoPaginas />
      <BreadcrumbFolhaDePagamentoPoderes />
      <FolhaDePagamentoMenuAnos />
      <BreadcrumbFolhaDePagamentoTipoUnidadesGestoras />
    </>
  );
}
