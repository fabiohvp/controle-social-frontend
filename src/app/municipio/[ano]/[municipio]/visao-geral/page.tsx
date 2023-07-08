"use client";
import DashboardFooter from "@/components/layout/dashboard/DashboardFooter";
import DashboardHeader from "@/components/layout/dashboard/DashboardHeader";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";

export default function Page({
  params,
}: {
  params: { ano: number; municipio: string };
}) {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div>
        Visão geral: {params.ano} {params.municipio}
      </div>
      <DashboardFooter />
    </DashboardLayout>
  );
}
