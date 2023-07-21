import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelAlert from "@/components/panel/PanelAlert";

export default function Page() {
  return (
    <DashboardLayout className="pt-2 px-2">
      <PanelAlert type="info">
        O objetivo da auditoria foi identificar e avaliar as causas da baixa
        eficácia da cobertura vacinal contra o HPV, da baixa eficácia do
        rastreamento do câncer de colo de útero por meio dos exames, da
        intempestividade para confirmação do diagnóstico e da ineficiência para
        o início do tratamento do câncer de colo de útero.
      </PanelAlert>
      <iframe
        src="/api/saude/cancer-colo-de-utero"
        className="h-full mt-2 w-full"
        seamless
      />
    </DashboardLayout>
  );
}
