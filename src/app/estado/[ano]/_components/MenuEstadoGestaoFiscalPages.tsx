"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Metas de arrecadação",
    value: "gestao-fiscal/meta-arrecadacao",
  },
  {
    key: "RCL",
    value: "gestao-fiscal/receita-corrente-liquida",
  },
];

export default function MenuEstadoGestaoFiscalPages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) => `/estado/${routeParams.ano}/${item.value}`}
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
