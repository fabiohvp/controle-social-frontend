import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BreadcrumbControleInterno from "../BreadcrumbControleInterno";
import AlertaControleInterno from "../_components/AlertaControleInterno";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbControleInterno}
    >
      <AlertaControleInterno />
      Prefeituras{/* TODO: adicionar gráficos */}
    </DashboardLayout>
  );
}
