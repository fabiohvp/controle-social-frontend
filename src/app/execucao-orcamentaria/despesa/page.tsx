import Iframe from "@/components/iframes/Iframe";
import { getPowerBiUrl } from "../routes";

export default function Page() {
  return (
    <Iframe
      src={getPowerBiUrl("ReportSectiondffc061a7e3888c5cc05")}
      title="Despesa"
      className="h-full min-h-[70vw] mt-2 w-full border-0"
    />
  );
}
