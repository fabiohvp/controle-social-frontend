import LogoInfoEducacao from "@/components/images/logos/LogoInfoEducacao";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";

export default function Page() {
  return (
    <>
      <PanelWithTitleCollapsible
        header="Acompanhe os cargos, empregos e funções públicas existentes no Estado e nos municípios"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          Os dados exibidos neste painel são declaratórios, tendo como fonte as
          remessas enviadas e homologadas por meio do sistema CidadES-Estrutura
          de Pessoal, conforme Anexo V da IN 68/2020.
          <br />
          São informados os vínculos de pessoal (cargos, empregos e funções) e o
          número de postos de trabalho existentes nos entes, poderes e órgãos,
          independente se estão ocupados ou não.
        </div>
        <div className="center w-4/12">
          <LogoInfoEducacao />
        </div>
      </PanelWithTitleCollapsible>
      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiNWZhZmZiM2EtOTRkOC00YTU0LTk5MzUtNWZhZDFlMTBjOTU1IiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9"
        className="h-full mt-2 w-full"
        seamless
      />
    </>
  );
}
