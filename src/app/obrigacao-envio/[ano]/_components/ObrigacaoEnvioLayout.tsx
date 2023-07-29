import Botao from "@/components/botoes/Botao";
import PainelComTitulo from "@/components/paineis/PainelComTitulo";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { MunicipiosProps } from "@/types/Municipio";
import { ObrigacaoEnvioDoughnut } from "../types";
import ObrigacaoEnvioMapaEs from "./ObrigacaoEnvioMapaEs";
import { RenderDoughnuts } from "./ObrigacaoEnvioWidgets";

type Props = {
  doughnuts: ObrigacaoEnvioDoughnut[];
} & MunicipiosProps;

export default function ObrigacaoEnvioLayout({ doughnuts, municipios }: Props) {
  return (
    <div className="grid gap-2 lg:grid-cols-[70%_auto]">
      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-max gap-2">
        <RenderDoughnuts doughnuts={doughnuts} />
      </div>
      <PainelComTitulo
        bodyProps={{
          className: "h-[460px] md:h-[700px] lg:h-full lg:min-h-[700px]",
        }}
        header="Visão geral"
        legend={
          <LegendaTooltip id="obrigacao-envio-municipios-visao-geral">
            Visão geral das pendências juntos ao tribunal
          </LegendaTooltip>
        }
      >
        <div>
          <Botao>PCM</Botao>
        </div>
        <ObrigacaoEnvioMapaEs doughnuts={doughnuts} municipios={municipios} />
      </PainelComTitulo>
    </div>
  );
}
