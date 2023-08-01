"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";

import { MunicipiosProps } from "@/types/Municipio";
import { useParams, usePathname } from "next/navigation";

type Props = {
  active?: boolean;
} & MunicipiosProps;

export default function BreadcrumbMunicipiosNomes({
  active,
  municipios,
}: Props) {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  return (
    <li>
      <DropdownLinks
        active={active}
        generateUrl={([_, value]) =>
          `/municipio/${routeParams.ano}/${value.value}/${segments}`
        }
        items={
          new Map(
            municipios.map((municipio) => [
              municipio.nome,
              createDropdownValue(municipio.nomeNormalizado),
            ])
          )
        }
        selected={createDropdownValue(routeParams.municipio)}
      />
    </li>
  );
}
