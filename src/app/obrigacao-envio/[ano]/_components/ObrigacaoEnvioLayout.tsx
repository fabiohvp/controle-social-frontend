"use client";
import DoughnutChart, {
  DoughnutChartItem,
  DoughnutChartProps,
} from "@/components/charts/DoughnutChart";
import MapaESChart from "@/components/charts/MapaESChart";
import PainelComTitulo from "@/components/paineis/PainelComTitulo";
import useScreenSizeResponsive from "@/hooks/useScreenSizeResponsive";
import { MunicipiosProps } from "@/types/Municipio";
import { HTMLAttributes } from "react";
import { FaHistory } from "react-icons/fa";
import { ObrigacaoEnvio } from "../../getObrigacaoesDeEnvios";

const DOUGHNUT__HEIGHT = "200px";
const DOUGHNUT_STYLE = { height: DOUGHNUT__HEIGHT };

type Props = {
  doughnuts: { title: string; data?: DoughnutChartProps }[];
  obrigacoesDeEnvio: ObrigacaoEnvio[];
} & MunicipiosProps;

function getTooltip() {
  return {
    formatter: function ({ data }: { data: DoughnutChartItem }) {
      return `${data.name}<br>--------------------<br>${data.value}% (${data.extra?.quantidade} municípios)`;
    },
  };
}

export default function ObrigacaoEnvioLayout({
  doughnuts,
  obrigacoesDeEnvio,
  ...props
}: Props) {
  console.log(doughnuts);
  return (
    <div className="grid lg:grid-cols-[70%_auto]">
      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-max gap-2">
        {RenderDoughnuts(doughnuts)}
      </div>
      <div className="h-[460px] md:h-[700px] lg:h-auto lg:min-h-[700px]">
        <MapaESChart municipios={props.municipios} />
      </div>
    </div>
  );
}

function RenderDoughnuts(
  doughnuts: { title: string; data?: DoughnutChartProps }[]
) {
  {
    const size = useScreenSizeResponsive();
    return doughnuts.map((item) => {
      if (!item.data) {
        return (
          <RenderPanel
            bodyProps={{ className: "center flex-col gap-4" }}
            key={item.title}
            title={item.title}
          >
            <FaHistory className="font-bold mirror text-5xl text-gray-300" />
            Remessas ainda não exigíveis
          </RenderPanel>
        );
      }
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
        <RenderPanel key={item.title} title={item.title}>
          <DoughnutChart {...doughnutOptions} tooltip={getTooltip()} />
        </RenderPanel>
      );
    });
  }
}

function RenderPanel({
  bodyProps,
  title,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  bodyProps?: HTMLAttributes<HTMLDivElement>;
  title: string;
}) {
  return (
    <PainelComTitulo
      header={title}
      bodyProps={{
        ...bodyProps,
        style: DOUGHNUT_STYLE,
      }}
      {...props}
    >
      {props.children}
    </PainelComTitulo>
  );
}
