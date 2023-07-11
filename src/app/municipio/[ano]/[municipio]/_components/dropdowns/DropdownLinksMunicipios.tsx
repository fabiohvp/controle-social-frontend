"use client";
import DropdownLinks from "@/components/dropdowns/links/DropdownLinks";
import MUNICIPIOS from "@/municipios.json";
import { useParams, usePathname } from "next/navigation";

export default function DropdownLinksMunicipios() {
  const routeParams = useParams();
  const segments = usePathname().split(`/${routeParams.municipio}/`)[1];

  return (
    <DropdownLinks
      generateUrl={(item) =>
        `/municipio/${routeParams.ano}/${item.value}/${segments}`
      }
      items={MUNICIPIOS.map((municipio) => ({
        key: municipio.nome,
        value: municipio.nomeNormalizado,
      }))}
      selectedValue={routeParams.municipio}
    />
  );
}
