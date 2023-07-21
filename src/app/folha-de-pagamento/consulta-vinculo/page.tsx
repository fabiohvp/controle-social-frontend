import PessoalIcon from "@/components/images/icones/PessoalIcon";
import Input from "@/components/inputs/Input";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { FaSearch } from "react-icons/fa";
import { FOLHA_DE_PAGAMENTO_PANEL_TITLE } from "../folha-de-pagamento-constants";
import ConsultaVinculoSubmenuItems from "./ConsultaVinculoSubmenuItems";

export default function Page() {
  return (
    <DashboardLayout
      className="p-2"
      exibirFooter={false}
      submenuItems={ConsultaVinculoSubmenuItems}
    >
      <PanelWithTitle
        className="flex gap-10"
        collapsible
        headerClassName="font-bold text-xl"
        title={FOLHA_DE_PAGAMENTO_PANEL_TITLE}
      >
        <div>
          Os dados exibidos neste painel são declaratórios, tendo como fonte as
          remessas enviadas e homologadas pela unidade gestora por meio do
          sistema CidadES-Folha de Pagamento, conforme Anexo V da IN 68/2020.
          São considerados dados informados a partir de 2022.
        </div>
        <div className="center w-4/12">
          <PessoalIcon />
        </div>
      </PanelWithTitle>
      <div className="mt-2">
        <h3>Consulta</h3>
        <hr />
        <form>
          <div className="mt-2">
            <label htmlFor="cpf">CPF</label>
            <Input type="text" className="block" id="cpf" />
          </div>
          <div className="mt-2">
            <label htmlFor="nome">Nome</label>
            <Input type="text" className="block" id="nome" disabled />
          </div>
          <button className="button mt-2 primary">
            <FaSearch className="mr-1" /> Consultar
          </button>
        </form>
      </div>
      {/* <div>TODO: add captcha</div> */}
    </DashboardLayout>
  );
}
