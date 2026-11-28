import DadosAcumuladosAte from "@/components/panel/DadosAcumuladosAte";
import { CSSProperties, Suspense } from "react";
import { EstadoPageProps } from "../../routes";
import {
  DespesaReceitaCorrentesEstadoWidget,
  DividaConsolidadaLiquidaEstadoWidget,
  EducacaoEstadoWidget,
  PessoalAssembleiaEstadoWidget,
  PessoalConsolidadoEstadoWidget,
  PessoalExecutivoEstadoWidget,
  PessoalJudiciarioEstadoWidget,
  PessoalMinisterioPublicoEstadoWidget,
  PessoalTribunalDeContasEstadoWidget,
  SaudeEstadoWidget,
} from "./_components/widgets/MedidoresEstado";
import { ObrigacoesJuntoTceesWidget } from "./_components/widgets/ObrigacoesJuntoTceesWidget";
import { ReceitasXDespesasWidget } from "./_components/widgets/ReceitasXDespesasWidget";

const PANEL_STYLE = { minHeight: "155px" };
const GAUGE_STYLE = { minHeight: "290px" };

/** unidade gestora do Governo do Estado, usada no "Dados acumulados até" */
const UG_GOVERNO = "500E0100001";

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

export default async function Page({ params }: { params: Promise<EstadoPageProps> }) {
  const resolvedParams = await params;

  // mesma ordem dos medidores do site oficial
  const medidores = [
    SaudeEstadoWidget,
    EducacaoEstadoWidget,
    PessoalConsolidadoEstadoWidget,
    PessoalExecutivoEstadoWidget,
    PessoalJudiciarioEstadoWidget,
    PessoalAssembleiaEstadoWidget,
    PessoalMinisterioPublicoEstadoWidget,
    PessoalTribunalDeContasEstadoWidget,
    DespesaReceitaCorrentesEstadoWidget,
    DividaConsolidadaLiquidaEstadoWidget,
  ];

  return (
    <>
      <Suspense fallback={null}>
        <DadosAcumuladosAte
          ano={resolvedParams.ano}
          controller="EstadoControllers"
          codigoUnidadeGestora={UG_GOVERNO}
        />
      </Suspense>

      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        <Suspense fallback={<WidgetSkeleton style={PANEL_STYLE} />}>
          <ReceitasXDespesasWidget style={PANEL_STYLE} {...resolvedParams} />
        </Suspense>
        <Suspense fallback={<WidgetSkeleton style={PANEL_STYLE} />}>
          <ObrigacoesJuntoTceesWidget style={PANEL_STYLE} {...resolvedParams} />
        </Suspense>
      </div>

      <div className="grid auto-rows-max grid-cols-responsive grid-cols-responsive-4 gap-2">
        {medidores.map((Medidor, indice) => (
          <Suspense key={indice} fallback={<WidgetSkeleton style={GAUGE_STYLE} />}>
            <Medidor {...resolvedParams} />
          </Suspense>
        ))}
      </div>
    </>
  );
}
