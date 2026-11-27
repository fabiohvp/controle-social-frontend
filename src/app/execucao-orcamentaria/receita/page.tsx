import Iframe from "@/components/iframes/Iframe";
import { getPowerBiUrl } from "../routes";

export default function Page() {
  return (
    <Iframe
      src={getPowerBiUrl("ReportSectionb23de9905709ec6b0da8")}
      title="Receita"
      className="h-full min-h-[70vw] mt-2 w-full border-0"
    />
  );
}
