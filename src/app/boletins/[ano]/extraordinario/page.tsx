import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { BoletinsPageProps } from "../BoletinsPageProps";
import BoletinsSubmenuItems from "../BoletinsSubmenuItems";
import SidebarBoletins from "../_components/SidebarBoletins";

export default function Page({ params }: { params: BoletinsPageProps }) {
  return (
    <DashboardLayout
      menuItems={BoletinsSubmenuItems}
      sidebar={<SidebarBoletins />}
    >
      extraordinario: {params.ano}
    </DashboardLayout>
  );
}
