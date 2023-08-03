import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BreadcrumbTransparenciaPassiva from "../BreadcrumbTransparenciaPassiva";
import AlertaTransparenciaPassiva from "../_components/AlertaTransparenciaPassiva";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbTransparenciaPassiva}
    >
      <AlertaTransparenciaPassiva />
      Camaras{/* TODO: adicionar gráficos */}
    </DashboardLayout>
  );
}
