import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { EstadoPageProps } from "../../EstadoPageProps";
import EstadoGestaoOrcamentariaSubmenuItems from "../EstadoGestaoOrcamentariaSubmenuItems";

export default function Page({ params }: { params: EstadoPageProps }) {
  return (
    <DashboardLayout
      className="flex flex-col gap-2 p-2"
      submenuItems={EstadoGestaoOrcamentariaSubmenuItems}
    >
      Plano plurianual: {params.ano}
    </DashboardLayout>
  );
}
