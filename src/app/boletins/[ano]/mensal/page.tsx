import BoletimMacroGestaoGovernamentalIcon from "@/components/images/icones/BoletimMacroGestaoGovernamentalIcon";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import CircleList from "@/components/lists/CircleList";
import PanelAlert from "@/components/panel/PanelAlert";
import { getMonthNames } from "@/shared/date";
import { cache } from "react";
import { BoletinsPageProps } from "../BoletinsPageProps";
import BoletinsSubmenuItems from "../BoletinsSubmenuItems";
import SidebarBoletins from "../_components/SidebarBoletins";
import "./boletim-mensal.css";

const months = getMonthNames();

const getData = cache(
  async ({ ano, mes }: BoletinsPageProps & { mes?: string }) => {
    const res = await fetch(
      `https://paineldecontrole.tcees.tc.br/api/EstadoControllers/ResumoExecutivo/GetResumoExecutivo?idEsferaAdministrativa=81&anoExercicio=${ano}&mes=${mes}&v=18-07-2023-5.2.14`
    );
    const data: {
      conteudo: string;
      mesUltimoEnvio: number;
    } = await res.json();
    return data;
  }
);

export default async function Page({ params }: { params: BoletinsPageProps }) {
  const data = await getData({ ...params });
  //const [x, setX] = useState(data.mesUltimoEnvio);

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
      <div className="center flex-col mt-8 overflow-hidden">
        <CircleList className="boletim-mensal">
          {months.map((key, index) => (
            <li key={key} className="lg:gap-2">
              <hr />
              <div className="lg:hidden">{index + 1}</div>
              <div
                className="hidden lg:block"
                style={{ marginTop: "calc(1.5 * var(--circle-list-radius))" }}
              >
                {index + 1}
              </div>
              <div className="hidden text-blue-dark lg:block">{key}</div>
            </li>
          ))}
        </CircleList>
        <BoletimMacroGestaoGovernamentalIcon className="mt-16" />
        <div dangerouslySetInnerHTML={{ __html: data.conteudo }} />
      </div>
    </DashboardLayout>
  );
}
