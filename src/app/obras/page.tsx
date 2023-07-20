import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import Image from "next/image";

export default function Page() {
  return (
    <DashboardLayout className="pt-2 px-2" exibirFooter={false}>
      <PanelWithTitle
        className="flex gap-10"
        collapsible
        headerClassName="font-bold text-xl"
        title="Acompanhe as obras públicas estaduais e municipais."
      >
        <div>
          Os dados exibidos são declaratórios, tendo como fonte as remessas
          enviadas pelas unidades gestoras jurisdicionadas por meio do sistema
          Geo-obras. São consideradas obras paralisadas aquelas cuja situação da
          execução contratual tenha sido classificada como paralisada pela
          unidade gestora responsável.
        </div>
        <div className="center w-4/12">
          <Image
            src="/images/obras.png"
            alt="Obras públicas"
            height={124}
            width={184}
          />
        </div>
      </PanelWithTitle>
      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZTA0ODc1NzYtOTczYy00MjY1LTkxMjYtODU1NWY3MzZmMTQyIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9"
        className="h-full mt-2 w-full"
        seamless
      />
    </DashboardLayout>
  );
}
