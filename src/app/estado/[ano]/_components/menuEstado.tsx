import { ItemMenu } from "@/shared/paginas";
import { FaUniversity } from "react-icons/fa";
import {
  FaCheck,
  FaDollarSign,
  FaEye,
  FaLayerGroup,
  FaPenToSquare,
  FaPerson,
  FaShieldHalved,
  FaSignal,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { PAGINAS_RAIZ_ESTADO as RAIZ } from "../(root)/routes";
import {
  PAGINAS_GESTAO_FISCAL,
  SLUG_GESTAO_FISCAL,
} from "../gestao-fiscal/routes";
import {
  PAGINAS_GESTAO_ORCAMENTARIA,
  SLUG_GESTAO_ORCAMENTARIA,
} from "../gestao-orcamentaria/routes";
import {
  PAGINAS_PREVIDENCIA_MILITARES,
  SLUG_PREVIDENCIA_MILITARES,
} from "../previdencia-militares/routes";
import { PAGINAS_PREVIDENCIA, SLUG_PREVIDENCIA } from "../previdencia/routes";

/**
 * Ordem da sidebar e do breadcrumb principal do Estado (igual ao site
 * oficial). NÃO edite para ligar páginas: os flags ficam no routes.ts de cada seção.
 */
export const MENU_ESTADO: ItemMenu[] = [
  { ...RAIZ.visaoGeral, icone: <FaEye /> },
  { ...RAIZ.obrigacoes, icone: <FaCheck className="text-xl" /> },
  {
    slug: SLUG_GESTAO_ORCAMENTARIA,
    titulo: "Gestão orçamentária",
    paginas: PAGINAS_GESTAO_ORCAMENTARIA,
    icone: <FaDollarSign className="text-xl" />,
  },
  {
    slug: SLUG_GESTAO_FISCAL,
    titulo: "Gestão fiscal",
    paginas: PAGINAS_GESTAO_FISCAL,
    icone: <FaTriangleExclamation />,
  },
  {
    slug: SLUG_PREVIDENCIA,
    titulo: "Previdência",
    paginas: PAGINAS_PREVIDENCIA,
    icone: <FaPerson className="text-xl" />,
  },
  {
    slug: SLUG_PREVIDENCIA_MILITARES,
    titulo: "Previdência militares",
    paginas: PAGINAS_PREVIDENCIA_MILITARES,
    icone: <FaShieldHalved />,
  },
  { ...RAIZ.prestacaoConta, icone: <FaUniversity className="text-xl" /> },
  { ...RAIZ.fiscalizacoes, icone: <FaPenToSquare /> },
  {
    slug: "area-tematica",
    titulo: "Áreas temáticas",
    href: "/area-tematica/assistencia-social/referenciamento",
    implementado: true,
    icone: <FaLayerGroup />,
  },
  { ...RAIZ.iege, icone: <FaSignal /> },
];
