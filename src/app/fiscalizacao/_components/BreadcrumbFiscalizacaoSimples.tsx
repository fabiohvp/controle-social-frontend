"use client";
import BreadcrumbAno from "@/components/breadcrumb/BreadcrumbAno";
import DropdownItemLabel from "@/components/dropdowns/dropdown/DropdownItemLabel";
import { ReactNode } from "react";
import BreadcrumbFiscalizacaoLabel from "./BreadcrumbFiscalizacaoLabel";

type Props = {
  anos: number[];
  /** Segmento da rota após `/fiscalizacao/[ano]/`. */
  rota: string;
  titulo: string;
  /** Itens extras do breadcrumb (ex.: seletor de índice), exibidos antes do ano. */
  children?: ReactNode;
};

/** Breadcrumb para fiscalizações de página única: Fiscalizações > Título > Ano. */
export default function BreadcrumbFiscalizacaoSimples({
  anos,
  children,
  rota,
  titulo,
}: Props) {
  return (
    <>
      <BreadcrumbFiscalizacaoLabel />
      <DropdownItemLabel className="opacity-60">
        <span className="ml-1 ellipsis">{titulo}</span>
      </DropdownItemLabel>
      {children}
      {anos.length > 1 && (
        <BreadcrumbAno
          anos={anos}
          generateUrl={({ ano, pathname }) => {
            const resto = pathname.split("/").slice(4).join("/");
            return `/fiscalizacao/${ano}/${rota}${resto ? `/${resto}` : ""}`;
          }}
        />
      )}
    </>
  );
}
