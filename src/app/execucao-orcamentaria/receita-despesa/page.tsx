import Iframe from "@/components/iframes/Iframe";
import { getPowerBiUrl } from "../routes";

export default function Page() {
  return (
    <Iframe
      src={getPowerBiUrl("ReportSection")}
      title="Receita x Despesa"
      className="h-full min-h-[70vw] mt-2 w-full border-0"
    />
  );
}
