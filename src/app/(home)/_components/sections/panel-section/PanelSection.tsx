import MapaESChart from "@/components/charts/MapaESChart";
import { twMerge } from "tailwind-merge";
import Panels from "./Panels";

type Props = {
  className?: string;
};

export default function PanelSection(props: Props) {
  return (
    <div
      className={twMerge("grid", props.className)}
      style={{ gridTemplateColumns: "70% 30%" }}
    >
      <div className="overflow-auto">
        <h2>A sua ferramenta de fiscalização dos órgãos públicos capixabas</h2>
        <Panels />
        <p className="gray-dark text-[21px] leading-7">
          O TCE-ES recebe dados dos órgãos públicos capixabas e os disponibiliza
          aqui, em formato simples e acessível, para você fiscalizar a aplicação
          do recurso público.
        </p>
      </div>
      <div className="flex justify-center">
        <MapaESChart />
      </div>
    </div>
  );
}