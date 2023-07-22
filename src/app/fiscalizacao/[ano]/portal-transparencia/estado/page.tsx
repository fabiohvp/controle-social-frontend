import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import FiscalizacaoPortalTransparenciaSubmenuItemsPages from "../FiscalizacaoPortalTransparenciaSubmenuItems";
import FiscalizacaoPanelAlert from "../_components/FiscalizacaoPanelAlert";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      submenuItems={FiscalizacaoPortalTransparenciaSubmenuItemsPages}
    >
      <FiscalizacaoPanelAlert />
      Estado{/* TODO: adicionar gráficos */}
    </DashboardLayout>
  );
}
