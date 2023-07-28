import PessoalIcon from "@/components/images/icons/PessoalIcon";
import Input from "@/components/inputs/Input";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PainelComTituloMinimizavel from "@/components/paineis/PainelComTituloMinimizavel";
import { FaSearch } from "react-icons/fa";
import { FOLHA_DE_PAGAMENTO_PANEL_TITLE } from "../folhaDePagamentoConstants";
import ConsultaVinculoItensSubmenu from "./ConsultaVinculoItensSubmenu";

export default function Page() {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      itensSubmenu={ConsultaVinculoItensSubmenu}
    >
      <PainelComTituloMinimizavel
        header={FOLHA_DE_PAGAMENTO_PANEL_TITLE}
        headerProps={{ className: "font-bold text-xl" }}
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
      </PainelComTituloMinimizavel>
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
