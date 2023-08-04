import MapaEsChart from "@/components/charts/MapaEsChart";
import { twMerge } from "tailwind-merge";
import LinksWidgets from "./LinksWidgets";

type Props = {
  className?: string;
};

export default function PainelWidget(props: Props) {
  return (
    <div
      className={twMerge(
        "grid grid-cols-[77%_auto] xl:grid-cols-[70%_auto]",
        props.className
      )}
    >
      <div className="overflow-auto">
        <h2>A sua ferramenta de fiscalização dos órgãos públicos capixabas</h2>
        <LinksWidgets />
        <p className="gray-dark text-[21px] leading-7">
          O TCE-ES recebe dados dos órgãos públicos capixabas e os disponibiliza
          aqui, em formato simples e acessível, para você fiscalizar a aplicação
          do recurso público.
        </p>
      </div>
      <div className="flex justify-center">
        <MapaEsChart />
      </div>
    </div>
  );
}
