import DespesaPppLogo from "@/components/images/logos/DespesaPppLogo";
import PanelWithTitle from "@/components/panel/PanelWithTitle";

export default function Page() {
  return (
    <>
      <PanelWithTitle
        className="flex gap-10"
        collapsible
        headerClassName="font-bold text-xl"
        title="Despesas com Parcerias Público-Privadas"
      >
        <div>
          <p>
            A Lei que rege as PPP (art. 28) proíbe à União de conceder garantias
            ou realizar transferências voluntárias à Estados e Municípios cuja
            soma das despesas com contraprestação do Poder Público, no ano
            anterior, supere 5% da receita corrente líquida do ente, o que faz
            com que seja importante o monitoramento deste tipo de despesa.
            <br />
            Este painel permite acompanhar o cumprimento deste artigo. Os dados
            aqui exibidos exibidos são declaratórios, tendo como fonte as
            remessas enviadas e homologadas por meio do sistema CidadES,
            conforme IN 68/2020.
          </p>
          <p className="mt-2">
            <span className="font-bold">PPP (Parceria Público-Privada)</span>{" "}
            são concessões regidas pela Lei 11.079/04 e se dividem em:
          </p>
          <ul className="styled">
            <li>
              <p>
                <span className="font-bold">PPP patrocinada</span>: concessão de
                serviços públicos ou de obras públicas, quando envolver,
                adicionalmente à tarifa cobrada dos usuários, contraprestação
                pecuniária do parceiro público ao parceiro privado.
              </p>
            </li>
            <li>
              <p>
                <span className="font-bold">PPP administrativa</span>: contrato
                de prestação de serviços de que a Administração Pública seja a
                usuária direta ou indireta, ainda que envolva execução de obra
                ou fornecimento e instalação de bens. A concessionária não é
                remunerada mediante tarifas, mas através de contraprestação paga
                pelo Poder Público.
              </p>
            </li>
          </ul>
        </div>
        <div className="center w-4/12">
          <DespesaPppLogo />
        </div>
      </PanelWithTitle>
      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiNDhkZThiODgtNmJiZS00ZWVlLWE0MjQtNDY1NjgxMTMzNmI0IiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9"
        className="h-full mt-2 w-full"
        seamless
      />
    </>
  );
}
