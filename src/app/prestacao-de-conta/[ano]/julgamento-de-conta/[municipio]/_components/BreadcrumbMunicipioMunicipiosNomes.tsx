"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { createDropdownValue } from "@/components/dropdowns/dropdown/DropdownValue";
import { useGlobalState } from "@/providers/GlobalProvider";
import { useParams, usePathname } from "next/navigation";
import {
  JulgamentoDeContaPageProps,
  generateJulgamentoDeContaUrl,
  getPagina,
} from "../../routes";

type Props = {
  active?: boolean;
};

export default function BreadcrumbMunicipioMunicipiosNomes({ active }: Props) {
  const globalState = useGlobalState();
  const pathname = usePathname();
  const routeParams = useParams() as JulgamentoDeContaPageProps;
  const municipios = globalState.municipios;
  const pagina = getPagina(pathname);

  return (
    <li>
      <DropdownLinks
        active={active}
        generateUrl={(item) =>
          generateJulgamentoDeContaUrl({
            ...routeParams,
            globalState,
            municipio: item[1].value,
            pagina,
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
        selected={createDropdownValue(routeParams.municipio!)}
      />
    </li>
  );
}
