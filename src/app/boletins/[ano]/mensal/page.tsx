import BoletimMacroGestaoGovernamentalIcon from "@/components/images/icones/BoletimMacroGestaoGovernamentalIcon";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelAlert from "@/components/panel/PanelAlert";
import { getMonthNames } from "@/shared/date";
import { BoletinsPageProps } from "../BoletinsPageProps";
import BoletinsSubmenuItems from "../BoletinsSubmenuItems";
import SidebarBoletins from "../_components/SidebarBoletins";
import "./boletim-mensal.css";

const months = getMonthNames();

export default function Page({ params }: { params: BoletinsPageProps }) {
  return (
    <DashboardLayout
      menuItems={BoletinsSubmenuItems}
      sidebar={<SidebarBoletins />}
    >
      <PanelAlert className="text-sm" type="info">
        O Boletim de Macrogestão Governamental é um documento informativo
        gerencial publicado mensalmente pelo Tribunal de Contas do Estado do
        Espirito Santo, desde de 2016, elaborado com base nos dados das
        plataformas CidadES (informações fiscais e econômicas do Estado e dos
        municípios capixabas, produzido pelo próprio TCEES) e Sigefes (gestão
        das finanças públicas do Estado, utilizado pelo Governo Estadual). O
        painel destaca e compara os principais indicadores e resultados da
        gestão dos recursos públicos estaduais e municipais, constituindo-se em
        um instrumento de controle e acompanhamento das finanças públicas dos
        poderes estaduais e municipais do Espírito Santo.
      </PanelAlert>
      <div className="center flex-col mt-8">
        <ul className="flex justify-evenly w-full">
          {months.map((key, index) => (
            <li key={key} className="boletim-mensal center relative">
              <div className="flex flex-col gap-2">
                <div className="bg-blue-dark center font-bold rounded-full h-10 text-sm text-white w-10">
                  {index + 1}
                </div>
                <div className="text-center text-sm">{key}</div>
              </div>
            </li>
          ))}
        </ul>
        <BoletimMacroGestaoGovernamentalIcon className="mt-16" />
      </div>
    </DashboardLayout>
  );
}
