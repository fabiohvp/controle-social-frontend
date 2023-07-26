import MapaESChart from "@/components/charts/MapaESChart";
import { getMunicipios } from "@/shared/municipio";
import { twMerge } from "tailwind-merge";
import Panels from "./Panels";

type Props = {
  className?: string;
};

export default async function PanelSection(props: Props) {
  const municipios = await getMunicipios();

  return (
    <div
      className={twMerge(
        "grid grid-cols-[77%_auto] xl:grid-cols-[70%_auto]",
        props.className
      )}
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
        <MapaESChart municipios={municipios} />
      </div>
    </div>
  );
}
