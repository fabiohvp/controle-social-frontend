import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import SidebarEstado from "../../_components/SidebarEstado";
import EstadoSubmenuItems from "../EstadoSubmenuItems";
import { EducacaoPanel } from "./_components/EducacaoPanel";
import { ObrigacoesJuntoTCEESPanel } from "./_components/ObrigacoesJuntoTCEESPanel";
import { PessoalConsolidadoPanel } from "./_components/PessoalConsolidadoPanel";
import { PessoalExecutivoPanel } from "./_components/PessoalExecutivoPanel";
import { PessoalLegislativoPanel } from "./_components/PessoalLegislativoPanel";
import { ReceitasXDespesasPanel } from "./_components/ReceitasXDespesasPanel";
import { SaudePanel } from "./_components/SaudePanel";

const WIDGET_HEIGHT = "155px";
const PANEL_STYLE = { minHeight: WIDGET_HEIGHT };
const DOUGHNUT_STYLE = { height: WIDGET_HEIGHT };

export default async function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      submenuItems={EstadoSubmenuItems}
      sidebar={SidebarEstado}
    >
      {/* subtrai 4 rem por causa do p-2 padding do layout */}
      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <ReceitasXDespesasPanel style={PANEL_STYLE} {...params} />
        <ObrigacoesJuntoTCEESPanel style={PANEL_STYLE} {...params} />
        <SaudePanel style={DOUGHNUT_STYLE} {...params} />
        <EducacaoPanel style={DOUGHNUT_STYLE} {...params} />
      </div>

      {/* TODO: adicionar mãos com valor em cima dos gráficos */}
      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-5 gap-2">
        <PessoalConsolidadoPanel style={DOUGHNUT_STYLE} {...params} />
        <PessoalExecutivoPanel style={DOUGHNUT_STYLE} {...params} />
        <PessoalLegislativoPanel style={DOUGHNUT_STYLE} {...params} />
      </div>
    </DashboardLayout>
  );
}
