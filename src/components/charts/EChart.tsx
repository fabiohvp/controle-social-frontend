"use client";
import type {
  EChartsCoreOption,
  EChartsType,
  SetOptionOpts,
} from "echarts/core";
import { init, registerLocale, use } from "echarts/core";
import {
  CSSProperties,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
// @ts-ignore-next-line
import EChartsLanguageEnglish from "echarts/i18n/langEN";

export type LabelFormatter = {
  fontSize: number | string;
  fontWeight: "normal" | "bold" | "bolder" | "lighter" | number;
  formatter: string;
  position: "outer" | "inner" | "center" | "outside";
};

type EChartComponent = (registers: any) => void;

type Props = {
  className?: string;
  components: EChartComponent[];
  options: EChartsCoreOption;
  loading?: boolean;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  theme?: "light" | "dark";

  onInit?: (chart: EChartsType, ref: HTMLDivElement) => void;
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
  const [chart, setChart] = useState<EChartsType>();
  const element = useCallback((element: HTMLDivElement) => {
    use(components);

    registerLocale("EN", EChartsLanguageEnglish);
    const chart = init(element, theme, { locale: "EN" });
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
