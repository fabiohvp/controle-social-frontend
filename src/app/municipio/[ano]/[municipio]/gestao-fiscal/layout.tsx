import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode, Suspense } from "react";
import { DadosAcumuladosAte } from "../(root)/visao-geral/_components/widgets/DadosAcumuladosAte";
import BarraLateralMunicipios from "../_components/BarraLateralMunicipios";
import { MunicipioPageProps } from "../routes";
import BreadcrumbGestaoFiscal from "./BreadcrumbGestaoFiscal";

/** Sidebar + breadcrumb da seção; as page.tsx renderizam só o conteúdo */
export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<Pick<MunicipioPageProps, "ano" | "municipio">>;
}) {
  const { ano, municipio } = await params;
  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={BreadcrumbGestaoFiscal}
      barraLateral={BarraLateralMunicipios}
    >
      <Suspense fallback={null}>
        <DadosAcumuladosAte ano={ano} municipio={municipio} />
      </Suspense>
      {children}
    </DashboardLayout>
  );
}
