"use client";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";

const PAGES: KeyValue<string, DropdownValue<string>>[] = [
  {
    key: "Boletim de macrogestão",
    value: createDropdownValue("*"),
  },
  {
    key: "Boletim extraordinário",
    value: createDropdownValue("extraordinario"),
  },
  {
    key: "Informativos",
    value: createDropdownValue("informativo"),
  },
];

export default function MenuBoletinsPages() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.ano}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/boletins/${routeParams.ano}/${item.value.value}`
        }
        items={PAGES}
        selected={createDropdownValue(segments)}
      />
    </li>
  );
}
