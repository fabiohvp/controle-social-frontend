import CrasLogo from "@/components/images/logos/CrasLogo";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import ExternalLink from "@/components/links/ExternalLink";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";
import { ReactNode } from "react";
import BreadcrumbAssistenciaSocial from "./BreadcrumbAssistenciaSocial";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="px-2 pt-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbAssistenciaSocial}
    >
      <PanelWithTitleCollapsible
        header="Centros de Referência da Assistência Social (CRAS)."
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            <span className="font-bold">
              CRAS (Centros de Referência da Assistência Social)
            </span>{" "}
            são os equipamentos do sistema socioassistencial ligados à Proteção
            Social Básica, que oferecem gratuitamente serviços de fortalecimento
            de vínculos familiares, mantém atualizados os dados no Cadastro
            Único do Governo Federal, fornecem orientações em casos de violência
            doméstica e concedem benefícios eventuais.{" "}
            <span className="font-bold">
              Saiba mais sobre os CRAS{" "}
              <ExternalLink href="https://www.gov.br/mds/pt-br/acoes-e-programas/assistencia-social/unidades-de-atendimento/centro-de-referencia-de-assistencia-social-cras">
                clicando aqui
              </ExternalLink>
            </span>
            .
          </p>
          <p className="mt-2">
            O{" "}
            <span className="font-bold">
              Censo do Sistema Único de Assistência Social (SUAS)
            </span>{" "}
            é o processo anual de moniteramento e coleta de informações sobre os
            padrões de serviços, programas e projetos realizado do SUAS. As
            informações apresentadas neste painel são provenientes desse censo.{" "}
            <span className="font-bold">
              Saiba mais sobre o Censo SUAS{" "}
              <ExternalLink href="https://www.gov.br/mds/pt-br/pt-br/acoes-e-programas/assistencia-social/gestao-do-suas/vigilancia-socioassistencial-1/censo-suas">
                clicando aqui
              </ExternalLink>
            </span>
            .
          </p>
        </div>
        <div className="center w-4/12">
          <CrasLogo />
        </div>
      </PanelWithTitleCollapsible>
      {children}
    </DashboardLayout>
  );
}
