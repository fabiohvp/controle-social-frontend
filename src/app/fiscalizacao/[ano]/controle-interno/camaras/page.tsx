import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import ControleInternoItensSubmenu from "../ControleInternoItensSubmenu";
import ControleInternoAlerta from "../_components/ControleInternoAlerta";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensSubmenu={ControleInternoItensSubmenu}
    >
      <ControleInternoAlerta />
      Camaras{/* TODO: adicionar gráficos */}
    </DashboardLayout>
  );
}
