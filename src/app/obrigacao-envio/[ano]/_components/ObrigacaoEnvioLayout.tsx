import PainelComTitulo from "@/components/paineis/PainelComTitulo";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { MunicipiosProps } from "@/types/Municipio";
import { ObrigacaoEnvioDoughnuts } from "../types";
import ObrigacaoEnvioMapaEs from "./ObrigacaoEnvioMapaEs";
import { RenderWidgets } from "./ObrigacaoEnvioWidgets";

type Props = {
  doughnuts: ObrigacaoEnvioDoughnuts;
} & MunicipiosProps;

export default function ObrigacaoEnvioLayout({ doughnuts, municipios }: Props) {
  return (
    <div className="grid gap-2 lg:grid-cols-[auto_30%]">
      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-max gap-2">
        <RenderWidgets doughnuts={doughnuts} />
      </div>
      <PainelComTitulo
        bodyProps={{
          className: "flex flex-col h-full grow-0",
        }}
        header="Visão geral"
        legend={
          <LegendaTooltip id="obrigacao-envio-municipios-visao-geral">
            Visão geral das pendências juntos ao tribunal
          </LegendaTooltip>
        }
      >
        <ObrigacaoEnvioMapaEs doughnuts={doughnuts} municipios={municipios} />
      </PainelComTitulo>
    </div>
  );
}
