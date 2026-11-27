"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import {
  ItemMenu,
  getCaminhoItemMenu,
  isItemMenuVisivel,
} from "@/shared/paginas";
import { usePathname } from "next/navigation";

type Props = {
  itens: ItemMenu[];
  /** ex.: /municipio/2024/vitoria */
  urlBase: string;
  /** posição da seção/página no pathname (split("/")) */
  indiceSegmento: number;
};

type Valor = { href?: string };

function isSelecionado(value?: string, selectedValue?: string) {
  if (!value || !selectedValue) return false;
  return value === selectedValue || value.startsWith(`${selectedValue}/`);
}

/** Dropdown principal (Visão geral | Obrigações | Gestão fiscal | ...) gerado do mesmo menu da sidebar */
export default function BreadcrumbMenu({
  itens,
  urlBase,
  indiceSegmento,
}: Props) {
  const pathname = usePathname();
  const items: Map<string, DropdownValue<Valor>> = new Map(
    itens.filter(isItemMenuVisivel).map((item) => [
      item.tituloCompleto ?? item.titulo,
      {
        ...createDropdownValue<Valor>(getCaminhoItemMenu(item)),
        href: "href" in item ? item.href : undefined,
      },
    ])
  );

  return (
    <li>
      <DropdownLinks
        bodyProps={{ className: "!min-w-[220px]" }}
        comparer={isSelecionado}
        generateUrl={(item) => item[1].href ?? `${urlBase}/${item[1].value}`}
        items={items}
        selected={createDropdownValue(pathname.split("/")[indiceSegmento])}
      />
    </li>
  );
}
