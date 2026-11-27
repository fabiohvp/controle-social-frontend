import {
  EvolucaoPagamentosAtivosWidget,
  EvolucaoQuantidadePorVinculoWidget,
  FaixaEtariaAtivosWidget,
  OcupacoesPorCargoWidget,
  OcupacoesPorVinculoWidget,
  PagamentosPorCargoWidget,
  PagamentosPorVinculoWidget,
} from "@/app/folha-de-pagamento/_components/ativos/AtivosWidgets";
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
        </div>
        <div className="center w-4/12">
          <PessoalIcon />
        </div>
      </PanelWithTitleCollapsible>
      <div className="mt-2 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold">Agentes públicos ativos</h3>
          <hr className="my-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <OcupacoesPorVinculoWidget filtros={filtros} />
          <OcupacoesPorCargoWidget filtros={filtros} />
          <PagamentosPorVinculoWidget filtros={filtros} />
          <PagamentosPorCargoWidget filtros={filtros} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <FaixaEtariaAtivosWidget filtros={filtros} />
          </div>
          <div className="lg:col-span-2">
            <EvolucaoQuantidadePorVinculoWidget filtros={filtros} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <EvolucaoPagamentosAtivosWidget filtros={filtros} />
        </div>
      </div>
    </DashboardLayout>
  );
}
