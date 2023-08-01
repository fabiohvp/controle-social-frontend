"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbBoletinsLabel from "./_components/BreadcrumbBoletinsLabel";
import BreadcrumbBoletinsPaginas from "./_components/BreadcrumbBoletinsPaginas";
import { boletinsState } from "./boletinsStates";
import { generateBoletinsUrl } from "./routes";

export default function BreadcrumbBoletins() {
  const [state] = useAtom(boletinsState);

  return (
    <>
      <BreadcrumbBoletinsLabel />
      <BreadcrumbBoletinsPaginas />
      <BreadcrumbAno anos={state.anos} generateUrl={generateBoletinsUrl} />
    </>
  );
}
