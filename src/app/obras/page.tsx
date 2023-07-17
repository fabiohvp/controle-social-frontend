import IframeLayout from "@/components/layout/dashboard/IframeLayout";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import Image from "next/image";

export default function Page() {
  return (
    <IframeLayout>
      <div className="m-4">
        <PanelWithTitle
          className="flex gap-10"
          collapsible
          headerClassName="font-bold text-xl"
          title="Acompanhe as obras públicas estaduais e municipais."
        >
          <div className="leading-10 text-xl">
            Os dados exibidos são declaratórios, tendo como fonte as remessas
            enviadas pelas unidades gestoras jurisdicionadas por meio do sistema
            Geo-obras. São consideradas obras paralisadas aquelas cuja situação
            da execução contratual tenha sido classificada como paralisada pela
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
      </div>
      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiMTVlYjRlNGYtMGJjYS00NDEzLThmN2ItY2I3YzU3ZmU4MWY4IiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection"
        className="h-full w-full"
        seamless
      />
    </IframeLayout>
  );
}
