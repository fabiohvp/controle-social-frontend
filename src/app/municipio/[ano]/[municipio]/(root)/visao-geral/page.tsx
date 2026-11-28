import { CSSProperties, Suspense } from "react";
import { MunicipioPageProps } from "../../routes";
import { DadosAcumuladosAte } from "./_components/widgets/DadosAcumuladosAte";
import { FundoFinanceiroWidget } from "./_components/widgets/FundoFinanceiroWidget";
import { FundoPrevidenciarioWidget } from "./_components/widgets/FundoPrevidenciarioWidget";
import {
  DespesaReceitaCorrentesWidget,
  DividaConsolidadaLiquidaWidget,
  EducacaoWidget,
  FundebWidget,
  PessoalConsolidadoWidget,
  PessoalExecutivoWidget,
  PessoalLegislativoWidget,
  SaudeWidget,
} from "./_components/widgets/MedidoresWidgets";
import { ObrigacoesJuntoTceesWidget } from "./_components/widgets/ObrigacoesJuntoTceesWidget";
import { PrestacaoContaCamaraWidget } from "./_components/widgets/PrestacaoContaCamaraWidget";
import { PrestacaoContaPrefeituraWidget } from "./_components/widgets/PrestacaoContaPrefeituraWidget";
import { ReceitasXDespesasWidget } from "./_components/widgets/ReceitasXDespesasWidget";

const WIDGET_HEIGHT = "155px";
const PANEL_STYLE = { minHeight: WIDGET_HEIGHT };
const GAUGE_STYLE = { minHeight: "290px" };

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

  // mesma ordem dos medidores do site oficial
  const medidores = [
    EducacaoWidget,
    FundebWidget,
    SaudeWidget,
    PessoalConsolidadoWidget,
    PessoalExecutivoWidget,
    PessoalLegislativoWidget,
    DespesaReceitaCorrentesWidget,
    DividaConsolidadaLiquidaWidget,
  ];

  return (
    <>
      <Suspense fallback={null}>
        <DadosAcumuladosAte {...resolvedParams} />
      </Suspense>

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

      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        {medidores.map((Medidor, indice) => (
          <Suspense key={indice} fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
            <Medidor {...resolvedParams} />
          </Suspense>
        ))}
      </div>

      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <Suspense fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
          <FundoPrevidenciarioWidget style={{ height: WIDGET_HEIGHT }} {...resolvedParams} />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
          <FundoFinanceiroWidget style={{ height: WIDGET_HEIGHT }} {...resolvedParams} />
        </Suspense>
      </div>
    </>
  );
}
