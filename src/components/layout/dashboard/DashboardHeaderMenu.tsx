"use client";
import DropdownItem from "@/components/dropdowns/dropdown/DropdownItem";
import AreaTematicaIcon from "@/components/images/icons/header/AreaTematicaIcon";
import BoletimIcon from "@/components/images/icons/header/BoletimIcon";
import EstadoIcon from "@/components/images/icons/header/EstadoIcon";
import FiscalizacaoIcon from "@/components/images/icons/header/FiscalizacaoIcon";
import InteligenciaArtificialIcon from "@/components/images/icons/header/InteligenciaArtificialIcon";
import ObrigacoesIcon from "@/components/images/icons/header/ObrigacoesIcon";
import PrestacaoContaIcon from "@/components/images/icons/header/PrestacaoContaIcon";
import { useGlobalState } from "@/providers/GlobalProvider";
import { getCodigoMunicipio } from "@/shared/municipio";
import Link from "next/link";
import { useParams } from "next/navigation";
import { use } from "react";
import DropdownMenu from "../../dropdowns/dropdown/DropdownMenu";

const ANO_DEFAULT = 2023;
const MES_DEFAULT = 1;

export default function DashboardHeaderItems() {
  return (
    <ul className="dashboard-menu font-bold hidden xl:flex">
      <li className="px-3 active">{/* <MegaMenuMunicipios /> */}</li>
      <li className="px-3">
        <LinkEstado />
      </li>
      <li className="px-3">
        <LinkObrigacoes />
      </li>
      <li className="px-3">
        <DropdownPrestacoesContas />
      </li>
      <li className="px-3">
        <DropdownFiscalizacoes />
      </li>
      <li className="px-3">
        <DropdownAreasTematicas />
      </li>
      <li className="px-3">
        <DropdownInteligenciaArtificial />
      </li>
      <li className="px-3">
        <LinkBoletins />
      </li>
    </ul>
  );
}

function DropdownAreasTematicas({}: {}) {
  const municipios = use(useGlobalState()).municipios;
  const params = useParams();

  return (
    <DropdownMenu icon={<AreaTematicaIcon />} title="Áreas temáticas">
      <ul className="font-normal">
        <DropdownItem>
          <Link
            href="/area-tematica/assistencia-social/referenciamento"
            prefetch={false}
          >
            Assistência social
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/area-tematica/concessao-publica/visao-geral"
            prefetch={false}
          >
            Concessões comuns e PPP
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/area-tematica/educacao/visao-geral" prefetch={false}>
            Educação
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/area-tematica/estrutura-administrativa" prefetch={false}>
            Estrutura administrativa
          </Link>
        </DropdownItem>
        <DropdownItem>
          {/* TODO: fix this link */}
          <Link
            href={`/folha-de-pagamento/executivo-municipal/${
              params.ano ?? ANO_DEFAULT
            }/${params.mes ?? MES_DEFAULT}/visao-geral/${
              getCodigoMunicipio(municipios, params.municipio) ?? ""
            }`}
            prefetch={false}
          >
            Pessoal
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/area-tematica/saude/estabelecimentos" prefetch={false}>
            Saúde
          </Link>
        </DropdownItem>
      </ul>
    </DropdownMenu>
  );
}

function DropdownFiscalizacoes() {
  const params = useParams();

  return (
    <DropdownMenu icon={<FiscalizacaoIcon />} title="Fiscalizações">
      <ul className="font-normal">
        <DropdownItem>
          <Link
            href={`/fiscalizacao/2020/saude/acoes-pandemia`}
            prefetch={false}
          >
            Ações sobre a Pandemia
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/2022/saude/cancer-colo-de-utero`}
            prefetch={false}
          >
            Câncer de colo de útero
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/2020/controle-interno/prefeituras`}
            prefetch={false}
          >
            Controle interno dos municípios
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/2020/educacao/desigualdade-educacional/manifestacao-tecnica`}
            prefetch={false}
          >
            Desigualdade educacional
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/2021/saude/doencas-cronicas-nao-transmissiveis`}
            prefetch={false}
          >
            Doenças crônicas não transmissíveis
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/fiscalizacao/2019/educacao/oferta-x-demanda/escolas"
            prefetch={false}
          >
            Educação - Levantamento Oferta x Demanda
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/estado/${params.ano ?? ANO_DEFAULT}/iege`}
            prefetch={false}
          >
            Índice de efetividade de gestão estadual (IEGE)
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/municipio/${params.ano ?? ANO_DEFAULT}/iegm`}
            prefetch={false}
          >
            Índice de efetividade de gestão municipal (IEGM)
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/2021/saude/mamografia-de-rastreamento`}
            prefetch={false}
          >
            Mamografias de rastreamento
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/2020/portal-transparencia/prefeituras`}
            prefetch={false}
          >
            Portais de transparência dos municípios
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/receita-municipal`} prefetch={false}>
            Receita pública municipal
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/2018/transparencia-passiva/prefeituras`}
            prefetch={false}
          >
            Transparência passiva
          </Link>
        </DropdownItem>
      </ul>
    </DropdownMenu>
  );
}

function DropdownInteligenciaArtificial() {
  return (
    <DropdownMenu
      icon={<InteligenciaArtificialIcon />}
      title="Inteligência artificial"
    >
      <ul className="font-normal">
        <DropdownItem>
          <Link href="/obras" prefetch={false}>
            Obras públicas
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/projecao" prefetch={false}>
            Projeções de gastos com pessoal
          </Link>
        </DropdownItem>
      </ul>
    </DropdownMenu>
  );
}

function DropdownPrestacoesContas() {
  const params = useParams();

  return (
    <DropdownMenu
      icon={<PrestacaoContaIcon small />}
      title="Prestações de contas"
    >
      <ul className="font-normal">
        <DropdownItem>
          <Link
            href={`/prestacao-de-conta/${
              params.ano ?? ANO_DEFAULT
            }/municipios/governo/07`}
            prefetch={false}
          >
            Processos
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/prestacao-de-conta/monitoramento/${
              params.ano ?? ANO_DEFAULT
            }/municipios/todos`}
            prefetch={false}
          >
            Monitoramentos
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/prestacao-de-conta/2023/parecer-previo`}
            prefetch={false}
          >
            Parecer prévio
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/prestacao-de-conta/julgamento-de-contas/visao-geral"
            prefetch={false}
          >
            Julgamento de contas
          </Link>
        </DropdownItem>
      </ul>
    </DropdownMenu>
  );
}

function LinkBoletins() {
  const params = useParams();

  return (
    <Link
      href={`/boletins/${params.ano ?? ANO_DEFAULT}/`}
      className="center gap-1"
      prefetch={false}
    >
      <BoletimIcon />
      Boletins
    </Link>
  );
}

function LinkEstado() {
  const params = useParams();

  return (
    <Link
      href={`/estado/${params.ano ?? ANO_DEFAULT}/visao-geral`}
      className="center gap-1"
      prefetch={false}
    >
      <EstadoIcon />
      Estado
    </Link>
  );
}

function LinkObrigacoes() {
  const params = useParams();

  return (
    <Link
      href={`/obrigacao-envio/${params.ano ?? ANO_DEFAULT}/municipios`}
      className="center gap-1"
      prefetch={false}
    >
      <ObrigacoesIcon />
      Obrigações
    </Link>
  );
}
