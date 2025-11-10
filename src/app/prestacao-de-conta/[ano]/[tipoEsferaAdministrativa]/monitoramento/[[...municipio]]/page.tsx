import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import AlertPanel from "@/components/panel/AlertPanel";
import BreadcrumbMonitoramento from "./BreadcrumbMonitoramento";
import { MonitoramentoPageProps } from "./routes";

export default async function Page({ params }: { params: Promise<MonitoramentoPageProps> }) {
	const resolvedParams = await params;
  return (
    <DashboardLayout
      className="gap-2 p-2"
      itensBreadcrumb={BreadcrumbMonitoramento}
    >
      <AlertPanel type="info">
        Providências a serem tomadas pelos órgãos a partir das deliberações do
        TCEES. O painel permite identificar quais determinações já foram
        cumpridas e quais ainda não foram.
      </AlertPanel>
      Monitoramento //TODO: implementar gráficos
    </DashboardLayout>
  );
}
