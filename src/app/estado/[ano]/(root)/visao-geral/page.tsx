import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BarraLateralEstado from "../../_components/BarraLateralEstado";
import { EstadoPageProps } from "../../routes";
import BreadcrumbEstado from "../BreadcrumbEstado";
import { EducacaoWidget } from "./_components/widgets/EducacaoWidget";
import { ObrigacoesJuntoTceesWidget } from "./_components/widgets/ObrigacoesJuntoTceesWidget";
import { PessoalConsolidadoWidget } from "./_components/widgets/PessoalConsolidadoWidget";
import { PessoalExecutivoWidget } from "./_components/widgets/PessoalExecutivoWidget";
import { PessoalLegislativoWidget } from "./_components/widgets/PessoalLegislativoWidget";
import { ReceitasXDespesasWidget } from "./_components/widgets/ReceitasXDespesasWidget";
import { SaudeWidget } from "./_components/widgets/SaudeWidget";

const WIDGET_HEIGHT = "155px";
const PANEL_STYLE = { minHeight: WIDGET_HEIGHT };
const GAUGE_STYLE = { height: WIDGET_HEIGHT };

export default async function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={BreadcrumbEstado}
      barraLateral={BarraLateralEstado}
    >
      {/* subtrai 4 rem por causa do p-2 padding do layout */}
      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <ReceitasXDespesasWidget style={PANEL_STYLE} {...params} />
        <ObrigacoesJuntoTceesWidget style={PANEL_STYLE} {...params} />
        <SaudeWidget style={GAUGE_STYLE} {...params} />
        <EducacaoWidget style={GAUGE_STYLE} {...params} />
      </div>

      {/* TODO: adicionar mãos com valor em cima dos gráficos */}
      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-5 gap-2">
        <PessoalConsolidadoWidget style={GAUGE_STYLE} {...params} />
        <PessoalExecutivoWidget style={GAUGE_STYLE} {...params} />
        <PessoalLegislativoWidget style={GAUGE_STYLE} {...params} />
      </div>
    </DashboardLayout>
  );
}
