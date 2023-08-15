import ObrasImage from "@/components/images/images/ObrasImage";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <DashboardLayout className="pt-2 px-2" exibirFooter={false}>
      <PanelWithTitleCollapsible
        header="Acompanhe as obras públicas estaduais e municipais."
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          Os dados exibidos são declaratórios, tendo como fonte as remessas
          enviadas pelas unidades gestoras jurisdicionadas por meio do sistema
          Geo-obras. São consideradas obras paralisadas aquelas cuja situação da
          execução contratual tenha sido classificada como paralisada pela
          unidade gestora responsável.
        </div>
        <div className="center w-4/12">
          <ObrasImage />
        </div>
      </PanelWithTitleCollapsible>
      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZTA0ODc1NzYtOTczYy00MjY1LTkxMjYtODU1NWY3MzZmMTQyIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9"
        className="h-full mt-2 w-full"
        seamless
      />
    </DashboardLayout>
  );
}
