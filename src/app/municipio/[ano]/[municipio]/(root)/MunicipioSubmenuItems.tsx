import { MunicipiosProps } from "@/shared/municipio";
import MenuMunicipios from "../_components/MenuMunicipios";
import MenuMunicipiosAnos from "../_components/MenuMunicipiosAnos";
import MenuMunicipiosPages from "../_components/MenuMunicipiosPages";

export default function MunicipioSubmenuItems({ municipios }: MunicipiosProps) {
  return (
    <>
      <MenuMunicipios municipios={municipios} />
      <MenuMunicipiosPages />
      <MenuMunicipiosAnos />
    </>
  );
}
