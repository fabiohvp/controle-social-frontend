import PanelWithTitle from "@/components/panel/PanelWithTitle";
import LegendTooltip from "@/components/tooltip/LegendTooltip";
import { formatCurrency } from "@/formatters/number";
import {
  MunicipioPageProps,
  MunicipioPanelProps,
  getCodigoMunicipio,
} from "../../MunicipioPageProps";

async function getData({ ano, municipio }: MunicipioPageProps) {
  "use server";
  const codigo = getCodigoMunicipio(municipio);
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/PrevidenciaControllers/Patrimonio/GetNecessidadeCoberturaFinanceira?codigoUnidadeGestora=${codigo}E0900001&anoExercicio=${ano}&v=11-07-2023-5.2.10`
  );
  const data = await res.json();
  return data as { [key: string]: number };
}

export async function FundoFinanceiroPanel({
  ano,
  municipio,
  style,
}: MunicipioPanelProps) {
  const data = await getData({ ano, municipio });

  return (
    <PanelWithTitle
      className="center flex-col gap-4"
      style={style}
      legend={
        <LegendTooltip id="pessoal-consolidado-tooltip">
          Diferença negativa entre receitas e despesas previdenciárias,
          revelando a necessidade de cobertura de insuficiência financeira por
          meio de aporte financeiro do ente federativo.
        </LegendTooltip>
      }
      title="Previdência - Fundo Financeiro"
    >
      <div className="font-bold text-3xl">{formatCurrency(data?.valor)}</div>
      <div className="text-sm">
        Necessidade de cobertura financeira nos próximos 75 anos
      </div>
    </PanelWithTitle>
  );
}
