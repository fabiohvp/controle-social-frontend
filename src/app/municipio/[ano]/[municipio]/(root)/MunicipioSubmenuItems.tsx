import { MunicipiosProps } from "@/types/Municipio";
import MunicipiosMenu from "../_components/MunicipiosMenu";
import MunicipiosMenuAnos from "../_components/MunicipiosMenuAnos";
import MunicipiosMenuPaginas from "../_components/MunicipiosMenuPaginas";

export default function MunicipioSubmenuItems({ municipios }: MunicipiosProps) {
  return (
    <>
      <MunicipiosMenu municipios={municipios} />
      <MunicipiosMenuPaginas />
      <MunicipiosMenuAnos />
    </>
  );
}
