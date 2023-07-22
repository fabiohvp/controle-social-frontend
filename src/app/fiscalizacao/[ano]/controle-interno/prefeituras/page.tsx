import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import ControleInternoSubmenuItems from "../FiscalizacaoControleInternoSubmenuItems";
import FiscalizacaoPanelAlertControleInterno from "../_components/FiscalizacaoPanelAlertControleInterno";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      submenuItems={ControleInternoSubmenuItems}
    >
      <FiscalizacaoPanelAlertControleInterno />
      Prefeituras{/* TODO: adicionar gráficos */}
    </DashboardLayout>
  );
}
