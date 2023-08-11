"use client";
import {
  MunicipioPageProps,
  generateMunicipioUrl,
} from "@/app/municipio/[ano]/[municipio]/routes";
import useGeolocation from "@/hooks/useGeolocation";
import { useGlobalState } from "@/providers/GlobalProvider";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { use, useState } from "react";
import DropdownBody from "../dropdowns/dropdown/DropdownBody";
import { DropdownItem } from "../dropdowns/dropdown/DropdownItem";
import DropdownLinksRenderer from "../dropdowns/dropdown/DropdownLinksRenderer";
import { createDropdownValue } from "../dropdowns/dropdown/DropdownValue";
import ComparadorIcon from "../images/icons/ComparadorIcon";
import ConcessoesIcon from "../images/icons/ConcessoesIcon";
import CrasIcon from "../images/icons/CrasIcon";
import EducacaoIcon from "../images/icons/EducacaoIcon";
import EstruturaAdministrativaIcon from "../images/icons/EstruturaAdministrativaIcon";
import IndicadoresIcon from "../images/icons/IndicadoresIcon";
import MunicipioGeolicalizadoIcon from "../images/icons/MunicipioGeolicalizadoIcon";
import ObrasIcon from "../images/icons/ObrasIcon";
import PessoalIcon from "../images/icons/PessoalIcon";
import ProjecaoIcon from "../images/icons/ProjecaoIcon";
import RankingIcon from "../images/icons/RankingIcon";
import SaudeIcon from "../images/icons/SaudeIcon";
import BoletimIcon from "../images/icons/header/BoletimIcon";
import EstadoIcon from "../images/icons/header/EstadoIcon";
import FiscalizacaoIcon from "../images/icons/header/FiscalizacaoIcon";
import MapaEsIcon from "../images/icons/header/MapaEsIcon";
import ObrigacoesIcon from "../images/icons/header/ObrigacoesIcon";
import PrestacaoContaIcon from "../images/icons/header/PrestacaoContaIcon";

export default function MenuMobileModals() {
  const [fiscalizacoesOpen, setFiscalizacoesOpen] = useState(false);
  const [municipiosOpen, setMunicipiosOpen] = useState(false);
  const [prestacoesDeContasOpen, setPrestacoesDeContasOpen] = useState(false);
  const { municipio } = useGeolocation();

  const globalState = use(useGlobalState());
  const municipios = globalState.municipios;
  const pathname = usePathname();
  const routeParams = useParams() as MunicipioPageProps;

  function openDropdownFiscalizacoes() {
    setFiscalizacoesOpen(true);
  }

  function openDropdownMunicipios() {
    setMunicipiosOpen(true);
  }

  function openDropdownPrestacoesDeContas() {
    setPrestacoesDeContasOpen(true);
  }

  return (
    <>
      {fiscalizacoesOpen && (
        //todo: acertar para exibir menu de fiscalizacoes
        <DropdownBody
          className="!top-auto"
          items={municipios.map((municipio) => ({
            key: municipio.nome,
            value: createDropdownValue(municipio.nomeNormalizado),
            render: DropdownLinksRenderer(generateUrl(pathname, routeParams)),
          }))}
        />
      )}
      {municipiosOpen && (
        <DropdownBody
          className="!top-auto"
          items={municipios.map((municipio) => ({
            key: municipio.nome,
            value: createDropdownValue(municipio.nomeNormalizado),
            render: DropdownLinksRenderer(generateUrl(pathname, routeParams)),
          }))}
        />
      )}
      {prestacoesDeContasOpen && (
        <DropdownBody
          className="!top-auto"
          items={municipios.map((municipio) => ({
            key: municipio.nome,
            value: createDropdownValue(municipio.nomeNormalizado),
            render: DropdownLinksRenderer(generateUrl(pathname, routeParams)),
          }))}
        />
      )}
      <ul className="flex flex-col gap-1 self-start w-full md:w-1/2 lg:w-3/5">
        <li>
          <Link
            href={`/municipio/2023/${municipio.nomeNormalizado}/visao-geral`}
            prefetch={false}
          >
            <section>
              <h5 className="uppercase">{municipio.nome}</h5>
              <div>Dados da cidade geolocalizada</div>
            </section>
            <div className="icon">
              <MunicipioGeolicalizadoIcon small />
            </div>
          </Link>
        </li>
        <li>
          <button onClick={openDropdownMunicipios}>
            <section>
              <h5>MUNICÍPIOS</h5>
              <div>Navegue pelas cidades do ES</div>
            </section>
            <div className="icon">
              <MapaEsIcon />
            </div>
          </button>
        </li>
        <li>
          <Link href="/estado/2023/visao-geral" prefetch={false}>
            <section>
              <h5>ESTADO - PAINEL DE CONTROLE</h5>
              <div>Macrogestão governamental do ES</div>
            </section>
            <div className="icon">
              <EstadoIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/boletins/2023/" prefetch={false}>
            <section>
              <h5>BOLETINS E INFORMATIVOS</h5>
              <div>Avaliação sobre a gestão dos recursos públicos</div>
            </section>
            <div className="icon">
              <BoletimIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/obrigacao-de-envio/2023/municipios" prefetch={false}>
            <section>
              <h5>OBRIGAÇÕES</h5>
              <div>...dos jurisdicionados junto ao TCE-ES</div>
            </section>
            <div className="icon">
              <ObrigacoesIcon />
            </div>
          </Link>
        </li>
        <li>
          <button onClick={openDropdownPrestacoesDeContas}>
            <section>
              <h5>PRESTAÇÕES DE CONTAS</h5>
              <div>...dos jurisdicionados do TCE-ES</div>
            </section>
            <div className="icon">
              <PrestacaoContaIcon />
            </div>
          </button>
        </li>
        <li>
          <button onClick={openDropdownFiscalizacoes}>
            <section>
              <h5>FISCALIZAÇÕES</h5>
              <div>...em destaque do TCE-ES</div>
            </section>
            <div className="icon">
              <FiscalizacaoIcon />
            </div>
          </button>
        </li>
        <li>
          <Link
            href="/area-tematica/assistencia-social/referenciamento"
            prefetch={false}
          >
            <section>
              <h5>ASSISTÊNCIA SOCIAL</h5>
              <div>Estrutura dos centros de referência</div>
            </section>
            <div className="icon">
              <CrasIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/area-tematica/concessao-publica/visao-geral"
            prefetch={false}
          >
            <section>
              <h5>CONCESSÕES COMUNS E PPP</h5>
              <div>...existentes no Estado e nos municípios</div>
            </section>
            <div className="icon">
              <ConcessoesIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/area-tematica/educacao/visao-geral" prefetch={false}>
            <section>
              <h5>EDUCAÇÃO</h5>
              <div>Dados sobre escolas, alunos e profissionais</div>
            </section>
            <div className="icon">
              <EducacaoIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/area-tematica/estrutura-administrativa" prefetch={false}>
            <section>
              <h5>ESTRUTURA ADMINISTRATIVA</h5>
              <div>...no estado e nos municípios</div>
            </section>
            <div className="icon">
              <EstruturaAdministrativaIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/folha-de-pagamento/municipal/2023/1/visao-geral"
            prefetch={false}
          >
            <section>
              <h5>PESSOAL</h5>
              <div>Dados sobre pessoal na administração pública</div>
            </section>
            <div className="icon">
              <PessoalIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/area-tematica/saude/estabelecimentos" prefetch={false}>
            <section>
              <h5>SAÚDE</h5>
              <div>Dados sobre leitos e estabelecimentos de saúde</div>
            </section>
            <div className="icon">
              <SaudeIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/municipio/2023/comparador" prefetch={false}>
            <section>
              <h5>COMPARAÇÃO DE MUNICÍPIOS</h5>
              <div>Compare dados entre municípios</div>
            </section>
            <div className="icon">
              <ComparadorIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/indicadores-consolidados/2023/receita/orcamentaria"
            prefetch={false}
          >
            <section>
              <h5>INDICADORES CONSOLIDADOS</h5>
              <div>Situação geral por área temática</div>
            </section>
            <div className="icon">
              <IndicadoresIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/rankings/2023/receita/arrecadada" prefetch={false}>
            <section>
              <h5>RANKINGS</h5>
              <div>Classificação por indicador</div>
            </section>
            <div className="icon">
              <RankingIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/projecao" prefetch={false}>
            <section>
              <h5>PROJEÇÕES</h5>
              <div>Previsões sobre gastos com pessoal</div>
            </section>
            <div className="icon">
              <ProjecaoIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/obras" prefetch={false}>
            <section>
              <h5>OBRAS PÚBLICAS</h5>
              <div>...em andamento e paralisadas</div>
            </section>
            <div className="icon">
              <ObrasIcon />
            </div>
          </Link>
        </li>
        <li className="py-2 text-link text-center text-sm">
          <Link href="/wiki/sobre" className="!inline" prefetch={false}>
            Sobre
          </Link>{" "}
          |{" "}
          <Link href="/wiki/novidades" className="!inline" prefetch={false}>
            Novidades
          </Link>{" "}
          |{" "}
          <Link href="/wiki/dados-abertos" className="!inline" prefetch={false}>
            Dados abertos
          </Link>
        </li>
      </ul>
    </>
  );
}

function generateUrl(pathname: string, routeParams: MunicipioPageProps) {
  return function <T>(item: DropdownItem<T>, _: number) {
    return generateMunicipioUrl({
      ...routeParams,
      municipio: item[1].value,
      pathname,
    });
  };
}
