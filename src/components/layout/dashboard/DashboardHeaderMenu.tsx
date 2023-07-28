"use client";
import DropdownItem from "@/components/dropdowns/dropdown/DropdownItem";
import AreaTematicaIcon from "@/components/images/icons/header/AreaTematicaIcon";
import BoletimIcon from "@/components/images/icons/header/BoletimIcon";
import EstadoIcon from "@/components/images/icons/header/EstadoIcon";
import FiscalizacaoIcon from "@/components/images/icons/header/FiscalizacaoIcon";
import InteligenciaArtificialIcon from "@/components/images/icons/header/InteligenciaArtificialIcon";
import ObrigacoesIcon from "@/components/images/icons/header/ObrigacoesIcon";
import PrestacaoContaIcon from "@/components/images/icons/header/PrestacaoContaIcon";
import MegaMenuMunicipios from "@/components/menu/MegaMenuMunicipios";
import { getCodigoMunicipio } from "@/shared/municipio";
import { Municipio, MunicipiosProps } from "@/types/Municipio";
import Link from "next/link";
import { useParams } from "next/navigation";
import DropdownMenu from "../../dropdowns/dropdown/DropdownMenu";

const ANO_DEFAULT = 2023;
const MES_DEFAULT = 1;

export default function DashboardHeaderItems({ municipios }: MunicipiosProps) {
  return (
    <ul className="dashboard-menu font-bold hidden xl:flex">
      <li className="px-3 active">
        <MegaMenuMunicipios municipios={municipios} />
      </li>
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
        <DropdownAreasTematicas municipios={municipios} />
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

function DropdownAreasTematicas({ municipios }: { municipios: Municipio[] }) {
  const params = useParams();

  return (
    <DropdownMenu icon={<AreaTematicaIcon />} title="Áreas temáticas">
      <ul className="font-normal">
        <DropdownItem>
          <Link href="/areas-tematicas/assistencia-social/referenciamento">
            Assistência social
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/areas-tematicas/concessao-publica/visao-geral">
            Concessões comuns e PPP
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/areas-tematicas/educacao/visao-geral">Educação</Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/areas-tematicas/estrutura-administrativa">
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
          >
            Pessoal
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/areas-tematicas/saude/estabelecimentos">Saúde</Link>
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
          <Link href={`/fiscalizacao/2020/saude/acoes-pandemia`}>
            Ações sobre a Pandemia
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/2022/saude/cancer-colo-de-utero`}>
            Câncer de colo de útero
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/2020/controle-interno/prefeituras`}>
            Controle interno dos municípios
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/2020/educacao/desigualdade-educacional/manifestacao-tecnica`}
          >
            Desigualdade educacional
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/2021/saude/doencas-cronicas-nao-transmissiveis`}
          >
            Doenças crônicas não transmissíveis
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/fiscalizacao/2019/educacao/oferta-x-demanda/escolas">
            Educação - Levantamento Oferta x Demanda
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/estado/${params.ano ?? ANO_DEFAULT}/iege`}>
            Índice de efetividade de gestão estadual (IEGE)
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/municipio/${params.ano ?? ANO_DEFAULT}/iegm`}>
            Índice de efetividade de gestão municipal (IEGM)
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/2021/saude/mamografia-de-rastreamento`}>
            Mamografias de rastreamento
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/2020/portal-transparencia/prefeituras`}>
            Portais de transparência dos municípios
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/receita-municipal`}>
            Receita pública municipal
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/2018/transparencia-passiva/prefeituras`}>
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
          <Link href="/obras">Obras públicas</Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/projecao">Projeções de gastos com pessoal</Link>
        </DropdownItem>
      </ul>
    </DropdownMenu>
  );
}

function DropdownPrestacoesContas() {
  const params = useParams();

  return (
    <DropdownMenu icon={<PrestacaoContaIcon />} title="Prestações de contas">
      <ul className="font-normal">
        <DropdownItem>
          <Link
            href={`/prestaca-conta/${
              params.ano ?? ANO_DEFAULT
            }/municipio/governo/07`}
          >
            Processos
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/monitoramento/${params.ano ?? ANO_DEFAULT}/municipio/todos`}
          >
            Monitoramentos
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/julgamento-de-contas/visao-geral">
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
    >
      <ObrigacoesIcon />
      Obrigações
    </Link>
  );
}
