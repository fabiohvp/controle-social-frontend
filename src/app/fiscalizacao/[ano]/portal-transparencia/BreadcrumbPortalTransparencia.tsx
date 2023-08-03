"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import { useAtom } from "jotai";
import BreadcrumbFiscalizacaoLabel from "../../_components/BreadcrumbFiscalizacaoLabel";
import { generateTransparenciaPassivaUrl } from "../transparencia-passiva/routes";
import BreadcrumbPortalTransparenciaLabel from "./_components/BreadcrumbPortalTransparenciaLabel";
import BreadcrumbPortalTransparenciaPaginas from "./_components/BreadcrumbPortalTransparenciaPaginas";
import { portalTransparenciaState } from "./portalTransparenciaState";

export default function BreadcrumbPortalTransparencia() {
  const [state] = useAtom(portalTransparenciaState);

  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <BreadcrumbPortalTransparenciaLabel />
      <BreadcrumbPortalTransparenciaPaginas />
      <BreadcrumbAno
        anos={state.anos}
        generateUrl={generateTransparenciaPassivaUrl}
      />
    </>
  );
}
