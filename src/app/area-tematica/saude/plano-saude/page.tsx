import Iframe from "@/components/iframes/Iframe";

export default function Page() {
  return (
    <Iframe
      src="https://app.powerbi.com/view?r=eyJrIjoiMTBkODYwNmUtZThiNS00YjFmLTljZmQtY2I2ZjY3ZDQ1YTIwIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection"
      className="h-full mt-2 w-full"
    />
  );
}
