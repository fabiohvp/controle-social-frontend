"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useGlobalState } from "@/providers/GlobalProvider";
import { useParams, usePathname } from "next/navigation";
import { MunicipioPageProps, generateMunicipioUrl } from "../routes";

type Props = {
  active?: boolean;
};

export default function BreadcrumbMunicipiosNomes({ active }: Props) {
  const globalState = useGlobalState();
  const pathname = usePathname();
  const routeParams = useParams() as MunicipioPageProps;
  const municipios = globalState.municipios;

  return (
    <li>
      <DropdownLinks
        active={active}
        generateUrl={(item) =>
          generateMunicipioUrl({
            ...routeParams,
            globalState,
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
