"use client";
import DropdownLinks from "@/components/dropdowns/links/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Boletim de macrogestão",
    value: "mensal",
  },
  {
    key: "Boletim extraordinário",
    value: "extraordinario",
  },
  {
    key: "Informativos",
    value: "informativo",
  },
];

export default function DropdownLinksBoletins() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <DropdownLinks
      generateUrl={(item) => `/boletins/${routeParams.ano}/${item.value}`}
      items={PAGES}
      selectedValue={segments}
    />
  );
}
