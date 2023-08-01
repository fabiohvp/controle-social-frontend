import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BarraLateralMunicipios from "../../_components/BarraLateralMunicipios";
import { MunicipioPageProps } from "../../routes";
import BreadcrumbMunicipio from "../BreadcrumbMunicipio";
import { DespesaReceitaCorrentesWidget } from "./_components/widgets/DespesaReceitaCorrentesWidget";
import { EducacaoWidget } from "./_components/widgets/EducacaoWidget";
import { FundoFinanceiroWidget } from "./_components/widgets/FundoFinanceiroWidget";
import { FundoPrevidenciarioWidget } from "./_components/widgets/FundoPrevidenciarioWidget";
import { ObrigacoesJuntoTceesWidget } from "./_components/widgets/ObrigacoesJuntoTceesWidget";
import { PessoalConsolidadoWidget } from "./_components/widgets/PessoalConsolidadoWidget";
import { PessoalExecutivoWidget } from "./_components/widgets/PessoalExecutivoWidget";
import { PessoalLegislativoWidget } from "./_components/widgets/PessoalLegislativoWidget";
import { PrestacaoContaCamaraWidget } from "./_components/widgets/PrestacaoContaCamaraWidget";
import { PrestacaoContaPrefeituraWidget } from "./_components/widgets/PrestacaoContaPrefeituraWidget";
import { ReceitasXDespesasWidget } from "./_components/widgets/ReceitasXDespesasWidget";
import { SaudeWidget } from "./_components/widgets/SaudeWidget";

const WIDGET_HEIGHT = "155px";
const PANEL_STYLE = { minHeight: WIDGET_HEIGHT };
const GAUGE_STYLE = { height: WIDGET_HEIGHT };

export default async function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={BreadcrumbMunicipio}
      barraLateral={BarraLateralMunicipios}
    >
      {/* subtrai 4 rem por causa do p-2 padding do layout */}
      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <ReceitasXDespesasWidget style={PANEL_STYLE} {...params} />
        <ObrigacoesJuntoTceesWidget style={PANEL_STYLE} {...params} />
        <PrestacaoContaPrefeituraWidget style={PANEL_STYLE} {...params} />
        <PrestacaoContaCamaraWidget style={PANEL_STYLE} {...params} />
      </div>

      {/* TODO: adicionar mãos com valor em cima dos gráficos */}
      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-5 gap-2">
        <SaudeWidget style={GAUGE_STYLE} {...params} />
        <EducacaoWidget style={GAUGE_STYLE} {...params} />
        <PessoalConsolidadoWidget style={GAUGE_STYLE} {...params} />
        <PessoalExecutivoWidget style={GAUGE_STYLE} {...params} />
        <PessoalLegislativoWidget style={GAUGE_STYLE} {...params} />
      </div>

      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <FundoPrevidenciarioWidget style={GAUGE_STYLE} {...params} />
        <FundoFinanceiroWidget style={GAUGE_STYLE} {...params} />
        <DespesaReceitaCorrentesWidget style={GAUGE_STYLE} {...params} />
      </div>
    </DashboardLayout>
  );
}
