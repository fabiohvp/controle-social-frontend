"use client";
import { EChartsOption, SetOptionOpts } from "echarts";
import * as echarts from "echarts/core";
import {
  CSSProperties,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import "./echart.css";

type EChartComponent = (registers: any) => void;

type Props = {
  className?: string;
  components: EChartComponent[];
  options: EChartsOption;
  loading?: boolean;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  theme?: "light" | "dark";

  onInit?: (chart: echarts.EChartsType, ref: HTMLDivElement) => void;
} & HTMLAttributes<HTMLDivElement>;

export default function EChart({
  className,
  components,
  options,
  loading,
  style,
  settings,
  theme,
  onInit,
  ...props
}: Props) {
  const [chart, setChart] = useState<echarts.EChartsType>();
  const element = useCallback((element: HTMLDivElement) => {
    echarts.use(components);

    const chart = echarts.init(element, theme);
    onInit && onInit(chart, element);

    chart.setOption(options);
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
    chart?.setOption(options, settings);
  }, [options, settings]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

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
      className={twMerge("echart", className)}
      style={{ width: "100%", height: "100%", ...style }}
      {...props}
    />
  );
}
