import PessoalPainelExterno from "../_components/PessoalPainelExterno";

export default function Page() {
  return (
    <PessoalPainelExterno
      alturaPainel="100vw"
      tituloPainel="Afastamento"
      urlPainel="https://app.powerbi.com/view?r=eyJrIjoiMmYwNTEzZTUtMGJhZi00NDFhLWFiYjYtMzU5NDIxZjMwMDZmIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9"
    >
      Neste painel os tipos de atividade são classificados da seguinte forma:
      <ul className="list-disc ml-4">
        <li>
          Educação - profissional do magistério e os demais que atuam em ações
          voltadas à educação básica;
        </li>
        <li>
          Saúde - médico e demais profissionais da área de saúde em atividade
          nas ações e serviços públicos de saúde;
        </li>
        <li>
          Segurança - bombeiros, policiais, guarda municipal, agente
          penitenciários e socieducativos; e
        </li>
        <li>Outros - demais profissionais.</li>
      </ul>
      Os dados apresentados são <b>declaratórios</b>, tendo como fonte as
      remessas enviadas e homologadas por meio do sistema CidadES-Folha de
      Pagamento, conforme Anexo V da IN 68/2020. São considerados dados
      informados a partir de 2020.
    </PessoalPainelExterno>
  );
}
