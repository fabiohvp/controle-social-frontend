"use client";
const DOUGHNUT__HEIGHT = "200px";
const DOUGHNUT_STYLE = { height: DOUGHNUT__HEIGHT };

import DoughnutChart, {
  DoughnutChartItem,
} from "@/components/charts/DoughnutChart";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import useScreenSizeResponsive from "@/hooks/useScreenSizeResponsive";
import { isScreenBiggerThan } from "@/types/Screen";
import { HTMLAttributes } from "react";
import { FaHistory } from "react-icons/fa";
import { ObrigacaoEnvioDoughnuts } from "../types";

export function RenderWidgets({
  doughnuts,
}: {
  doughnuts: ObrigacaoEnvioDoughnuts;
}) {
  {
    const screenSize = useScreenSizeResponsive();

    return Object.values(doughnuts).map((item) => {
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
            position={
              isScreenBiggerThan("xl", screenSize)
                ? { left: "50%", top: "40%" }
                : undefined
            }
            tooltip={{
              formatter: function ({ data }: { data: DoughnutChartItem }) {
                return `${data.name}<br>--------------------<br>${data.value}% (${data.extra?.quantidade} municípios)`;
              },
            }}
            {...doughnutOptions}
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
    <PanelWithTitle
      header={title}
      bodyProps={{
        ...bodyProps,
        style: DOUGHNUT_STYLE,
      }}
      {...props}
    >
      {props.children}
    </PanelWithTitle>
  );
}
