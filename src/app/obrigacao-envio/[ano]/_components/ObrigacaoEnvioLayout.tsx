import MapaESChart from "@/components/charts/MapaESChart";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  mapData: [];
};

export default function ObrigacaoEnvioLayout(props: Props) {
  return (
    <div className="grid" style={{ gridTemplateRows: "auto 1fr" }}>
      <div>{props.children}</div>
      <div className="h-[460px] md:h-[700px] lg:h-auto lg:min-h-[700px]">
        <MapaESChart />
      </div>
    </div>
  );
}
