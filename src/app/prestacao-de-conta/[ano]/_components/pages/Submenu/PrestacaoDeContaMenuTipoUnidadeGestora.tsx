"use client";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { KeyValue } from "@/types/KeyValue";
import { useParams, usePathname } from "next/navigation";
import { generatePrestacaoDeContaUrl } from "../../../prestacaoDeContaState";

const PRESTACAO_DE_CONTA_PODER: KeyValue<string, DropdownValue<string>>[] = [
  { key: "Gestão", value: createDropdownValue("gestao") },
  {
    key: "Governo",
    value: createDropdownValue("governo"),
  },
];

export default function PrestacaoDeContaMenuTipoUnidadesGestoras() {
  const routeParams = useParams();
  const segment = usePathname().split("/")[4];

  return (
    <>
      <li>
        <DropdownLinks
          generateUrl={(item) =>
            generatePrestacaoDeContaUrl({
              ...routeParams,
              segment: item.value.value,
            })
          }
          items={PRESTACAO_DE_CONTA_PODER}
          selected={createDropdownValue(segment)}
        />
      </li>
      {/* <PrestacaoDeContaMenuUnidadesGestoras
        segment={segment}
        unidadesGestoras={selectedUnidadeGestora.unidadesGestoras}
      /> */}
    </>
  );
}
