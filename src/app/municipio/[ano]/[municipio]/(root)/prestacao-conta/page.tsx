import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";

export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <DashboardLayout>
      Prestação conta: {params.ano} {params.municipio}
    </DashboardLayout>
  );
}
