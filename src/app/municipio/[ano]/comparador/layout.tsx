import BreadcrumbParecerPrevio from "@/app/prestacao-de-conta/[ano]/parecer-previo/BreadcrumbParecerPrevio";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";
import "./comparador.css";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout
      className="gap-2 p-2"
      itensBreadcrumb={BreadcrumbParecerPrevio}
    >
      <div className="comparador-municipios mx-auto md:max-w-[970px] lg:max-w-[1170px]">
        <div className="my-4">
          Use nossa ferramenta de comparação e identifique similaridades e
          diferenças entre municípios. São apresentados diversos indicadores
          relacionados a receitas, despesas, saúde, educação, despesas com
          pessoal, etc. É muito simples: basta selecionar o ano e as cidades que
          deseja comparar.
        </div>
        {children}
      </div>
    </DashboardLayout>
  );
}
