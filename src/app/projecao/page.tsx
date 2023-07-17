import IframeLayout from "@/components/layout/dashboard/IframeLayout";

export default function Page() {
  return (
    <IframeLayout>
      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiZTA0ODc1NzYtOTczYy00MjY1LTkxMjYtODU1NWY3MzZmMTQyIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9"
        className="h-full w-full"
        seamless
      />
    </IframeLayout>
  );
}
