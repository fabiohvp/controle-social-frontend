import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import FiscalizacaoPortalTransparenciaSubmenuItems from "../FiscalizacaoPortalTransparenciaSubmenuItems";
import FiscalizacaoPanelAlertTransparenciaPassiva from "../_components/FiscalizacaoPanelAlertTransparenciaPassiva";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensBreadcrumb={FiscalizacaoPortalTransparenciaSubmenuItems}
    >
      <FiscalizacaoPanelAlertTransparenciaPassiva />
      Estado{/* TODO: adicionar gráficos */}
    </DashboardLayout>
  );
}
