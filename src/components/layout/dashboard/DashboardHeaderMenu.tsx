"use client";
import DropdownItem from "@/components/dropdowns/dropdown/DropdownItem";
import AreaTematicaIcon from "@/components/images/icones/header/AreaTematicaIcon";
import BoletimIcon from "@/components/images/icones/header/BoletimIcon";
import EstadoIcon from "@/components/images/icones/header/EstadoIcon";
import FiscalizacaoIcon from "@/components/images/icones/header/FiscalizacaoIcon";
import InteligenciaArtificialIcon from "@/components/images/icones/header/InteligenciaArtificialIcon";
import MapaESIcon from "@/components/images/icones/header/MapaESIcon";
import ObrigacoesIcon from "@/components/images/icones/header/ObrigacoesIcon";
import PrestacaoContaIcon from "@/components/images/icones/header/PrestacaoContaIcon";
import Link from "next/link";
import { useParams } from "next/navigation";
import DropdownMenu from "../modal/DropdownMenu";

export default function DashboardHeaderItems() {
  return (
    <ul className="dashboard-menu font-bold hidden xl:flex">
      <li className="px-3 active">
        <LinkMunicipios />
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

function DropdownAreasTematicas() {
  const params = useParams();

  return (
    <DropdownMenu
      icon={<AreaTematicaIcon />}
      modalClassName="mt-4"
      title="Áreas temáticas"
    >
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
          <Link
            href={`/folha-de-pagamento/${params.ano}/municipio/${params.municipio}/todos/visao-geral`}
          >
            Pessoal
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/areas-tematicas/saude/visao-geral">Saúde</Link>
        </DropdownItem>
      </ul>
    </DropdownMenu>
  );
}

function DropdownFiscalizacoes() {
  const params = useParams();

  return (
    <DropdownMenu
      icon={<FiscalizacaoIcon />}
      modalClassName="mt-4"
      title="Fiscalizações"
    >
      <ul className="font-normal">
        <DropdownItem>
          <Link href={`/fiscalizacao/saude/acoes-pandemia/${params.ano}`}>
            Ações sobre a Pandemia
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/cancer-colo-de-utero/${params.ano}`}>
            Câncer de colo de útero
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/controle-interno/${params.ano}/executivo`}>
            Controle interno dos municípios
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/desigualdade-educacional/${params.ano}/manifestacao-tecnica`}
          >
            Desigualdade educacional
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/saude/doencas-cronicas/${params.ano}`}>
            Doenças crônicas não transmissíveis
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/fiscalizacao/educacao/escolas">
            Educação - Levantamento Oferta x Demanda
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/estado/${params.ano}/iege`}>
            Índice de efetividade de gestão estadual (IEGE)
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/municipio/${params.ano}/iegm`}>
            Índice de efetividade de gestão municipal (IEGM)
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/mamografia-rastreamento/${params.ano}`}>
            Mamografias de rastreamento
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/portal-transparencia/${params.ano}/executivo`}
          >
            Portais de transparência dos municípios
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/fiscalizacao/receitas-municipais`}>
            Receita pública municipal
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/fiscalizacao/transparencia-passiva/${params.ano}/executivo`}
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
      modalClassName="mt-4"
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
    <DropdownMenu
      icon={<PrestacaoContaIcon />}
      modalClassName="mt-4"
      title="Prestações de contas"
    >
      <ul className="font-normal">
        <DropdownItem>
          <Link href={`/prestaca-conta/${params.ano}/municipio/governo/07`}>
            Processos
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href={`/monitoramento/${params.ano}/municipio/todos`}>
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
    <div className="center gap-1">
      <BoletimIcon />
      <Link href={`/estado/${params.ano}/visao-geral`}>Boletins</Link>
    </div>
  );
}

function LinkEstado() {
  const params = useParams();

  return (
    <div className="center gap-1">
      <EstadoIcon />
      <Link href={`/estado/${params.ano}/visao-geral`}>Estado</Link>
    </div>
  );
}

function LinkMunicipios() {
  const params = useParams();

  return (
    <div className="center gap-1">
      <MapaESIcon />
      <Link href={`/estado/${params.ano}/visao-geral`}>Municípios</Link>
    </div>
  );
}

function LinkObrigacoes() {
  const params = useParams();

  return (
    <div className="center gap-1">
      <ObrigacoesIcon />
      <Link href={`/obrigacao-envio/${params.ano}/municipio`}>Obrigações</Link>
    </div>
  );
}
