import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import MunicipioSubmenuItems from "../MunicipioSubmenuItems";

export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <DashboardLayout exibirBotaoIPCA menuItems={MunicipioSubmenuItems}>
      Obrigação Envio: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
