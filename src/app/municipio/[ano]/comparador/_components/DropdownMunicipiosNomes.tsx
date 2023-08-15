"use client";
import Dropdown from "@/components/dropdowns/dropdown/Dropdown";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useGlobalState } from "@/providers/GlobalProvider";
import { useState } from "react";

type Props = {
  active?: boolean;
};

export default function DropdownMunicipiosNomes({ active }: Props) {
  const globalState = useGlobalState();
  const [selected, setSelected] = useState("*");
  const municipios = [
    { nome: "Adicionar município", codigo: "*" },
    ...globalState.municipios,
  ];

  return (
    <Dropdown
      active={active}
      buttonProps={{ className: "!bg-white border" }}
      items={municipios.map((municipio) => ({
        key: municipio.nome,
        value: createDropdownValue(municipio.codigo),
        render: () => (
          <button onClick={() => setSelected(municipio.codigo)}>
            {municipio.nome}
          </button>
        ),
      }))}
      selected={createDropdownValue(selected)}
    />
  );
}
