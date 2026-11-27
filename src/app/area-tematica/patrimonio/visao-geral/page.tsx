import Iframe from "@/components/iframes/Iframe";

export default function Page() {
  return (
    <Iframe
      src="https://app.powerbi.com/view?r=eyJrIjoiZTg2YjZiNDItZTUxNS00NmQ4LWIyZDYtYzRkYmQzMjczY2ZiIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection"
      className="h-full mt-2 w-full"
    />
  );
}
