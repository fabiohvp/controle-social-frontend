"use client";
import DropdownItem from "@/components/dropdowns/dropdown/DropdownItem";
import AreaTematicaIcon from "@/components/images/icons/header/AreaTematicaIcon";
import BoletimIcon from "@/components/images/icons/header/BoletimIcon";
import EstadoIcon from "@/components/images/icons/header/EstadoIcon";
import FiscalizacaoIcon from "@/components/images/icons/header/FiscalizacaoIcon";
import ObrigacoesIcon from "@/components/images/icons/header/ObrigacoesIcon";
import PrestacaoContaIcon from "@/components/images/icons/header/PrestacaoContaIcon";
import MegaMenuMunicipios from "@/components/menu/MegaMenuMunicipios";
import SearchButton from "@/components/search/SearchButton";
import { useGlobalState } from "@/providers/GlobalProvider";
import { getCodigoMunicipio } from "@/shared/municipio";
import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import DropdownMenu from "../../dropdowns/dropdown/DropdownMenu";

const MES_DEFAULT = 1;

type AnoProps = {
  ano: string;
};

type AnoMesMunicipioProps = AnoProps & {
  mes: string;
  municipio: string;
};

export default function DashboardHeaderItems() {
  const route = usePathname();

  return (
    <ul className="dashboard-menu font-bold hidden xl:flex">
      <li className={clsx("px-3", { active: route.startsWith("/municipio") })}>
        <MegaMenuMunicipios />
      </li>
      <li className={clsx("px-3", { active: route.startsWith("/estado") })}>
        <LinkEstado />
      </li>
      <li
        className={clsx("px-3", {
          active: route.startsWith("/obrigacao-de-envio"),
        })}
      >
        <DropdownObrigacoes />
      </li>
      <li
        className={clsx("px-3", {
          active: route.startsWith("/prestacao-de-conta"),
        })}
      >
        <DropdownPrestacoesContas />
      </li>
      <li
        className={clsx("px-3", { active: route.startsWith("/fiscalizacao") })}
      >
        <DropdownFiscalizacoes />
      </li>
      <li
        className={clsx("px-3", {
          active:
            route.startsWith("/area-tematica") ||
            route.startsWith("/obras") ||
            route.startsWith("/projecao"),
        })}
      >
        <DropdownAreasTematicas />
      </li>
      <li className={clsx("px-3", { active: route.startsWith("/boletins") })}>
        <LinkBoletins />
      </li>
      <li className="px-3">
        <SearchButton className="h-full" />
      </li>
    </ul>
  );
}

function DropdownAreasTematicas({}: {}) {
  const globalState = useGlobalState();
  const municipios = globalState.municipios;
  const params = useParams<AnoMesMunicipioProps>();
  const isFolhaDePagamento = usePathname().startsWith("/folha-de-pagamento");

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
            href="/area-tematica/atos-de-pessoal/admissao"
            prefetch={false}
          >
            Atos de pessoal
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/area-tematica/contratacoes-publicas/contratacoes"
            prefetch={false}
          >
            Contratações públicas
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/area-tematica/concessao-publica/visao-geral"
            prefetch={false}
          >
            Desestatizações
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/area-tematica/educacao/visao-geral" prefetch={false}>
            Educação
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/area-tematica/emendas-parlamentares/emendas"
            prefetch={false}
          >
            Emendas parlamentares
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/area-tematica/estrutura-administrativa" prefetch={false}>
            Estrutura administrativa
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/obras" prefetch={false}>
            Geo-obras (legado)
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/area-tematica/patrimonio/visao-geral"
            prefetch={false}
          >
            Informações patrimoniais
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/area-tematica/previdencia/visao-geral"
            prefetch={false}
          >
            Investimentos dos institutos de previdência
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/folha-de-pagamento/executivo-municipal/${
              (isFolhaDePagamento && params.ano) ||
              globalState.anos.folhaDePagamento.anoAtual
            }/${(isFolhaDePagamento && params.mes) || MES_DEFAULT}/visao-geral/${
              getCodigoMunicipio(municipios, params.municipio ?? "") ?? ""
            }`}
            prefetch={false}
          >
            Pessoal
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/projecao" prefetch={false}>
            Projeções de gastos com pessoal
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href="/area-tematica/saneamento-basico/agua-esgoto"
            prefetch={false}
          >
            Saneamento básico
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
            href="/fiscalizacao/2022/crimes-contra-patrimonio"
            prefetch={false}
          >
            Crimes contra o patrimônio
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
          <Link href="/fiscalizacao/2019/iege" prefetch={false}>
            Índice de efetividade de gestão estadual (IEGE)
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/fiscalizacao/2023/iegm/geral" prefetch={false}>
            Índice de efetividade de gestão municipal (IEGM)
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/fiscalizacao/2025/levantamento-ods" prefetch={false}>
            Levantamento ODS
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
        <DropdownItem>
          <Link
            href="/fiscalizacao/2024/violencia-contra-mulheres"
            prefetch={false}
          >
            Violência contra mulheres e meninas
          </Link>
        </DropdownItem>
      </ul>
    </DropdownMenu>
  );
}

function DropdownPrestacoesContas() {
  const globalState = useGlobalState();
  const params = useParams<AnoProps>();
  const ano = params.ano ?? globalState.anos.prestacaoDeConta.anoAtual;

  return (
    <DropdownMenu
      icon={<PrestacaoContaIcon small />}
      title="Prestações de contas"
    >
      <ul className="font-normal">
        <DropdownItem>
          <Link
            href={`/prestacao-de-conta/${ano}/municipios/governo/07`}
            prefetch={false}
          >
            Processos
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/prestacao-de-conta/${ano}/municipios/monitoramento/todos`}
            prefetch={false}
          >
            Monitoramentos
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/prestacao-de-conta/${ano}/parecer-previo`}
            prefetch={false}
          >
            Parecer prévio
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/prestacao-de-conta/${ano}/julgamento-de-conta/visao-geral`}
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
  const globalState = useGlobalState();
  const params = useParams<AnoProps>();

  return (
    <Link
      href={`/boletins/${params.ano ?? globalState.anos.boletins.anoAtual}/`}
      className="center gap-1"
      prefetch={false}
    >
      <BoletimIcon />
      Boletins
    </Link>
  );
}

function LinkEstado() {
  const globalState = useGlobalState();
  const params = useParams<AnoProps>();

  return (
    <Link
      href={`/estado/${
        params.ano ?? globalState.anos.estado.anoAtual
      }/visao-geral`}
      className="center gap-1"
      prefetch={false}
    >
      <EstadoIcon />
      Estado
    </Link>
  );
}

function DropdownObrigacoes() {
  const globalState = useGlobalState();
  const params = useParams<AnoProps>();
  const anoObrigacao = params.ano ?? globalState.anos.obrigacaoEnvio.anoAtual;
  const anoPrestacao =
    params.ano ?? globalState.anos.prestacaoDeConta.anoAtual;

  return (
    <DropdownMenu icon={<ObrigacoesIcon />} title="Obrigações">
      <ul className="font-normal">
        <DropdownItem>
          <Link
            href={`/obrigacao-de-envio/${anoObrigacao}/municipios`}
            prefetch={false}
          >
            Remessas
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link
            href={`/prestacao-de-conta/${anoPrestacao}/municipios/monitoramento/todos`}
            prefetch={false}
          >
            Monitoramento de deliberações
          </Link>
        </DropdownItem>
      </ul>
    </DropdownMenu>
  );
}
