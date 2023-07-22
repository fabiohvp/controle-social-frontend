import { FOLHA_DE_PAGAMENTO_PANEL_TITLE } from "@/app/folha-de-pagamento/folha-de-pagamento-constants";
import { MunicipioPageProps } from "@/app/municipio/[ano]/[municipio]/MunicipioPageProps";
import PessoalIcon from "@/components/images/icones/PessoalIcon";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import ContratacoesEDemissoesSubmenuItems from "../ContratacoesEDemissoesSubmenuItems";

export default function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      submenuItems={ContratacoesEDemissoesSubmenuItems}
    >
      <PanelWithTitle
        className="flex gap-10"
        collapsible
        headerClassName="font-bold text-xl"
        title={FOLHA_DE_PAGAMENTO_PANEL_TITLE}
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
      </PanelWithTitle>
      <div className="mt-2">
        <h3>Agentes públicos ativos</h3>
        <hr />
        {/* <div>TODO: implementar graficos</div> */}
      </div>
    </DashboardLayout>
  );
}
