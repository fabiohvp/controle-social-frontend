"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";

import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { prestacaoDeContaState } from "../../../../prestacaoDeContaState";
import { generatePrestacaoDeContaUrl } from "../../../../routes";
import { PrestacaoDeContaGovernoPageProps } from "../../../../types";

export default function PrestacaoDeContaMenuAnos() {
  const [state] = useAtom(prestacaoDeContaState);
  const routeParams = useParams() as PrestacaoDeContaGovernoPageProps;

  return (
    <li>
      <DropdownLinks
        className="min-w-[70px]"
        generateUrl={([_, value]) =>
          generatePrestacaoDeContaUrl({ ...routeParams, ano: value.value })
        }
        items={
          new Map(
            state.anos.map((ano) => [
              ano.toString(),
              createDropdownValue(ano.toString()),
            ])
          )
        }
        selected={createDropdownValue(routeParams.ano)}
      />
    </li>
  );
}
