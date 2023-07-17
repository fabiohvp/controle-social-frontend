"use client";
import { EChartsOption, SetOptionOpts } from "echarts";
import * as echarts from "echarts/core";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import "./echart.css";

type EChartComponent = (registers: any) => void;

export interface EChartProps {
  components: EChartComponent[];
  option: EChartsOption;
  loading?: boolean;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  theme?: "light" | "dark";
}

export function EChart({
  components,
  option,
  loading,
  style,
  settings,
  theme,
}: EChartProps): JSX.Element {
  const [chart, setChart] = useState<echarts.ECharts>();
  const element = useCallback((element: HTMLDivElement) => {
    echarts.use(components);

    const chart = echarts.init(element, theme);
    chart.setOption(option);
    setChart(chart);

    const resizeChart = () => {
      chart.resize();
    };
    window.addEventListener("resize", resizeChart);

    return () => {
      window.removeEventListener("resize", resizeChart);
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    chart?.setOption(option, settings);
  }, [option, settings]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    if (loading === true) {
      chart?.showLoading();
    } else {
      chart?.hideLoading();
    }
  }, [loading]);

  return (
    <div
      ref={element}
      className="echart"
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
}
