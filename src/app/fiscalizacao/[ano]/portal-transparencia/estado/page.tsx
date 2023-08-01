import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import BreadcrumbPortalTransparencia from "../BreadcrumbPortalTransparencia";
import AlertaPortalTransparencia from "../_components/AlertaPortalTransparencia";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbPortalTransparencia}
    >
      <AlertaPortalTransparencia />
      Estado{/* TODO: adicionar gráficos */}
    </DashboardLayout>
  );
}
