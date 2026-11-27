import { AvisoDeclaratorio } from "@/components/previdencia/AvisoPrevidencia";
import Despesas from "@/components/previdencia/despesas/Despesas";
import Patrimonio from "@/components/previdencia/patrimonio/Patrimonio";
import ProjecoesAtuariais from "@/components/previdencia/projecoes-atuariais/ProjecoesAtuariais";
import Receitas from "@/components/previdencia/receitas/Receitas";
import ResultadoAtuarial from "@/components/previdencia/resultado-atuarial/ResultadoAtuarial";
import { ESFERA_ESTADO } from "@/shared/esfera";
import { redirecionarParaPaginaPadrao } from "@/shared/paginasRedirect";
import {
  getUnidadeGestoraDaPagina,
  getUnidadesGestorasPrevidencia,
} from "@/shared/previdenciaServer";
import { getUrlBaseEstado } from "../../../routes";
import { PAGINAS_PREVIDENCIA, SLUG_PREVIDENCIA } from "../../routes";

type Props = {
  params: Promise<{
    ano: string;
    subpagina: string;
    unidadeGestora?: string[];
  }>;
};

export default async function Page({ params }: Props) {
  const { ano, subpagina, unidadeGestora } = await params;
  const urlBase = getUrlBaseEstado(ano);
  const pagina = PAGINAS_PREVIDENCIA.find((p) => p.slug === subpagina);

  if (!pagina || !pagina.implementado) {
    redirecionarParaPaginaPadrao({
      paginas: PAGINAS_PREVIDENCIA,
      subpagina,
      urlSecao: `${urlBase}/${SLUG_PREVIDENCIA}`,
      urlAlternativa: `${urlBase}/visao-geral`,
    });
    return null;
  }

  const unidadesGestoras = await getUnidadesGestorasPrevidencia(
    ESFERA_ESTADO.codigo
  );
  const ug = getUnidadeGestoraDaPagina({
    pagina,
    unidadesGestoras,
    unidadeGestora,
    urlPagina: `${urlBase}/${SLUG_PREVIDENCIA}/${subpagina}`,
  });

  if (!ug) {
    return <AvisoDeclaratorio />;
  }

  const anoExercicio = Number(ano);
  const prevProps = {
    esfera: ESFERA_ESTADO,
    anoExercicio,
    codigoUnidadeGestora: ug.codigo,
  };

  switch (subpagina) {
    case "receitas":
      return <Receitas {...prevProps} />;
    case "despesas":
      return <Despesas {...prevProps} />;
    case "patrimonio":
      return <Patrimonio {...prevProps} />;
    case "projecoes-atuariais":
      return <ProjecoesAtuariais {...prevProps} />;
    case "resultado-atuarial":
      return <ResultadoAtuarial {...prevProps} />;
    default:
      return null;
  }
}
