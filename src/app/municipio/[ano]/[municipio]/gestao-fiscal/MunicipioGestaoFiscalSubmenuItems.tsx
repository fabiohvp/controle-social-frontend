import { MunicipiosProps } from "@/shared/municipio";
import MenuMunicipios from "../_components/MenuMunicipios";
import MenuMunicipiosAnos from "../_components/MenuMunicipiosAnos";
import MenuMunicipiosGestaoFiscalPages from "../_components/MenuMunicipiosGestaoFiscalPages";
import MenuMunicipiosPages from "../_components/MenuMunicipiosPages";

export default function MunicipioGestaoFiscalSubmenuItems({
  municipios,
}: MunicipiosProps) {
  return (
    <>
      <MenuMunicipios municipios={municipios} />
      <MenuMunicipiosPages />
      <MenuMunicipiosGestaoFiscalPages />
      <MenuMunicipiosAnos />
    </>
  );
}
