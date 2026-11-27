import {
  ContribuicaoPrevidenciariaWidget,
  DescontosWidget,
  PagamentosConsolidadosWidget,
  SituacaoRemessaWidget,
  VantagensDestaqueWidget,
  VantagensWidget,
} from "@/app/folha-de-pagamento/_components/visao-geral/VisaoGeralWidgets";
import { FOLHA_DE_PAGAMENTO_PANEL_TITLE } from "@/app/folha-de-pagamento/folhaDePagamentoConstants";
import PessoalIcon from "@/components/images/icons/PessoalIcon";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";
import BreadcrumbFolhaDePagamento from "../../BreadcrumbFolhaDePagamento";

type Props = {
  params: Promise<{
    ano: string;
    mes: string;
    poder: string;
    unidadeGestora?: string[];
  }>;
};

export default async function Page({ params }: Props) {
  const filtros = await params;

  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbFolhaDePagamento}
    >
      <PanelWithTitleCollapsible
        header={FOLHA_DE_PAGAMENTO_PANEL_TITLE}
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          Os dados exibidos neste painel são declaratórios, tendo como fonte as
          remessas enviadas e homologadas por meio do sistema CidadES-Folha de
          Pagamento, conforme Anexo V da IN 68/2020. São considerados dados
          informados a partir de 2020.
          <br />
          Os valores referentes às informações consolidadas podem não
          corresponder à soma dos demais grupos, pois apenas no primeiro são
          consideradas pensões especiais e benefícios de auxílio reclusão, bem
          como agentes que já foram desligados, mas ainda fazem jus a alguma
          vantagem.
        </div>
        <div className="center w-4/12">
          <PessoalIcon />
        </div>
      </PanelWithTitleCollapsible>
      <div className="mt-2">
        <h3>Informações consolidadas</h3>
        <hr />
        <div className="gap-2 grid grid-cols-1 md:grid-cols-3 mt-2">
          <PagamentosConsolidadosWidget filtros={filtros} />
          <ContribuicaoPrevidenciariaWidget filtros={filtros} />
          <SituacaoRemessaWidget filtros={filtros} />
          <VantagensDestaqueWidget filtros={filtros} />
          <VantagensWidget filtros={filtros} />
          <DescontosWidget filtros={filtros} />
        </div>
      </div>
    </DashboardLayout>
  );
}
