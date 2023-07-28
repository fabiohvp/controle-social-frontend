import { MunicipiosProps } from "@/types/Municipio";
import MunicipiosMenu from "../_components/MunicipiosMenu";
import MunicipiosMenuAnos from "../_components/MunicipiosMenuAnos";
import MunicipiosMenuPaginas from "../_components/MunicipiosMenuPaginas";
import GestaoOrcamentariaMenuPaginas from "./_components/GestaoOrcamentariaMenuPaginas";

export default function GestaoOrcamentariaItensSubmenu({
  municipios,
}: MunicipiosProps) {
  return (
    <>
      <MunicipiosMenu municipios={municipios} />
      <MunicipiosMenuPaginas />
      <GestaoOrcamentariaMenuPaginas />
      <MunicipiosMenuAnos />
    </>
  );
}
