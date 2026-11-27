"use client";

import PanelWithTitleCollapsible from "@/components/panel/PanelWithTitleCollapsible";
import { formatMoney } from "@/formatters/number";
import { useEffect, useMemo, useState } from "react";
import { FaExternalLinkAlt, FaSearch } from "react-icons/fa";

type ConcessaoResumo = {
  idConcessao: string | number;
  nomeUnidadeGestora: string;
  nome: string;
  numeroAnoEdital: string;
  subfuncoesGovernos: string[];
  vigencia: string;
  situacao: string;
  valor: number;
};

type Licitante = {
  cnpj: string;
  nome: string;
  vencedor?: boolean;
};

type Contrato = {
  numero?: string;
  prorrogavel?: boolean;
  valor?: number;
  dataAssinatura?: string;
  inicioVigencia?: string;
  fimVigenciaCorrigido?: string;
  criterioReajustamento?: string;
  verificadorIndependente?: boolean;
  documentos?: { link?: string }[];
  aditivos?: {
    numero?: string;
    objeto?: string;
    valor?: number;
    dataAssinatura?: string;
    inicioVigencia?: string;
    fimVigencia?: string;
  }[];
  verificadoresIndependentes?: {
    cnpj: string;
    nome: string;
    valorContrato?: number;
    dataAssinaturaContrato?: string;
    dataFimPrevisto?: string;
  }[];
};

type ProcessoTCE = {
  idProcessoOriginal?: number;
  numeroCompletoProcesso?: string;
  link?: string;
  relator?: string;
  beneficios?: string;
  deliberacoes?: {
    numeroCompletoDeliberacao?: string;
    link?: string;
    determinacao?: string;
    recomendacao?: string;
  }[];
};

type ConcessaoDetalhada = {
  id: string | number;
  tipoConcessao: string;
  tipoEdital: string;
  numeroAnoEdital: string;
  dataPublicacaoEdital: string;
  criterioJulgamento?: string;
  nomeUnidadeGestora: string;
  situacaoConcessao: string;
  objeto: string;
  entidadeEstruturadora?: string;
  prazoConcessaoAnos?: number;
  licitantes: Licitante[];
  documentosEdital?: { link?: string }[];
  contratos: Contrato[];
  processos: ProcessoTCE[];
};

export default function DetalhamentoPPPPage() {
  const [loading, setLoading] = useState(true);
  const [concessoes, setConcessoes] = useState<ConcessaoResumo[]>([]);
  const [detalhes, setDetalhes] = useState<ConcessaoDetalhada[]>([]);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        const [resSumario, resDetalhes] = await Promise.all([
          fetch(
            "https://paineldecontrole.tcees.tc.br/api/ConcessaoPublicaControllers/ConcessaoPublica/GetSumarioModal?tipo=concessao"
          ),
          fetch(
            "https://paineldecontrole.tcees.tc.br/api/ConcessaoPublicaControllers/ConcessaoPublica/GetConcessoesDetalhamento"
          ),
        ]);

        if (resSumario.ok && resDetalhes.ok) {
          const sumarioData = await resSumario.json();
          const detalhesData = await resDetalhes.json();
          setConcessoes(sumarioData);
          setDetalhes(detalhesData);
          if (sumarioData.length > 0) {
            setSelectedId(sumarioData[0].idConcessao);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados de PPP:", err);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  const concessoesFiltradas = useMemo(() => {
    if (!filtro) return concessoes;
    const f = filtro.toLowerCase();
    return concessoes.filter(
      (c) =>
        c.nomeUnidadeGestora?.toLowerCase().includes(f) ||
        c.nome?.toLowerCase().includes(f) ||
        c.numeroAnoEdital?.toLowerCase().includes(f) ||
        c.situacao?.toLowerCase().includes(f)
    );
  }, [concessoes, filtro]);

  const concessaoSelecionada = useMemo(() => {
    return detalhes.find((d) => String(d.id) === String(selectedId)) ?? null;
  }, [detalhes, selectedId]);

  const contratoPrincipal = concessaoSelecionada?.contratos?.[0] ?? null;
  const vencedor = concessaoSelecionada?.licitantes?.find((l) => l.vencedor);

  return (
    <>
      <PanelWithTitleCollapsible
        header="Detalhamento das Concessões e Parcerias Público-Privadas (PPP)"
        headerProps={{ className: "font-bold text-xl" }}
      >
        <div>
          <p>
            Informações detalhadas sobre os projetos de concessão comum e PPP dos
            órgãos capixabas, incluindo participantes da licitação, contratos
            firmados, atuação de verificadores independentes e histórico de
            processos e deliberações do TCE-ES.
          </p>
        </div>
      </PanelWithTitleCollapsible>

      <div className="mt-4 flex flex-col gap-4">
        {/* Barra de pesquisa */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Buscar por concedente, edital, tipo ou situação..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        {/* Tabela de Concessões */}
        <div className="overflow-x-auto bg-white rounded shadow border max-h-72">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 sticky top-0">
              <tr>
                <th className="p-3">Concedente</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Edital</th>
                <th className="p-3">Situação</th>
                <th className="p-3 text-right">Valor estimado</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    Carregando projetos...
                  </td>
                </tr>
              ) : concessoesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              ) : (
                concessoesFiltradas.map((c) => (
                  <tr
                    key={c.idConcessao}
                    className={`cursor-pointer hover:bg-blue-50 border-t ${
                      String(c.idConcessao) === String(selectedId)
                        ? "bg-blue-100 font-semibold"
                        : ""
                    }`}
                    onClick={() => setSelectedId(c.idConcessao)}
                  >
                    <td className="p-3">{c.nomeUnidadeGestora}</td>
                    <td className="p-3">{c.nome}</td>
                    <td className="p-3">{c.numeroAnoEdital}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded text-xs bg-gray-200">
                        {c.situacao}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {formatMoney(c.valor)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Detalhes da Concessão Selecionada */}
        {concessaoSelecionada && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
            {/* Participantes e Licitação */}
            <div className="bg-white p-4 rounded shadow border flex flex-col gap-2">
              <h3 className="font-bold text-lg text-primary border-b pb-2">
                Participantes e Licitação
              </h3>
              <div className="text-sm grid grid-cols-2 gap-2">
                <div>
                  <span className="font-semibold text-gray-600">Tipo:</span>{" "}
                  {concessaoSelecionada.tipoConcessao}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Edital:</span>{" "}
                  {concessaoSelecionada.documentosEdital?.[0]?.link ? (
                    <a
                      href={concessaoSelecionada.documentosEdital[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {concessaoSelecionada.numeroAnoEdital}{" "}
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  ) : (
                    concessaoSelecionada.numeroAnoEdital
                  )}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Data Publicação:
                  </span>{" "}
                  {concessaoSelecionada.dataPublicacaoEdital
                    ? new Date(
                        concessaoSelecionada.dataPublicacaoEdital
                      ).toLocaleDateString("pt-BR")
                    : "-"}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Critério Julgamento:
                  </span>{" "}
                  {concessaoSelecionada.criterioJulgamento || "Não informado"}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-gray-600">
                    Concedente:
                  </span>{" "}
                  {concessaoSelecionada.nomeUnidadeGestora}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-gray-600">Objeto:</span>{" "}
                  {concessaoSelecionada.objeto}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-gray-600">
                    Vencedor da Licitação:
                  </span>{" "}
                  {vencedor
                    ? `${vencedor.cnpj} - ${vencedor.nome}`
                    : "Não informado / Em andamento"}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-gray-600">
                    Licitantes ({concessaoSelecionada.licitantes?.length ?? 0}):
                  </span>
                  <ul className="list-disc pl-5 mt-1 max-h-24 overflow-y-auto">
                    {concessaoSelecionada.licitantes?.map((l, i) => (
                      <li key={i}>
                        {l.cnpj} - {l.nome} {l.vencedor && "(Vencedor)"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contrato */}
            <div className="bg-white p-4 rounded shadow border flex flex-col gap-2">
              <h3 className="font-bold text-lg text-primary border-b pb-2">
                Contrato
              </h3>
              {contratoPrincipal ? (
                <div className="text-sm grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-semibold text-gray-600">
                      Nº Contrato:
                    </span>{" "}
                    {contratoPrincipal.documentos?.[0]?.link ? (
                      <a
                        href={contratoPrincipal.documentos[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {contratoPrincipal.numero}{" "}
                        <FaExternalLinkAlt className="text-xs" />
                      </a>
                    ) : (
                      contratoPrincipal.numero || "-"
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">Valor:</span>{" "}
                    {formatMoney(contratoPrincipal.valor ?? 0)}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Critério Reajuste:
                    </span>{" "}
                    {contratoPrincipal.criterioReajustamento || "Não informado"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      Prorrogável:
                    </span>{" "}
                    {contratoPrincipal.prorrogavel ? "Sim" : "Não"}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-gray-600">
                      Vigência:
                    </span>{" "}
                    {contratoPrincipal.inicioVigencia &&
                    contratoPrincipal.fimVigenciaCorrigido
                      ? `${new Date(
                          contratoPrincipal.inicioVigencia
                        ).toLocaleDateString("pt-BR")} até ${new Date(
                          contratoPrincipal.fimVigenciaCorrigido
                        ).toLocaleDateString("pt-BR")}`
                      : "-"}
                  </div>
                  {contratoPrincipal.aditivos &&
                    contratoPrincipal.aditivos.length > 0 && (
                      <div className="col-span-2 mt-2">
                        <span className="font-semibold text-gray-600">
                          Termos Aditivos ({contratoPrincipal.aditivos.length}):
                        </span>
                        <ul className="list-disc pl-5 mt-1 max-h-24 overflow-y-auto">
                          {contratoPrincipal.aditivos.map((ad, i) => (
                            <li key={i}>
                              {ad.numero || "Aditivo"}: {ad.objeto} (
                              {formatMoney(ad.valor ?? 0)})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ) : (
                <div className="text-sm text-gray-500 py-4">
                  Nenhum contrato cadastrado para este projeto.
                </div>
              )}
            </div>

            {/* Verificador Independente */}
            <div className="bg-white p-4 rounded shadow border flex flex-col gap-2">
              <h3 className="font-bold text-lg text-primary border-b pb-2">
                Verificador Independente
              </h3>
              {contratoPrincipal?.verificadoresIndependentes &&
              contratoPrincipal.verificadoresIndependentes.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-gray-600">
                        <th className="p-2 text-left">Responsável</th>
                        <th className="p-2 text-right">Valor</th>
                        <th className="p-2 text-center">Assinatura</th>
                        <th className="p-2 text-center">Fim Previsto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contratoPrincipal.verificadoresIndependentes.map(
                        (v, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2">
                              {v.cnpj} - {v.nome}
                            </td>
                            <td className="p-2 text-right">
                              {formatMoney(v.valorContrato ?? 0)}
                            </td>
                            <td className="p-2 text-center">
                              {v.dataAssinaturaContrato
                                ? new Date(
                                    v.dataAssinaturaContrato
                                  ).toLocaleDateString("pt-BR")
                                : "-"}
                            </td>
                            <td className="p-2 text-center">
                              {v.dataFimPrevisto
                                ? new Date(
                                    v.dataFimPrevisto
                                  ).toLocaleDateString("pt-BR")
                                : "-"}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-sm text-gray-500 py-4">
                  Não possui verificador independente cadastrado.
                </div>
              )}
            </div>

            {/* Atuação TCE */}
            <div className="bg-white p-4 rounded shadow border flex flex-col gap-2">
              <h3 className="font-bold text-lg text-primary border-b pb-2">
                Atuação TCE-ES
              </h3>
              {concessaoSelecionada.processos &&
              concessaoSelecionada.processos.length > 0 ? (
                <div className="overflow-x-auto max-h-60">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-gray-600">
                        <th className="p-2 text-left">Processo</th>
                        <th className="p-2 text-left">Relator</th>
                        <th className="p-2 text-left">Deliberações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {concessaoSelecionada.processos.map((p, i) => (
                        <tr key={i} className="border-b">
                          <td className="p-2">
                            {p.link ? (
                              <a
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline inline-flex items-center gap-1"
                              >
                                {p.numeroCompletoProcesso}{" "}
                                <FaExternalLinkAlt className="text-xs" />
                              </a>
                            ) : (
                              p.numeroCompletoProcesso || "-"
                            )}
                          </td>
                          <td className="p-2">{p.relator || "-"}</td>
                          <td className="p-2">
                            {p.deliberacoes && p.deliberacoes.length > 0 ? (
                              <div className="flex flex-col gap-1">
                                {p.deliberacoes.map((del, dIdx) => (
                                  <a
                                    key={dIdx}
                                    href={del.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline text-xs"
                                  >
                                    {del.numeroCompletoDeliberacao}
                                  </a>
                                ))}
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-sm text-gray-500 py-4">
                  Nenhum processo do TCE-ES cadastrado para este projeto.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
