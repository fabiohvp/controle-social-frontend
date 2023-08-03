"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbFiscalizacaoLabel from "../../_components/BreadcrumbFiscalizacaoLabel";
import BreadcrumbTransparenciaPassivaLabel from "./_components/BreadcrumbTransparenciaPassivaLabel";
import BreadcrumbTransparenciaPassivaPaginas from "./_components/BreadcrumbTransparenciaPassivaPaginas";
import { generateTransparenciaPassivaUrl } from "./routes";
import { transparenciaPassivaState } from "./transparenciaPassivaState";

export default function BreadcrumbTransparenciaPassiva() {
  const [state] = useAtom(transparenciaPassivaState);

  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <BreadcrumbTransparenciaPassivaLabel />
      <BreadcrumbTransparenciaPassivaPaginas />
      <BreadcrumbAno
        anos={state.anos}
        generateUrl={generateTransparenciaPassivaUrl}
      />
    </>
  );
}
