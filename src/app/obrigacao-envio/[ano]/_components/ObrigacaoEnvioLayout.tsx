"use client";
import DoughnutChart, {
  DoughnutChartProps,
} from "@/components/charts/DoughnutChart";
import MapaESChart from "@/components/charts/MapaESChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import useScreenSizeResponsive from "@/hooks/useScreenSizeResponsive";
import { MunicipiosProps } from "@/shared/municipio";
import { EChartsOption } from "echarts";

const DOUGHNUT__HEIGHT = "200px";
const DOUGHNUT_STYLE = { height: DOUGHNUT__HEIGHT };

type Props = {
  doughnuts: { title: string; data: DoughnutChartProps }[];
  map: Partial<EChartsOption>;
} & MunicipiosProps;

export default function ObrigacaoEnvioLayout(props: Props) {
  const size = useScreenSizeResponsive();

  return (
    <div className="grid lg:grid-cols-[70%_auto]">
      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-max gap-2">
        {props.doughnuts.map((item) => {
          const doughnutOptions = { ...item.data };

          if (size === "2xl") {
            doughnutOptions.legend = {
              bottom: undefined,
              left: undefined,
              orient: "vertical",
              right: 10,
              top: "10%",
            };
          } else {
            doughnutOptions.position = { left: "50%", top: "40%" };
          }
          return (
            <PanelWithTitle
              key={item.title}
              header={item.title}
              bodyProps={{
                style: DOUGHNUT_STYLE,
              }}
            >
              <DoughnutChart {...doughnutOptions} />
            </PanelWithTitle>
          );
        })}
      </div>
      <div className="h-[460px] md:h-[700px] lg:h-auto lg:min-h-[700px]">
        <MapaESChart chartOptions={props.map} municipios={props.municipios} />
      </div>
    </div>
  );
}
