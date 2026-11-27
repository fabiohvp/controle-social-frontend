import PessoalIcon from "@/components/images/icons/PessoalIcon";
import Iframe from "@/components/iframes/Iframe";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";
import { ReactNode } from "react";
import { FOLHA_DE_PAGAMENTO_PANEL_TITLE } from "../folhaDePagamentoConstants";
import BreadcrumbPessoalSemFiltros from "./BreadcrumbPessoalSemFiltros";

type Props = {
  alturaPainel: string;
  children: ReactNode;
  tituloPainel: string;
  urlPainel: string;
};

export default function PessoalPainelExterno({
  alturaPainel,
  children,
  tituloPainel,
  urlPainel,
}: Props) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbPessoalSemFiltros}
    >
      <PanelWithTitleCollapsible
        header={FOLHA_DE_PAGAMENTO_PANEL_TITLE}
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>{children}</div>
        <div className="center w-4/12">
          <PessoalIcon />
        </div>
      </PanelWithTitleCollapsible>
      <div className="mt-2">
        <Iframe
          className="border-0 w-full"
          src={urlPainel}
          style={{ height: alturaPainel }}
          title={tituloPainel}
        />
      </div>
    </DashboardLayout>
  );
}
