"use client";
import DropdownLinks from "@/components/dropdowns/dropdown/DropdownLinks";
import { getMunicipios } from "@/shared/municipio";
import { useParams, usePathname } from "next/navigation";

export default function MenuMunicipios() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  return (
    <li>
      <DropdownLinks
        generateUrl={(item) =>
          `/municipio/${routeParams.ano}/${item.value}/${segments}`
        }
        items={getMunicipios().map((municipio) => ({
          key: municipio.nome,
          value: municipio.nomeNormalizado,
        }))}
        selectedValue={routeParams.municipio}
      />
    </li>
  );
}