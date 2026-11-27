import Iframe from "@/components/iframes/Iframe";

export default function Page() {
  return (
    <Iframe
      src="https://app.powerbi.com/view?r=eyJrIjoiYWI3ZGQ2ZmItNTk2My00NDRjLWFmMjctZjYyMGUzYTUyMDQ1IiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9"
      className="h-full mt-2 w-full"
    />
  );
}
