import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PortalTransparenciaItensSubmenu from "../PortalTransparenciaItensSubmenu";
import FiscalizacaoPanelAlert from "../_components/PortalTransparenciaAlerta";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensSubmenu={PortalTransparenciaItensSubmenu}
    >
      <FiscalizacaoPanelAlert />
      Estado{/* TODO: adicionar gráficos */}
    </DashboardLayout>
  );
}
