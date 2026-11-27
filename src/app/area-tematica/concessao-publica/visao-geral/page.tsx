import DoughnutChart, { DoughnutChartItem } from "@/components/charts/DoughnutChart";
import Iframe from "@/components/iframes/Iframe";
import DespesaPppLogo from "@/components/images/logos/DespesaPppLogo";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";
import { formatInt, formatMoneyKMB } from "@/formatters/number";
import { ENV } from "@/shared/env";
import { COLOR } from "@/theme/colors";
import { FaBuilding, FaHandshake, FaMoneyBillWave, FaSearchPlus } from "react-icons/fa";
import FolhaBarChart from "@/app/folha-de-pagamento/_components/visao-geral/FolhaBarChart";

type ResumoCards = {
  quantidadeConcedentes: number;
  quantidadeContratos: number;
  quantidadeProcessos: number;
  quantidadeConcessao: number;
  valorConcessao: number;
  valorBeneficios: number;
};

type ItemValor = {
  nome: string;
  valor: number;
};

async function getDadosConcessoes() {
  try {
    const base = `${ENV.apiUrl}/ConcessaoPublicaControllers/ConcessaoPublica`;
    const [resCards, resTipo, resSituacao, resConcedentes, resSetores] =
      await Promise.all([
        fetch(`${base}/GetResumoCards?codigoEsfera=null`),
        fetch(`${base}/GetTipoConcessao?codigoEsfera=null`),
        fetch(`${base}/GetSituacao?codigoEsfera=null`),
        fetch(`${base}/GetFaixaPoderConcedente?codigoEsfera=null`),
        fetch(`${base}/GetSetores?codigoEsfera=null`),
      ]);

    const [cards, tipos, situacoes, concedentes, setores] = await Promise.all([
      resCards.ok ? ((await resCards.json()) as ResumoCards) : null,
      resTipo.ok ? ((await resTipo.json()) as DoughnutChartItem[]) : [],
      resSituacao.ok ? ((await resSituacao.json()) as DoughnutChartItem[]) : [],
      resConcedentes.ok ? ((await resConcedentes.json()) as ItemValor[]) : [],
      resSetores.ok
        ? ((await resSetores.json()) as { valor: ItemValor[]; quantidade: ItemValor[] })
        : null,
    ]);

    return { cards, tipos, situacoes, concedentes, setores };
  } catch {
    return {
      cards: null,
      tipos: [],
      situacoes: [],
      concedentes: [],
      setores: null,
    };
  }
}

export default async function Page() {
  const { cards, tipos, situacoes, concedentes, setores } =
    await getDadosConcessoes();

  const concedentesItems = (concedentes || [])
    .slice(0, 10)
    .map((c) => ({ name: c.nome, value: c.valor }));

  const setoresItems = (setores?.valor || [])
    .slice(0, 8)
    .map((s) => ({ name: s.nome, value: Math.round(s.valor / 1e6) }));

  return (
    <div className="flex flex-col gap-4">
      <PanelWithTitleCollapsible
        header="Concessões comuns e Parcerias Público-Privadas"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            <span className="font-bold">Concessão comum</span>, regida pela Lei
            8.987/95, é um contrato através do qual o Poder Público transfere a
            execução de determinado serviço público ao particular, selecionado
            em prévia licitação, que assumirá, por prazo certo e por sua conta e
            risco, a gestão de projeto autossustentável (remunerado por tarifa
            paga pelo usuário do serviço).
          </p>
          <p className="mt-2">
            Já as{" "}
            <span className="font-bold">PPP (Parceria Público-Privada)</span>{" "}
            são concessões regidas pela Lei 11.079/04 e se dividem em:
          </p>
          <ul className="styled mt-2">
            <li>
              <p>
                <span className="font-bold">PPP patrocinada</span>: concessão de
                serviços públicos ou de obras públicas, quando envolver,
                adicionalmente à tarifa cobrada dos usuários, contraprestação
                pecuniária do parceiro público ao parceiro privado.
              </p>
            </li>
            <li>
              <p>
                <span className="font-bold">PPP administrativa</span>: contrato
                de prestação de serviços de que a Administração Pública seja a
                usuária direta ou indireta, ainda que envolva execução de obra
                ou fornecimento e instalação de bens. A concessionária não é
                remunerada mediante tarifas, mas através de contraprestação paga
                pelo Poder Público.
              </p>
            </li>
          </ul>
        </div>
        <div className="center w-4/12">
          <DespesaPppLogo />
        </div>
      </PanelWithTitleCollapsible>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <FaHandshake className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Contratos de Desestatização
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatInt(cards?.quantidadeContratos ?? 0)}
            </div>
            <div className="text-xs text-gray-500">
              {cards?.quantidadeConcessao ?? 0} concessões e PPPs
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <FaMoneyBillWave className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Valor Total dos Contratos
            </div>
            <div className="text-2xl font-bold text-gray-800">
              R$ {formatMoneyKMB(cards?.valorConcessao ?? 0)}
            </div>
            <div className="text-xs text-gray-500">Valor nominal global</div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
            <FaBuilding className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Concedentes
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatInt(cards?.quantidadeConcedentes ?? 0)}
            </div>
            <div className="text-xs text-gray-500">Estado e municípios</div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded shadow-sm flex items-center gap-3">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
            <FaSearchPlus className="text-xl" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-semibold uppercase">
              Processos de Fiscalização
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatInt(cards?.quantidadeProcessos ?? 0)}
            </div>
            <div className="text-xs text-gray-500">
              Benefícios: R$ {formatMoneyKMB(cards?.valorBeneficios ?? 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos Analíticos Nativos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PanelWithDescription
          titulo="Tipos de desestatização"
          descricao="Representa o quantitativo e o valor dos contratos de desestatização celebrados."
        >
          {tipos.length ? (
            <DoughnutChart
              items={tipos}
              colors={COLOR.padraoRange}
              style={{ height: "300px" }}
            />
          ) : (
            <div className="m-auto opacity-60 p-8 text-center">Sem dados</div>
          )}
        </PanelWithDescription>

        <PanelWithDescription
          titulo="Situações de licitações e contratos"
          descricao="Exibe o quantitativo de cada situação dos processos de desestatização."
        >
          {situacoes.length ? (
            <DoughnutChart
              items={situacoes}
              colors={COLOR.padraoRange}
              style={{ height: "300px" }}
            />
          ) : (
            <div className="m-auto opacity-60 p-8 text-center">Sem dados</div>
          )}
        </PanelWithDescription>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PanelWithDescription
          titulo="Concedentes em destaque"
          descricao="Representa o quantitativo de contratos de desestatização por ente federativo subnacional."
        >
          {concedentesItems.length ? (
            <FolhaBarChart items={concedentesItems} />
          ) : (
            <div className="m-auto opacity-60 p-8 text-center">Sem dados</div>
          )}
        </PanelWithDescription>

        <PanelWithDescription
          titulo="Desestatização por setores (em milhões de R$)"
          descricao="Demonstra os valores investidos por setor na desestatização e concessões públicas."
        >
          {setoresItems.length ? (
            <FolhaBarChart items={setoresItems} />
          ) : (
            <div className="m-auto opacity-60 p-8 text-center">Sem dados</div>
          )}
        </PanelWithDescription>
      </div>

      {/* Relatório Interativo PowerBI */}
      <PanelWithTitleCollapsible
        header="Relatório Integrado PowerBI"
        headerProps={{ className: "font-semibold text-lg" }}
      >
        <Iframe
          src="https://app.powerbi.com/view?r=eyJrIjoiMDMzMDg0NGEtZDIzZS00Y2FhLWIxNmQtNmViNGI2NGVhYmExIiwidCI6IjlkMTQzN2IxLTQ3MmMtNDUwMS05NDM5LWRjZmU5YTQxZjJiMCJ9&pageName=ReportSection"
          className="h-[600px] w-full"
        />
      </PanelWithTitleCollapsible>
    </div>
  );
}
