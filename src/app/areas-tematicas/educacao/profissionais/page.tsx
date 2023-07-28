import LogoInfoEducacao from "@/components/images/logos/LogoInfoEducacao";
import PainelComTituloMinimizavel from "@/components/paineis/PainelComTituloMinimizavel";

export default function Page() {
  return (
    <>
      <PainelComTituloMinimizavel
        header="Distribuição de escolas públicas, matrículas e profissionais da educação no Estado e nos municípios"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          A primeira parte do painel apresenta informações sobre os professores.
          A parte final destaca os profissionais, professores ou não, que atuam
          nas instituições de ensino.
          <br />
          Os dados exibidos são declaratórios, tendo como fonte as remessas
          mensalmente enviadas e homologadas por meio do sistema CidadES-Folha
          de Pagamento, conforme Anexo V da IN 68/2020.
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PainelComTituloMinimizavel>
      {/* <div>TODO: implementar areas tematicas / profissionais</div> */}
    </>
  );
}
