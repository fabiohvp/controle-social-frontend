import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";

export default function Page() {
  return (
    <DashboardLayout exibirFooter={false}>
      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiMTVlYjRlNGYtMGJjYS00NDEzLThmN2ItY2I3YzU3ZmU4MWY4IiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection"
        className="h-full w-full"
        seamless
      />
    </DashboardLayout>
  );
}
