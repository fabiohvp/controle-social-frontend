"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { MunicipiosProps } from "@/types/Municipio";
import { useParams, usePathname } from "next/navigation";
import { MunicipioPageProps, generateMunicipioUrl } from "../routes";

type Props = {
  active?: boolean;
} & MunicipiosProps;

export default function BreadcrumbMunicipiosNomes({
  active,
  municipios,
}: Props) {
  const pathname = usePathname();
  const routeParams = useParams() as MunicipioPageProps;

  return (
    <li>
      <DropdownLinks
        active={active}
        generateUrl={(item) =>
          generateMunicipioUrl({
            ...routeParams,
            municipio: item[1].value,
            pathname,
          })
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
