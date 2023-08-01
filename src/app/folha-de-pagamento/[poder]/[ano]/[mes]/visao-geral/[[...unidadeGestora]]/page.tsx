import { FOLHA_DE_PAGAMENTO_PANEL_TITLE } from "@/app/folha-de-pagamento/folhaDePagamentoConstants";
import PessoalIcon from "@/components/images/icons/PessoalIcon";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PainelComTituloMinimizavel from "@/components/paineis/PainelComTituloMinimizavel";
import BreadcrumbFolhaDePagamento from "../../BreadcrumbFolhaDePagamento";

export default function Page() {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbFolhaDePagamento}
    >
      <PainelComTituloMinimizavel
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
      </PainelComTituloMinimizavel>
      <div className="mt-2">
        <h3>Agentes públicos ativos</h3>
        <hr />
        {/* <div>TODO: implementar graficos</div> */}
      </div>
    </DashboardLayout>
  );
}
