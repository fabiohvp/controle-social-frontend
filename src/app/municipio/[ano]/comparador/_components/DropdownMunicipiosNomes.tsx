"use client";
import Dropdown from "@/components/dropdowns/dropdown/Dropdown";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useGlobalState } from "@/providers/GlobalProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  active?: boolean;
  index: number;
  municipios: string[];
};

function getQuerystring({
  index,
  municipios,
  municipioSelecionado,
}: Props & { municipioSelecionado: string }) {
  if (municipioSelecionado === "*") {
    municipios[index] = "";
  } else {
    municipios[index] = municipioSelecionado;
  }

  return { municipios: [...municipios] };
}

export default function DropdownMunicipiosNomes({
  active,
  index,
  municipios,
}: Props) {
  const globalState = useGlobalState();
  const pathname = usePathname();
  const items = [
    { nome: "Adicionar município", nomeNormalizado: "*" },
    ...globalState.municipios,
  ];

  return (
    <Dropdown
      active={active}
      buttonProps={{ className: "!bg-white border" }}
      items={items.map((municipio) => ({
        key: municipio.nome,
        value: createDropdownValue(municipio.nomeNormalizado),
        render: () => (
          <Link
            href={{
              pathname: pathname,
              query: getQuerystring({
                index,
                municipios,
                municipioSelecionado: municipio.nomeNormalizado,
              }),
            }}
          >
            {municipio.nome}
          </Link>
        ),
      }))}
      selected={createDropdownValue(municipios[index])}
    />
  );
}
// onClick={() => setSelected(municipio.codigo)}
