"use client";
import { EChartsOption, SetOptionOpts } from "echarts";
import * as echarts from "echarts/core";
import { CSSProperties, useEffect, useRef } from "react";
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
  let chart: echarts.ECharts | undefined;
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    echarts.use(components);
    // Initialize chart
    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chart !== undefined) {
      chart.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chart !== undefined) {
      loading === true ? chart.showLoading() : chart.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div
      ref={chartRef}
      className="echart"
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
}
