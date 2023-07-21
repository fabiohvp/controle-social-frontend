import LogoInfoEducacao from "@/components/images/logos/LogoInfoEducacao";
import PanelWithTitle from "@/components/panel/PanelWithTitle";

export default function Page() {
  return (
    <>
      <PanelWithTitle
        className="flex gap-10"
        collapsible
        headerClassName="font-bold text-xl"
        title="Distribuição de escolas públicas, matrículas e profissionais da educação no Estado e nos municípios"
      >
        <div>
          O painel apresenta informações sobre professores inativos, que estão
          recebendo seus proventos de aposentadoria por meio do regime próprio
          de previdência estadual ou municipal.
          <br />
          Os dados exibidos são declaratórios, tendo como fonte as remessas
          mensalmente enviadas e homologadas por meio do sistema CidadES-Folha
          de Pagamento, conforme Anexo V da IN 68/2020.
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PanelWithTitle>
      {/* <div>TODO: implementar areas tematicas / inativos</div> */}
    </>
  );
}
