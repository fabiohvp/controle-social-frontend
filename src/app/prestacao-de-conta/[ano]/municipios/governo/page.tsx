import PrestacaoDeContaGovernoPage, {
  PrestacaoDeContaGovernoPageProps,
} from "../../_components/pages/PrestacaoDeContaGovernoPage";
import { ResumoProcessos, SituacaoProcesso } from "../../type";

async function getResumoProcessos({
  ano,
}: PrestacaoDeContaGovernoPageProps): Promise<ResumoProcessos> {
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/PrestacaoContaControllers/EsferaAdministrativa/GetResumoProcessosPrestacaoContaAnualPorTipoConta?tipoConta=Governo&anoExercicio=${ano}&codigoTipoUG=07&dadosMunicipios=true&v=29-07-2023-5.2.19`
  );
  return res.json().then((o) =>
    o.reduce((acc: any, p: any) => {
      acc[p.resultado] = { quantidade: p.quantidade };
      return acc;
    }, {})
  );
}

async function getSituacaoProcessos({
  ano,
}: PrestacaoDeContaGovernoPageProps): Promise<SituacaoProcesso[]> {
  const res = await fetch(
    `https://paineldecontrole.tcees.tc.br/api/PrestacaoContaControllers/EsferaAdministrativa/GetProcessosPrestacaoContaAnualPorTipoConta?tipoConta=Governo&anoExercicio=${ano}&codigoTipoUG=07&dadosMunicipios=true&v=29-07-2023-5.2.19`
  );
  return res.json();
}

export default async function Page(props: {
  params: PrestacaoDeContaGovernoPageProps;
}) {
  const [resumoProcesso, situacaoProcessos] = await Promise.all([
    getResumoProcessos(props.params),
    getSituacaoProcessos(props.params),
  ]);

  return (
    <PrestacaoDeContaGovernoPage
      resumoProcessos={resumoProcesso}
      situacaoProcessos={situacaoProcessos}
      {...props}
    />
  );
}
