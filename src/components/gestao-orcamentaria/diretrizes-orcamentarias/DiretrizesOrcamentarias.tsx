import AlertPanel from "@/components/panel/AlertPanel";
import { formatFloat } from "@/formatters/number";
import { EsferaProps } from "@/shared/esfera";
import Link from "next/link";
import { getDadosPlanejamento } from "../_shared/api";

/*
 * Gestão orçamentária > Diretrizes orçamentárias (site oficial:
 * DiretrizesOrcamentarias), igual para município e estado. O "ano" da página é
 * o início do quadriênio do PPA (2018, 2022, 2026); as abas escolhem o ano da LDO.
 */

type Ldo = {
  anoVigenciaLDO: number;
  anoInicialPPAVigente: number;
  numeroLeiMunicipalLDO: string;
  anoLeiMunicipalLDO: number;
  dataPublicacaoLeiLDO: string;
  ldoEstabeleceuProgramasPrioritarios: string;
  valorCorrenteMetaFiscalReceitaTotal: number;
  valorCorrenteMetaFiscalDespesaTotal: number;
  valorCorrenteMetaFiscalResultadoPrimario: number;
  valorCorrenteMetaFiscalResultadoNominal: number;
  valorCorrenteMetaFiscalDividaPublicaConsolidada: number;
  valorCorrenteMetaFiscalDividaConsolidadaLiquida: number;
};

type ProgramaLdo = {
  codigoPrograma: string;
  descricaoPrograma: string;
  caraterPrograma: string;
  valorPlanejado: number;
  valorExecutado: number;
  percentualExecutado: number;
  valorPlanejadoAcumulado: number;
  valorExecutadoAcumulado: number;
  percentualExecutadoAcumulado: number;
};

const moeda = (valor: number | null | undefined) =>
  `R$ ${formatFloat(valor ?? 0)}`;
const percentual = (valor: number | null | undefined) =>
  `${formatFloat(valor ?? 0)}%`;

function Item({ titulo, valor }: { titulo: string; valor: string | number }) {
  return (
    <div>
      {titulo}: <strong>{valor}</strong>
    </div>
  );
}

export default async function DiretrizesOrcamentarias({
  esfera,
  anoExercicio,
  anoLdo,
}: EsferaProps & { anoLdo?: number }) {
  const anosQuadrienio = [0, 1, 2, 3].map((i) => anoExercicio + i);
  const anoSelecionado = anosQuadrienio.includes(anoLdo ?? 0)
    ? (anoLdo as number)
    : anoExercicio;
  const parametros = {
    anoInicialPPAVigente: anoExercicio,
    anoVigenciaLDO: anoSelecionado,
  };

  const [ldos, programas] = await Promise.all([
    getDadosPlanejamento<Ldo[]>(esfera, "GetLeiDiretrizOrcamentaria", parametros),
    getDadosPlanejamento<ProgramaLdo[]>(
      esfera,
      "GetProgramasLeiDiretrizOrcamentaria",
      parametros
    ),
  ]);
  const ldo = ldos?.[0];

  return (
    <div className="flex flex-col gap-3">
      <AlertPanel type="info" className="min-h-0">
        A Lei de Diretrizes Orçamentárias tem vigência anual e estabelece as
        metas e prioridades {esfera.tipo === "estado" ? "do Estado" : "do município"},
        indicando as ações mais importantes relacionadas a obras e serviços. A
        LDO determina os critérios que deverão ser seguidos para a elaboração da
        Lei Orçamentária Anual para que sejam atingidas as metas previstas no
        PPA.
        <br />
        <br />
        <strong>
          Os valores executados nos programas correspondem às despesas
          liquidadas e os restos a pagar não processados liquidados.
        </strong>
      </AlertPanel>

      <nav aria-label="Ano da LDO" className="flex gap-1 border-b border-gray-300">
        {anosQuadrienio.map((ano) => (
          <Link
            key={ano}
            href={`?ldo=${ano}`}
            scroll={false}
            prefetch={false}
            aria-current={ano === anoSelecionado ? "page" : undefined}
            className={`px-4 py-2 ${ano === anoSelecionado ? "border-b-2 border-blue-dark font-bold text-blue-dark" : "text-gray-dark"}`}
          >
            {ano}
          </Link>
        ))}
      </nav>

      {!ldo ? (
        <AlertPanel type="warning">
          <strong>Lei de Diretrizes Orçamentárias (LDO) não informada.</strong>{" "}
          Não há LDO aprovada para o ano selecionado ou as informações ainda não
          foram enviadas ao TCE-ES.
        </AlertPanel>
      ) : (
        <>
          <section className="grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2">
            <Item titulo="Ano Inicio LDO" valor={ldo.anoVigenciaLDO} />
            <Item titulo="Data Lei" valor={ldo.dataPublicacaoLeiLDO} />
            <Item titulo="Ano Inicial PPA" valor={ldo.anoInicialPPAVigente} />
            <Item
              titulo="Prioritário"
              valor={ldo.ldoEstabeleceuProgramasPrioritarios}
            />
            <Item
              titulo="Número/Ano Lei"
              valor={`${ldo.numeroLeiMunicipalLDO} / ${ldo.anoLeiMunicipalLDO}`}
            />
            <h3 className="col-span-full mt-3 border-b border-gray-300 pb-1 text-blue-dark">
              Valores correntes estabelecidos como metas fiscais para o ano de
              referência:
            </h3>
            <Item
              titulo="Despesa Total"
              valor={moeda(ldo.valorCorrenteMetaFiscalDespesaTotal)}
            />
            <Item
              titulo="Receita Total"
              valor={moeda(ldo.valorCorrenteMetaFiscalReceitaTotal)}
            />
            <Item
              titulo="Dívida Consolidada Líquida"
              valor={moeda(ldo.valorCorrenteMetaFiscalDividaConsolidadaLiquida)}
            />
            <Item
              titulo="Resultado Nominal"
              valor={moeda(ldo.valorCorrenteMetaFiscalResultadoNominal)}
            />
            <Item
              titulo="Dívida Pública Consolidada"
              valor={moeda(ldo.valorCorrenteMetaFiscalDividaPublicaConsolidada)}
            />
            <Item
              titulo="Resultado Primário"
              valor={moeda(ldo.valorCorrenteMetaFiscalResultadoPrimario)}
            />
          </section>

          <section>
            <h3 className="border-b border-gray-300 pb-1 text-blue-dark">
              Programas Prioritários:
            </h3>
            {!programas?.length ? (
              <AlertPanel type="warning" className="mt-2 min-h-0">
                A Lei de Diretrizes Orçamentárias (LDO) não estabeleceu programas
                prioritários para esse ano.
              </AlertPanel>
            ) : (
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      {[
                        "Código",
                        "Descrição",
                        "Caráter",
                        "Planejado",
                        "Executado",
                        "Executado (%)",
                        "Planejado Acum.",
                        "Executado Acum.",
                        "Executado Acum. (%)",
                      ].map((coluna) => (
                        <th key={coluna} className="p-2">
                          {coluna}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {programas.map((programa) => (
                      <tr
                        key={programa.codigoPrograma}
                        className="border-b odd:bg-white even:bg-gray-50"
                      >
                        <td className="p-2">{programa.codigoPrograma}</td>
                        <td className="p-2">{programa.descricaoPrograma}</td>
                        <td className="p-2">{programa.caraterPrograma}</td>
                        <td className="p-2">{moeda(programa.valorPlanejado)}</td>
                        <td className="p-2">{moeda(programa.valorExecutado)}</td>
                        <td className="p-2">
                          {percentual(programa.percentualExecutado)}
                        </td>
                        <td className="p-2">
                          {moeda(programa.valorPlanejadoAcumulado)}
                        </td>
                        <td className="p-2">
                          {moeda(programa.valorExecutadoAcumulado)}
                        </td>
                        <td className="p-2">
                          {percentual(programa.percentualExecutadoAcumulado)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
