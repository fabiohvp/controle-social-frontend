import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import SidebarMunicipios from "../../_components/SidebarMunicipios";
import MunicipioSubmenuItems from "../MunicipioSubmenuItems";
import { DespesaReceitaCorrentesPanel } from "./_panels/DespesaReceitaCorrentesPanel";
import { EducacaoPanel } from "./_panels/EducacaoPanel";
import { FundoFinanceiroPanel } from "./_panels/FundoFinanceiroPanel";
import { FundoPrevidenciarioPanel } from "./_panels/FundoPrevidenciarioPanel";
import { ObrigacoesJuntoTCEESPanel } from "./_panels/ObrigacoesJuntoTCEESPanel";
import { PessoalConsolidadoPanel } from "./_panels/PessoalConsolidadoPanel";
import { PessoalExecutivoPanel } from "./_panels/PessoalExecutivoPanel";
import { PessoalLegislativoPanel } from "./_panels/PessoalLegislativoPanel";
import { PrestacaoContaCamaraPanel } from "./_panels/PrestacaoContaCamaraPanel";
import { PrestacaoContaPrefeituraPanel } from "./_panels/PrestacaoContaPrefeituraPanel";
import { ReceitasXDespesasPanel } from "./_panels/ReceitasXDespesasPanel";
import { SaudePanel } from "./_panels/SaudePanel";

const WIDGET_HEIGHT = "155px";
const PANEL_STYLE = { minHeight: WIDGET_HEIGHT };
const DOUGHNUT_STYLE = { height: WIDGET_HEIGHT };

export default async function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2"
      exibirBotaoIPCA
      menuItems={MunicipioSubmenuItems}
      sidebar={<SidebarMunicipios />}
    >
      {/* subtrai 4 rem por causa do p-2 padding do layout */}
      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <ReceitasXDespesasPanel style={PANEL_STYLE} {...params} />
        <ObrigacoesJuntoTCEESPanel style={PANEL_STYLE} {...params} />
        <PrestacaoContaPrefeituraPanel style={PANEL_STYLE} {...params} />
        <PrestacaoContaCamaraPanel style={PANEL_STYLE} {...params} />
      </div>

      {/* TODO: adicionar mãos com valor em cima dos gráficos */}
      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-5 gap-2">
        <SaudePanel style={DOUGHNUT_STYLE} {...params} />
        <EducacaoPanel style={DOUGHNUT_STYLE} {...params} />
        <PessoalConsolidadoPanel style={DOUGHNUT_STYLE} {...params} />
        <PessoalExecutivoPanel style={DOUGHNUT_STYLE} {...params} />
        <PessoalLegislativoPanel style={DOUGHNUT_STYLE} {...params} />
      </div>

      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <FundoPrevidenciarioPanel style={DOUGHNUT_STYLE} {...params} />
        <FundoFinanceiroPanel style={DOUGHNUT_STYLE} {...params} />
        <DespesaReceitaCorrentesPanel style={DOUGHNUT_STYLE} {...params} />
      </div>
    </DashboardLayout>
  );
}
