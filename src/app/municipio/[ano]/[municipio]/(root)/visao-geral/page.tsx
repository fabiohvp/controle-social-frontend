import { CSSProperties, Suspense } from "react";
import { MunicipioPageProps } from "../../routes";
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

function WidgetSkeleton({ style }: { style: CSSProperties }) {
  return (
    <div
      style={style}
      className="bg-white rounded border border-gray-200/60 p-4 flex items-center justify-center animate-pulse"
    >
      <div className="h-6 w-24 bg-gray-200/80 rounded" />
    </div>
  );
}

export default async function Page({ params }: { params: Promise<MunicipioPageProps> }) {
  const resolvedParams = await params;

  return (
    <>
      {/* subtrai 4 rem por causa do p-2 padding do layout */}
      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <Suspense fallback={<WidgetSkeleton style={PANEL_STYLE} />}>
          <ReceitasXDespesasWidget style={PANEL_STYLE} {...resolvedParams} />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={PANEL_STYLE} />}>
          <ObrigacoesJuntoTceesWidget style={PANEL_STYLE} {...resolvedParams} />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={PANEL_STYLE} />}>
          <PrestacaoContaPrefeituraWidget
            style={PANEL_STYLE}
            {...resolvedParams}
          />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={PANEL_STYLE} />}>
          <PrestacaoContaCamaraWidget style={PANEL_STYLE} {...resolvedParams} />
        </Suspense>
      </div>

      {/* TODO: adicionar mãos com valor em cima dos gráficos */}
      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-5 gap-2">
        <Suspense fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
          <SaudeWidget style={GAUGE_STYLE} {...resolvedParams} />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
          <EducacaoWidget style={GAUGE_STYLE} {...resolvedParams} />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
          <PessoalConsolidadoWidget style={GAUGE_STYLE} {...resolvedParams} />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
          <PessoalExecutivoWidget style={GAUGE_STYLE} {...resolvedParams} />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
          <PessoalLegislativoWidget style={GAUGE_STYLE} {...resolvedParams} />
        </Suspense>
      </div>

      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <Suspense fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
          <FundoPrevidenciarioWidget style={GAUGE_STYLE} {...resolvedParams} />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
          <FundoFinanceiroWidget style={GAUGE_STYLE} {...resolvedParams} />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
          <DespesaReceitaCorrentesWidget
            style={GAUGE_STYLE}
            {...resolvedParams}
          />
        </Suspense>
      </div>
    </>
  );
}
