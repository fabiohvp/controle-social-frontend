import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendaTooltip from "@/components/tooltip/LegendaTooltip";
import { EsferaAdministrativaProps } from "@/types/EsferaAdministrativa";
import { ObrigacaoEnvioDoughnuts } from "../types";
import ObrigacaoEnvioVisaoGeral from "./ObrigacaoEnvioVisaoGeral";
import { RenderWidgets } from "./ObrigacaoEnvioWidgets";

type Props = {
  doughnuts: ObrigacaoEnvioDoughnuts;
  exibirMapa: boolean;
  isMunicipio: boolean;
} & EsferaAdministrativaProps;

//TODO: criar dois endpoints (backend), um para municipio e outro para estado,
//criar uma estrutura de dados que já traga o nome da UG/Município, sua data limite
//e quantidade de envios feitos/atrasados/obrigatorios e por último..
//REFAZER toda a parte de obrigacao-de-envio
export default function ObrigacaoEnvioLayout({
  doughnuts,
  esferasAdministrativas,
  exibirMapa,
  isMunicipio,
}: Props) {
  return (
    <div className="grid gap-2 lg:grid-cols-[auto_30%]">
      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-max gap-2">
        <RenderWidgets doughnuts={doughnuts} />
      </div>
      <PanelWithTitle
        bodyProps={{
          className:
            "flex flex-col h-[560px] md:h-[700px] lg:min-h-[530px] xl:min-h-[700px]",
        }}
        header="Visão geral"
        legend={
          <LegendaTooltip id="obrigacao-de-envio-municipios-visao-geral">
            Visão geral das pendências juntos ao tribunal
          </LegendaTooltip>
        }
      >
        <ObrigacaoEnvioVisaoGeral
          doughnuts={doughnuts}
          esferasAdministrativas={esferasAdministrativas}
          exibirMapa={exibirMapa}
          isMunicipio={isMunicipio}
        />
      </PanelWithTitle>
    </div>
  );
}
