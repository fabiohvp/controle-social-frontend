import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import PanelWithDescription from "@/components/panel/PanelWithDescription";
import { ENV } from "@/shared/env";
import { notFound } from "next/navigation";
import TabelaResponsaveis, { Responsavel } from "./_components/TabelaResponsaveis";

type DadosCadastrais = {
  nome: string;
  nomeCompleto: string;
  codigo: string;
  cnpj: string;
  sigla: string;
  telefone: string;
  poder: string;
  esfera: string;
  tipo: string;
  endereco: {
    cep: string;
    logradouro: string;
    complemento?: string | null;
    bairro: string;
    cidade: string;
  };
  idcMacrorregiao: string;
};

async function getDadosUG(codigo: string) {
  try {
    const [resCad, resResp] = await Promise.all([
      fetch(
        `${ENV.apiUrl}/UnidadeGestoraControllers/Detalhes/GetDadosCadastrais?codigoUnidadeGestora=${codigo}&v=${ENV.apiVersion}`,
        { next: { revalidate: 3600 } }
      ),
      fetch(
        `${ENV.apiUrl}/UnidadeGestoraControllers/Detalhes/GetDadosResponsaveis?codigoUnidadeGestora=${codigo}&v=${ENV.apiVersion}`,
        { next: { revalidate: 3600 } }
      ),
    ]);

    const jsonCad = resCad.ok ? await resCad.json() : null;
    const jsonResp = resResp.ok ? await resResp.json() : null;

    return {
      cadastrais: (jsonCad?.dados as DadosCadastrais) || null,
      responsaveis: (jsonResp?.dados as Responsavel[]) || [],
    };
  } catch {
    return { cadastrais: null, responsaveis: [] };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ codigo: string }>;
}) {
  const { codigo } = await params;
  const { cadastrais, responsaveis } = await getDadosUG(codigo);

  if (!cadastrais) notFound();

  const enderecoFormatado = cadastrais.endereco
    ? [
        cadastrais.endereco.logradouro,
        cadastrais.endereco.complemento,
        cadastrais.endereco.bairro,
        `${cadastrais.endereco.cidade} - ES`,
        cadastrais.endereco.cep ? `CEP: ${cadastrais.endereco.cep}` : null,
      ]
        .filter(Boolean)
        .join(", ")
    : "Não informado";

  return (
    <DashboardLayout
      className="p-4 flex flex-col gap-4"
      itensBreadcrumb={
        <div className="flex items-center gap-2 text-sm text-gray-medium">
          <span>Unidades Gestoras</span>
          <span>/</span>
          <span className="font-semibold text-gray-dark">
            {cadastrais.codigo}
          </span>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Card Identificação */}
        <PanelWithDescription
          className="col-span-12 md:col-span-8"
          titulo={cadastrais.nomeCompleto || cadastrais.nome}
          descricao={`${cadastrais.poder} • ${cadastrais.esfera} • ${cadastrais.tipo}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm pt-2">
            <div>
              <span className="text-gray-medium block">Código UG:</span>
              <span className="font-semibold">{cadastrais.codigo}</span>
            </div>
            <div>
              <span className="text-gray-medium block">CNPJ:</span>
              <span className="font-semibold">{cadastrais.cnpj || "Não informado"}</span>
            </div>
            <div>
              <span className="text-gray-medium block">Sigla:</span>
              <span className="font-semibold">{cadastrais.sigla || "Não informada"}</span>
            </div>
            <div>
              <span className="text-gray-medium block">Telefone:</span>
              <span className="font-semibold">{cadastrais.telefone || "Não informado"}</span>
            </div>
            <div>
              <span className="text-gray-medium block">Macrorregião:</span>
              <span className="font-semibold">{cadastrais.idcMacrorregiao || "Não informada"}</span>
            </div>
          </div>
        </PanelWithDescription>

        {/* Card Endereço */}
        <PanelWithDescription
          className="col-span-12 md:col-span-4"
          titulo="Localização e Contato"
          descricao="Endereço da sede da unidade"
        >
          <div className="text-sm pt-2">
            <p className="text-gray-dark leading-relaxed">
              {enderecoFormatado}
            </p>
          </div>
        </PanelWithDescription>

        {/* Quadro de Responsáveis */}
        <div className="col-span-12 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <TabelaResponsaveis responsaveis={responsaveis} />
        </div>
      </div>
    </DashboardLayout>
  );
}
