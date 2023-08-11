import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PainelDeAlerta from "@/components/paineis/PainelDeAlerta";
import BreadcrumbMonitoramento from "./BreadcrumbMonitoramento";
import { MonitoramentoPageProps } from "./routes";

export default function Page({ params }: { params: MonitoramentoPageProps }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      itensBreadcrumb={BreadcrumbMonitoramento}
    >
      <PainelDeAlerta type="info">
        Providências a serem tomadas pelos órgãos a partir das deliberações do
        TCEES. O painel permite identificar quais determinações já foram
        cumpridas e quais ainda não foram.
      </PainelDeAlerta>
      Monitoramento //TODO: implementar gráficos
    </DashboardLayout>
  );
}
