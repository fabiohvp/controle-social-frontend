"use client";
import { generateMunicipioUrl } from "@/app/municipio/[ano]/[municipio]/municipio-state";
import { getMunicipios } from "@/shared/municipio";
import { KeyValue } from "@/types/KeyValue";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  DropdownValue,
  createDropdownValue,
} from "../dropdowns/dropdown/Dropdown";
import DropdownBody from "../dropdowns/dropdown/DropdownBody";
import { dropdownLinkRenderer } from "../dropdowns/dropdown/DropdownLinks";
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
import MapaESIcon from "../images/icons/header/MapaESIcon";
import ObrigacoesIcon from "../images/icons/header/ObrigacoesIcon";
import PrestacaoContaIcon from "../images/icons/header/PrestacaoContaIcon";
import "./menu-mobile.css";

type Props = HTMLAttributes<HTMLDivElement>;

function generateUrl(routeParams: Params) {
  return function <T>(item: KeyValue<string, DropdownValue<T>>, _: number) {
    return generateMunicipioUrl({
      ...routeParams,
      municipio: item.value.value,
    });
  };
}

export default function MenuMobile({ className, ...props }: Props) {
  const [municipiosOpen, setMunicipiosOpen] = useState(false);
  const [prestacoesDeContasOpen, setPestacoesDeContasOpen] = useState(false);
  const routeParams = useParams();

  function openDropdownMunicipios() {
    setMunicipiosOpen(true);
  }

  function openDropdownPrestacoesDeContas() {
    setPestacoesDeContasOpen(true);
  }

  return (
    <div
      className={twMerge(
        "bg-gray-200 center h-screen menu-mobile overflow-y-auto p-2 relative",
        className
      )}
      {...props}
    >
      {municipiosOpen && (
        <DropdownBody
          className="!top-auto"
          items={getMunicipios().map((municipio) => ({
            key: municipio.nome,
            value: createDropdownValue(municipio.nomeNormalizado),
            render: dropdownLinkRenderer(generateUrl(routeParams)),
          }))}
        />
      )}
      {prestacoesDeContasOpen && (
        <DropdownBody
          className="!top-auto"
          items={getMunicipios().map((municipio) => ({
            key: municipio.nome,
            value: createDropdownValue(municipio.nomeNormalizado),
            render: dropdownLinkRenderer(generateUrl(routeParams)),
          }))}
        />
      )}
      <ul className="flex flex-col gap-1 self-start w-full md:w-1/2 lg:w-3/5">
        <li>
          <Link href="/municipio/2023/serra/visao-geral">
            <section>
              <h5>SERRA</h5>
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
              <MapaESIcon />
            </div>
          </button>
        </li>
        <li>
          <Link href="/estado/2023/visao-geral">
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
          <Link href="/boletins/2023/">
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
          <Link href="/obrigacao-envio/2023/municipios">
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
          <button onClick={openDropdownPrestacoesDeContas}>
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
          <Link href="/areas-tematicas/assistencia-social/referenciamento">
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
          <Link href="/areas-tematicas/concessao-publica/visao-geral">
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
          <Link href="/areas-tematicas/educacao/visao-geral">
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
          <Link href="/areas-tematicas/estrutura-administrativa">
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
          <Link href="/folha-de-pagamento/municipal/2023/1/visao-geral">
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
          <Link href="/areas-tematicas/saude/estabelecimentos">
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
          <Link href="/municipio/2023/comparador">
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
          <Link href="/indicadores-consolidados/2023/receita/orcamentaria">
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
          <Link href="/rankings/2023/receita/arrecadada">
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
          <Link href="/projecao">
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
          <Link href="/obras">
            <section>
              <h5>OBRAS PÚBLICAS</h5>
              <div>...em andamento e paralisadas</div>
            </section>
            <div className="icon">
              <ObrasIcon />
            </div>
          </Link>
        </li>
        <li className="text-link text-center text-sm">
          <Link href="/wiki/sobre" className="!inline">
            Sobre
          </Link>{" "}
          |{" "}
          <Link href="/wiki/novidades" className="!inline">
            Novidades
          </Link>{" "}
          |{" "}
          <Link href="/dados-abertos" className="!inline">
            Dados abertos
          </Link>
        </li>
      </ul>
    </div>
  );
}
