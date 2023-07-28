"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { MunicipiosProps } from "@/types/Municipio";
import { useParams, usePathname } from "next/navigation";

type Props = {
  active?: boolean;
} & MunicipiosProps;

export default function MunicipiosMenu({ active, municipios }: Props) {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  return (
    <li>
      <DropdownLinks
        active={active}
        generateUrl={(item) =>
          `/municipio/${routeParams.ano}/${item.value.value}/${segments}`
        }
        items={municipios.map((municipio) => ({
          key: municipio.nome,
          value: createDropdownValue(municipio.nomeNormalizado),
        }))}
        selected={createDropdownValue(routeParams.municipio)}
      />
    </li>
  );
}
