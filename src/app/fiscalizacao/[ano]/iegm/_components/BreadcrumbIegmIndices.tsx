"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import {
  DropdownValue,
  createDropdownValue,
} from "@/components/dropdowns/dropdown/DropdownValue";
import { useParams } from "next/navigation";
import { INDICES_IEGM } from "../iegm";

const ITENS: Map<string, DropdownValue<string>> = new Map(
  INDICES_IEGM.map((i) => [i.rotulo, createDropdownValue(i.slug)])
);

export default function BreadcrumbIegmIndices() {
  const { ano, indice } = useParams<{ ano: string; indice: string }>();

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) => `/fiscalizacao/${ano}/iegm/${item[1].value}`}
        items={ITENS}
        selected={createDropdownValue(indice)}
      />
    </li>
  );
}
