"use client";
import { createDropdownValue } from "@/components/dropdowns/dropdown/Dropdown";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { getMunicipios } from "@/shared/municipio";
import { useParams, usePathname } from "next/navigation";

type Props = {
  active?: boolean;
};

export default function MenuMunicipios(props: Props) {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  return (
    <li>
      <DropdownLinks
        active={props.active}
        generateUrl={(item) =>
          `/municipio/${routeParams.ano}/${item.value}/${segments}`
        }
        items={getMunicipios().map((municipio) => ({
          key: municipio.nome,
          value: createDropdownValue(municipio.nomeNormalizado),
        }))}
        selected={createDropdownValue(routeParams.municipio)}
      />
    </li>
  );
}
