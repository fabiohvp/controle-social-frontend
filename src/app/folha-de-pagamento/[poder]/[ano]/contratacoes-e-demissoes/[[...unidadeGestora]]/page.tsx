import { FOLHA_DE_PAGAMENTO_PANEL_TITLE } from "@/app/folha-de-pagamento/folha-de-pagamento-constants";
import PessoalIcon from "@/components/images/icons/PessoalIcon";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";
import ContratacoesEDemissoesSubmenuItems from "../ContratacoesEDemissoesSubmenuItems";

export default function Page() {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      submenuItems={ContratacoesEDemissoesSubmenuItems}
    >
      <PanelWithTitleCollapsible
        header={FOLHA_DE_PAGAMENTO_PANEL_TITLE}
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          Os dados exibidos neste painel são declaratórios, tendo como fonte as
          remessas enviadas e homologadas por meio do sistema CidadES-Folha de
          Pagamento, conforme Anexo V da IN 68/2020. São considerados dados
          informados a partir de 2021.
          <br />
          Para os agentes públicos ativos, exceto os cedidos, considera-se
          ingresso quando um novo vínculo é iniciado e desligamento quando é
          encerrado, mas não se trata de transferência de lotação para outra
          unidade.
        </div>
        <div className="center w-4/12">
          <PessoalIcon />
        </div>
      </PanelWithTitleCollapsible>
      <div className="mt-2">
        <h3>Agentes públicos ativos</h3>
        <hr />
        {/* <div>TODO: implementar graficos</div> */}
      </div>
    </DashboardLayout>
  );
}
