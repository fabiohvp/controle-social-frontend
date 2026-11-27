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

import ChartSkeleton from "./ChartSkeleton";

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
  const [isReady, setIsReady] = useState(false);

  const element = useCallback((element: HTMLDivElement | null) => {
    if (!element) return;
    use(components);

    registerLocale("EN", EChartsLanguageEnglish);
    const chart = init(element, theme, { locale: "EN" });
    onInit && onInit(chart, element);

    chart.setOption(options);
    setChart(chart);
    setIsReady(true);

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
  }, [options, settings]);

  useEffect(() => {
    if (loading === true) {
      chart?.showLoading();
    } else {
      chart?.hideLoading();
    }
  }, [loading]);

  return (
    <div className="relative w-full" style={{ height: style?.height ?? "100%", width: style?.width ?? "100%" }}>
      {(!isReady || loading) && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <ChartSkeleton height="100%" />
        </div>
      )}
      <div
        ref={element}
        className={twMerge("echart", className)}
        style={{ width: "100%", height: "100%", ...style }}
        {...props}
      />
    </div>
  );
}
