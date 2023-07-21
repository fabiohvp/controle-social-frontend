"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, string>[] = [
  {
    key: "Boletim de macrogestão",
    value: "*",
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

export default function MenuBoletinsPages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) => `/boletins/${routeParams.ano}/${item.value}`}
        items={PAGES}
        selectedValue={segments}
      />
    </li>
  );
}
