"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbPrestacaoDeContaLabel from "../_components/BreadcrumbPrestacaoDeContaLabel";
import BreadcrumbParecerPrevioLabel from "./_components/BreadcrumbParecerPrevioLabel";
import { parecerPrevioState } from "./parecerPrevioState";
import { generateParecerPrevioUrl } from "./routes";

export default function BreadcrumbParecerPrevio() {
  const [state] = useAtom(parecerPrevioState);

  return (
    <>
      <BreadcrumbPrestacaoDeContaLabel />
      <BreadcrumbParecerPrevioLabel />
      <BreadcrumbAno anos={state.anos} generateUrl={generateParecerPrevioUrl} />
    </>
  );
}
