import { MunicipioPageProps } from "../MunicipioPageProps";
import { ObrigacoesJuntoTCEESPanel } from "./_panels/ObrigacoesJuntoTCEESPanel";
import { PrestacaoContaCamara } from "./_panels/PrestacaoContaCamara";
import { PrestacaoContaPrefeitura } from "./_panels/PrestacaoContaPrefeitura";
import { ReceitasXDespesasPanel } from "./_panels/ReceitasXDespesasPanel";

const FIRST_ROW_HEIGHT = "155px";

export default async function Page({ params }: { params: MunicipioPageProps }) {
  return (
    <div
      className="grid grid-flow-row gap-2 text-gray-dark"
      style={{ gridTemplateColumns: "2fr 1.5fr 2fr 2fr" }}
    >
      <ReceitasXDespesasPanel height={FIRST_ROW_HEIGHT} {...params} />
      <ObrigacoesJuntoTCEESPanel height={FIRST_ROW_HEIGHT} {...params} />
      <PrestacaoContaPrefeitura height={FIRST_ROW_HEIGHT} {...params} />
      <PrestacaoContaCamara height={FIRST_ROW_HEIGHT} {...params} />
    </div>
  );
}
