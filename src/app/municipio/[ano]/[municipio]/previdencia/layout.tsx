import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { getCodigoMunicipio, getMunicipios } from "@/shared/municipio";
import { getUnidadesGestorasPrevidencia } from "@/shared/previdenciaServer";
import { ReactNode } from "react";
import BarraLateralMunicipios from "../_components/BarraLateralMunicipios";
import BreadcrumbPrevidencia from "./BreadcrumbPrevidencia";

type Props = {
  children: ReactNode;
  params: Promise<{ ano: string; municipio: string }>;
};

/** Sidebar + breadcrumb (com seletor de UG); as page.tsx renderizam só o conteúdo */
export default async function Layout({ children, params }: Props) {
  const { municipio } = await params;
  const codigo = getCodigoMunicipio(await getMunicipios(), municipio);
  const unidadesGestoras = codigo
    ? await getUnidadesGestorasPrevidencia(codigo)
    : [];

  return (
    <DashboardLayout
      className="gap-2 p-2"
      exibirBotaoIPCA
      itensBreadcrumb={
        <BreadcrumbPrevidencia unidadesGestoras={unidadesGestoras} />
      }
      barraLateral={BarraLateralMunicipios}
    >
      {children}
    </DashboardLayout>
  );
}
