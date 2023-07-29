"use client";
const DOUGHNUT__HEIGHT = "200px";
const DOUGHNUT_STYLE = { height: DOUGHNUT__HEIGHT };

import DoughnutChart, {
  DoughnutChartItem,
  DoughnutChartProps,
} from "@/components/charts/DoughnutChart";
import PainelComTitulo from "@/components/paineis/PainelComTitulo";
import { HTMLAttributes } from "react";
import { FaHistory } from "react-icons/fa";

export function RenderDoughnuts({
  doughnuts,
}: {
  doughnuts: {
    title: string;
    data?: DoughnutChartProps;
  }[];
}) {
  {
    return doughnuts.map((item) => {
      if (!item.data) {
        return (
          <RenderWidget
            bodyProps={{ className: "center flex-col gap-4" }}
            key={item.title}
            title={item.title}
          >
            <FaHistory className="font-bold mirror text-5xl text-gray-300" />
            Remessas ainda não exigíveis
          </RenderWidget>
        );
      }
      const doughnutOptions = { ...item.data };

      return (
        <RenderWidget key={item.title} title={item.title}>
          <DoughnutChart
            {...doughnutOptions}
            tooltip={{
              formatter: function ({ data }: { data: DoughnutChartItem }) {
                return `${data.name}<br>--------------------<br>${data.value}% (${data.extra?.quantidade} municípios)`;
              },
            }}
          />
        </RenderWidget>
      );
    });
  }
}

function RenderWidget({
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
