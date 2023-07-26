import { MunicipiosProps } from "@/shared/municipio";
import MenuMunicipios from "../_components/MenuMunicipios";
import MenuMunicipiosAnos from "../_components/MenuMunicipiosAnos";
import MenuMunicipiosGestaoOrcamentariaPages from "../_components/MenuMunicipiosGestaoOrcamentariaPages";
import MenuMunicipiosPages from "../_components/MenuMunicipiosPages";

export default function MunicipioGestaoOrcamentariaSubmenuItems({
  municipios,
}: MunicipiosProps) {
  return (
    <>
      <MenuMunicipios municipios={municipios} />
      <MenuMunicipiosPages />
      <MenuMunicipiosGestaoOrcamentariaPages />
      <MenuMunicipiosAnos />
    </>
  );
}
