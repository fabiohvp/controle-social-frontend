import { FOLHA_DE_PAGAMENTO_PANEL_TITLE } from "@/app/folha-de-pagamento/folha-de-pagamento-constants";
import LogoInfoEducacao from "@/components/images/logos/LogoInfoEducacao";
import PanelWithTitle from "@/components/panel/PanelWithTitle";

export default function Page() {
  return (
    <>
      <PanelWithTitle
        className="flex gap-10"
        collapsible
        headerClassName="font-bold text-xl"
        title={FOLHA_DE_PAGAMENTO_PANEL_TITLE}
      >
        <div>
          Os dados exibidos neste painel são declaratórios, tendo como fonte as
          remessas enviadas e homologadas por meio do sistema CidadES-Folha de
          Pagamento, conforme Anexo V da IN 68/2020. São considerados dados
          informados a partir de 2020.
          <br />
          Os valores referentes às informações consolidadas podem não
          corresponder à soma dos demais grupos, pois apenas no primeiro são
          consideradas pensões especiais e benefícios de auxílio reclusão, bem
          como agentes que já foram desligados, mas ainda fazem jus a alguma
          vantagem.
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PanelWithTitle>
      {/* <div>TODO: implementar areas tematicas / saude / visao-geral</div> */}
    </>
  );
}
