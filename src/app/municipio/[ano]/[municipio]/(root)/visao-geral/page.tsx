import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { MunicipioPageProps } from "../../MunicipioPageProps";
import SidebarMunicipios from "../../_components/SidebarMunicipios";
import MunicipioSubmenuItems from "../MunicipioSubmenuItems";
import { DespesaReceitaCorrentesPanel } from "./_components/DespesaReceitaCorrentesPanel";
import { EducacaoPanel } from "./_components/EducacaoPanel";
import { FundoFinanceiroPanel } from "./_components/FundoFinanceiroPanel";
import { FundoPrevidenciarioPanel } from "./_components/FundoPrevidenciarioPanel";
import { ObrigacoesJuntoTCEESPanel } from "./_components/ObrigacoesJuntoTCEESPanel";
import { PessoalConsolidadoPanel } from "./_components/PessoalConsolidadoPanel";
import { PessoalExecutivoPanel } from "./_components/PessoalExecutivoPanel";
import { PessoalLegislativoPanel } from "./_components/PessoalLegislativoPanel";
import { PrestacaoContaCamaraPanel } from "./_components/PrestacaoContaCamaraPanel";
import { PrestacaoContaPrefeituraPanel } from "./_components/PrestacaoContaPrefeituraPanel";
import { ReceitasXDespesasPanel } from "./_components/ReceitasXDespesasPanel";
import { SaudePanel } from "./_components/SaudePanel";

const WIDGET_HEIGHT = "155px";
const PANEL_STYLE = { minHeight: WIDGET_HEIGHT };
const GAUGE_STYLE = { height: WIDGET_HEIGHT };

export default async function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      submenuItems={MunicipioSubmenuItems}
      sidebar={SidebarMunicipios}
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
        <SaudePanel style={GAUGE_STYLE} {...params} />
        <EducacaoPanel style={GAUGE_STYLE} {...params} />
        <PessoalConsolidadoPanel style={GAUGE_STYLE} {...params} />
        <PessoalExecutivoPanel style={GAUGE_STYLE} {...params} />
        <PessoalLegislativoPanel style={GAUGE_STYLE} {...params} />
      </div>

      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <FundoPrevidenciarioPanel style={GAUGE_STYLE} {...params} />
        <FundoFinanceiroPanel style={GAUGE_STYLE} {...params} />
        <DespesaReceitaCorrentesPanel style={GAUGE_STYLE} {...params} />
      </div>
    </DashboardLayout>
  );
}
