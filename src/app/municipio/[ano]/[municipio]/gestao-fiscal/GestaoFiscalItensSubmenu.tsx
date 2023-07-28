import { MunicipiosProps } from "@/types/Municipio";
import MunicipiosMenu from "../_components/MunicipiosMenu";
import MunicipiosMenuAnos from "../_components/MunicipiosMenuAnos";
import MunicipiosMenuPaginas from "../_components/MunicipiosMenuPaginas";
import GestaoFiscalMenuPaginas from "./_components/GestaoFiscalMenuPaginas";

export default function GestaoFiscalItensSubmenu({
  municipios,
}: MunicipiosProps) {
  return (
    <>
      <MunicipiosMenu municipios={municipios} />
      <MunicipiosMenuPaginas />
      <GestaoFiscalMenuPaginas />
      <MunicipiosMenuAnos />
    </>
  );
}
