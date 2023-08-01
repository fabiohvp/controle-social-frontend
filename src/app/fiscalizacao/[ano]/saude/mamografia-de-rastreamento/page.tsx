import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PainelDeAlerta from "@/components/paineis/PainelDeAlerta";
import BreadcrumbMamografiaRastreamento from "./BreadcrumbMamografiaRastreamento";

export default function Page() {
  return (
    <DashboardLayout
      className="pt-2 px-2"
      exibirFooter={false}
      itensBreadcrumb={BreadcrumbMamografiaRastreamento}
    >
      <PainelDeAlerta type="info">
        Auditoria Operacional que avaliou se o quantitativo de equipamentos,
        insumos e profissionais disponíveis para realizar as mamografias estavam
        adequados ao atendimento da população e quais os principais aspectos que
        impediam ou retardavam a realização dos exames de detecção precoce do
        Câncer de Mama.
      </PainelDeAlerta>
      <iframe
        src="/api/saude/mamografia-de-rastreamento"
        className="h-full mt-2 w-full"
        seamless
      />
    </DashboardLayout>
  );
}
