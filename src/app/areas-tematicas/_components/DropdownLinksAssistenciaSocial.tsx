"use client";
import DropdownLinks from "@/components/dropdowns/links/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Capacidade de referenciamento",
    value: "referenciamento",
  },
  {
    key: "Espaço físico e equipamentos",
    value: "espaco-fisico",
  },
  {
    key: "Serviços e atendimento",
    value: "servicos",
  },
  {
    key: "Recursos humano",
    value: "recursos-humano",
  },
];

export default function DropdownLinksAssistenciaSocial() {
  const segments = usePathname().split(
    `/areas-tematicas/assistencia-social/`
  )[1];

  return (
    <DropdownLinks
      generateUrl={(item) =>
        `/areas-tematicas/assistencia-social/${item.value}`
      }
      items={PAGES}
      selectedValue={segments}
    />
  );
}
