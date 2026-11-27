import AlertPanel from "@/components/panel/AlertPanel";
import { EsferaProps } from "@/shared/esfera";
import { getDadosApiEsfera } from "@/shared/esfera";
import { getSankeyFonteRecurso } from "../_shared/api";
import SankeyFiltrado from "../_shared/SankeyFiltrado";

/** Gestão orçamentária > Destino do dinheiro (site oficial: DestinoDinheiro), igual para município e estado */

type FonteRecurso = {
  nome: string;
  codigos: string[];
  codigosDetalhamento: string[];
};

type Registro = {
  nomeFonteReduzida: string;
  nomeCategoria: string;
  nomeGrupo: string;
  nomeModalidade: string;
  nomeElemento: string;
  nomeSubElemento: string;
  value: number;
};

export default async function DestinoDoDinheiro({
  esfera,
  anoExercicio,
  fonte,
}: EsferaProps & { fonte?: string }) {
  const fontes = (
    (await getDadosApiEsfera<FonteRecurso[]>(
      esfera,
      anoExercicio,
      "Despesa/GetFontesRecursos"
    )) ?? []
  ).filter(
    (item) =>
      item.nome !== "-" && item.codigos?.length && item.codigosDetalhamento?.length
  );

  const selecionada = fontes.find((item) => item.codigos[0] === fonte) ?? fontes[0];
  const registros = selecionada
    ? await getSankeyFonteRecurso<Registro[]>(
        esfera,
        anoExercicio,
        selecionada.codigos[0],
        selecionada.codigosDetalhamento
      )
    : null;

  const entePossessivo = esfera.tipo === "estado" ? "do Estado" : "do seu município";

  return (
    <div className="flex flex-col gap-3">
      <AlertPanel type="info" className="min-h-0">
        Aqui você acompanha como o dinheiro proveniente de determinadas fontes
        de recursos tem sido aplicado em {entePossessivo}. São apresentadas as
        despesas associadas à fonte de recurso selecionada e você pode filtrar
        pelas suas classificações contábeis. Em breve serão disponibilizadas
        outras fontes de recursos.
      </AlertPanel>

      {fontes.length === 0 ? (
        <AlertPanel type="warning">
          <strong>Sem dados de despesas.</strong> Não há fontes de recursos
          informadas para o ano de {anoExercicio}.
        </AlertPanel>
      ) : (
        <SankeyFiltrado
          opcoes={fontes.map((item) => ({
            valor: item.codigos[0],
            nome: item.nome,
          }))}
          selecionado={selecionada.codigos[0]}
          parametro="fonte"
          niveis={[
            { campo: "nomeFonteReduzida", rotulo: "Fonte", fixo: true },
            { campo: "nomeCategoria", rotulo: "Categoria" },
            { campo: "nomeGrupo", rotulo: "Grupo" },
            { campo: "nomeModalidade", rotulo: "Modalidade" },
            { campo: "nomeElemento", rotulo: "Elemento" },
            { campo: "nomeSubElemento", rotulo: "SubElemento" },
          ]}
          registros={registros}
          mensagemSemDados={`Não foram realizadas despesas na fonte de recurso selecionada no ano de ${anoExercicio}.`}
        />
      )}
    </div>
  );
}
