"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumdComparadorLabel from "./_components/BreadcrumdComparadorLabel";
import { comparadorState } from "./comparadorState";
import { generateComparadorUrl } from "./routes";

export default function BreadcrumbComparador() {
  const [state] = useAtom(comparadorState);

  return (
    <>
      <BreadcrumdComparadorLabel />
      <BreadcrumbAno anos={state.anos} generateUrl={generateComparadorUrl} />
    </>
  );
}
