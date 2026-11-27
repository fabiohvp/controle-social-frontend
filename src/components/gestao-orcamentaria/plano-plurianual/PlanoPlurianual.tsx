import AlertPanel from "@/components/panel/AlertPanel";
import { formatFloat } from "@/formatters/number";
import { EsferaProps } from "@/shared/esfera";
import { getDadosPlanejamento } from "../_shared/api";
import { getAnoInicialPpa } from "../diretrizes-orcamentarias/DiretrizesOrcamentarias";

export type ItemPpa = {
  anoInicialPPAVigente: number;
  anoFinalPPA: number;
  numeroLeiMunicipalAprovouPPA: string;
  anoLeiMunicipalAprovouPPA: number;
  dataPublicacaoLeiPPA: string;
  codigoPrograma: string;
  valorTotalPPA: number;
  descricaoProgramaPPA: string;
  objetivoProgramaPPA: string;
  valorTotalProgramaPPA: number;
  tipoPrograma: string;
};

const moeda = (valor: number | null | undefined) =>
  `R$ ${formatFloat(valor ?? 0)}`;

function InfoItem({ titulo, valor }: { titulo: string; valor: string | number }) {
  return (
    <div>
      {titulo}: <strong>{valor}</strong>
    </div>
  );
}

export default async function PlanoPlurianual({
  esfera,
  anoExercicio,
}: EsferaProps) {
  const anoInicial = getAnoInicialPpa(anoExercicio);
  const dados = await getDadosPlanejamento<ItemPpa[]>(
    esfera,
    "GetPlanoPlurianual",
    {
      anoInicialPPAVigente: anoInicial,
      unidadeGestora: "",
    }
  );

  const primeiro = dados?.[0];

  return (
    <div className="flex flex-col gap-4">
      <AlertPanel type="info" className="min-h-0">
        O Plano Plurianual tem vigência de quatro anos e expressa a visão
        estratégica do município, descrevendo suas diretrizes, objetivos e metas
        de médio prazo. Estabelece quais serão os investimentos do município em
        saúde, educação, turismo, dentre outros. O PPA pode sofrer atualizações e
        ajustes para se readequar a novas realidades.
        <br />
        <br />
        <strong>
          Os valores executados nos programas correspondem às despesas
          liquidadas e os restos a pagar não processados liquidados.
        </strong>
      </AlertPanel>

      {!dados?.length || !primeiro ? (
        <AlertPanel type="warning">
          <strong>Plano Plurianual (PPA) não informado.</strong> Não há dados do
          PPA vigentes para o período ou as informações ainda não foram
          enviadas ao TCE-ES.
        </AlertPanel>
      ) : (
        <>
          <section className="grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2 bg-white p-4 border border-gray-200 rounded">
            <InfoItem
              titulo="Período de Vigência"
              valor={`${primeiro.anoInicialPPAVigente} a ${primeiro.anoFinalPPA}`}
            />
            <InfoItem
              titulo="Número/Ano Lei"
              valor={`${primeiro.numeroLeiMunicipalAprovouPPA || "-"} / ${primeiro.anoLeiMunicipalAprovouPPA || "-"}`}
            />
            <InfoItem
              titulo="Data Publicação"
              valor={primeiro.dataPublicacaoLeiPPA || "-"}
            />
            <InfoItem
              titulo="Valor Total do PPA"
              valor={moeda(primeiro.valorTotalPPA)}
            />
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-gray-800">
              Programas do PPA ({dados.length})
            </h3>
            <div className="overflow-x-auto max-h-[600px] border border-gray-200 rounded">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-700 sticky top-0">
                  <tr>
                    <th className="p-2.5">Código</th>
                    <th className="p-2.5">Descrição</th>
                    <th className="p-2.5">Objetivo</th>
                    <th className="p-2.5">Tipo</th>
                    <th className="p-2.5 text-right">Valor Total do Programa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dados.map((prog, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 odd:bg-white even:bg-gray-50/50"
                    >
                      <td className="p-2.5 font-medium whitespace-nowrap">
                        {prog.codigoPrograma}
                      </td>
                      <td className="p-2.5 font-medium text-xs max-w-xs">
                        {prog.descricaoProgramaPPA}
                      </td>
                      <td className="p-2.5 text-xs text-gray-600 max-w-sm">
                        {prog.objetivoProgramaPPA || "-"}
                      </td>
                      <td className="p-2.5 whitespace-nowrap text-xs">
                        {prog.tipoPrograma || "-"}
                      </td>
                      <td className="p-2.5 text-right font-medium whitespace-nowrap">
                        {moeda(prog.valorTotalProgramaPPA)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
