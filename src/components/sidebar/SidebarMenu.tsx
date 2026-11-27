"use client";
import {
  ItemMenu,
  getPaginasImplementadas,
  isItemMenuVisivel,
  isSecao,
} from "@/shared/paginas";
import SidebarItem from "./SidebarItem";

type Props = {
  itens: ItemMenu[];
  /** ex.: /municipio/2024/vitoria */
  urlBase: string;
};

/** Renderiza a sidebar a partir dos registros de páginas, ocultando o que não está implementado */
export default function SidebarMenu({ itens, urlBase }: Props) {
  return (
    <>
      {itens.filter(isItemMenuVisivel).map((item) =>
        isSecao(item) ? (
          <SidebarItem
            key={item.slug}
            icon={item.icone}
            text={item.titulo}
            tooltip={item.tituloCompleto ?? item.titulo}
          >
            {getPaginasImplementadas(item.paginas).map((pagina) => (
              <SidebarItem
                key={pagina.slug}
                href={pagina.href ?? `${urlBase}/${item.slug}/${pagina.slug}`}
                text={pagina.titulo}
                tooltip={pagina.tituloCompleto ?? pagina.titulo}
              />
            ))}
          </SidebarItem>
        ) : (
          <SidebarItem
            key={item.slug}
            href={item.href ?? `${urlBase}/${item.slug}`}
            icon={item.icone}
            text={item.titulo}
            tooltip={item.tituloCompleto ?? item.titulo}
          />
        )
      )}
    </>
  );
}
