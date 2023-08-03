"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbObrigacaoEnvioLabel from "./_components/BreadcrumbObrigacaoEnvioLabel";
import BreadcrumbObrigacaoEnvioPaginas from "./_components/BreadcrumbObrigacaoEnvioPaginas";
import { obrigacaoEnvioState } from "./obrigacaoEnvioState";
import { generateObrigacaoEnvioUrl } from "./routes";

export default function BreadcrumbObrigacaoEnvio() {
  const [state] = useAtom(obrigacaoEnvioState);

  return (
    <>
      <BreadcrumbObrigacaoEnvioLabel />
      <BreadcrumbObrigacaoEnvioPaginas />
      <BreadcrumbAno
        anos={state.anos}
        generateUrl={generateObrigacaoEnvioUrl}
      />
    </>
  );
}
