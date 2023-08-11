import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PainelDeAlerta from "@/components/paineis/PainelDeAlerta";
import { ReactNode } from "react";
import BreadcrumbParecerPrevio from "./BreadcrumbParecerPrevio";

export default async function Page({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      itensBreadcrumb={BreadcrumbParecerPrevio}
    >
      <PainelDeAlerta type="info">
        Parecer prévio é um documento com a opinião do TCEES sobre as contas de
        governo do prefeito municipal, enviado para a Câmara Municipal, quem
        realizará o julgamento das contas.
      </PainelDeAlerta>
      {children}
    </DashboardLayout>
  );
}
