import MultiSeriesChart from "@/components/charts/MultiSeriesChart";
import AlertPanel from "@/components/panel/AlertPanel";
import PanelWithTitle from "@/components/panel/PanelWithTitle";
import { ENV } from "@/shared/env";
import { EsferaProps } from "@/shared/esfera";
import { COLOR } from "@/theme/colors";
import { MultiSerie } from "@/types/Serie";

async function getMetasData(esfera: EsferaProps["esfera"], anoExercicio: number) {
  try {
    if (esfera.tipo === "estado") {
      const [resCorrente, resCapital] = await Promise.all([
        fetch(
          `${ENV.apiUrl}/EstadoControllers/DesempenhoMetaArrecadacao/GetEvolucaoMensalReceitasCorrente?anoExercicio=${anoExercicio}&v=${ENV.apiVersion}`
        ),
        fetch(
          `${ENV.apiUrl}/EstadoControllers/DesempenhoMetaArrecadacao/GetEvolucaoMensalReceitasCapital?anoExercicio=${anoExercicio}&v=${ENV.apiVersion}`
        ),
      ]);
      const [receitaCorrente, receitaCapital] = await Promise.all([
        resCorrente.ok ? ((await resCorrente.json()) as MultiSerie) : null,
        resCapital.ok ? ((await resCapital.json()) as MultiSerie) : null,
      ]);
      return { receitaCorrente, receitaCapital };
    }

    const [resCorrente, resCapital] = await Promise.all([
      fetch(
        `${ENV.apiUrl}/MunicipioControllers/Receita/GetDesempenhoMensalReceitaCorrenteMultiseries?anoExercicio=${anoExercicio}&idEsferaAdministrativa=${esfera.idEsferaAdministrativa}&v=${ENV.apiVersion}`
      ),
      fetch(
        `${ENV.apiUrl}/MunicipioControllers/Receita/GetDesempenhoMensalReceitaCapitalMultiseries?anoExercicio=${anoExercicio}&idEsferaAdministrativa=${esfera.idEsferaAdministrativa}&v=${ENV.apiVersion}`
      ),
    ]);
    const [receitaCorrente, receitaCapital] = await Promise.all([
      resCorrente.ok ? ((await resCorrente.json()) as MultiSerie) : null,
      resCapital.ok ? ((await resCapital.json()) as MultiSerie) : null,
    ]);
    return { receitaCorrente, receitaCapital };
  } catch {
    return { receitaCorrente: null, receitaCapital: null };
  }
}

export default async function MetaArrecadacao({
  esfera,
  anoExercicio,
}: EsferaProps) {
  const { receitaCorrente, receitaCapital } = await getMetasData(
    esfera,
    anoExercicio
  );

  return (
    <div className="flex flex-col gap-4">
      <AlertPanel type="info">
        A Lei de Responsabilidade Fiscal prevê que o Poder Executivo deve
        estabelecer a programação financeira e o cronograma de execução mensal de
        desembolso, bem como as metas bimestrais de arrecadação.
      </AlertPanel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PanelWithTitle header="Desempenho mensal da receita corrente">
          <MultiSeriesChart
            dados={receitaCorrente}
            corrigirIpca={anoExercicio}
            cores={[COLOR.receita, COLOR["chart-positivo"]]}
            style={{ height: "320px" }}
          />
        </PanelWithTitle>

        <PanelWithTitle header="Desempenho mensal da receita de capital">
          <MultiSeriesChart
            dados={receitaCapital}
            corrigirIpca={anoExercicio}
            cores={[COLOR.receita, COLOR["chart-positivo"]]}
            style={{ height: "320px" }}
          />
        </PanelWithTitle>
      </div>
    </div>
  );
}
