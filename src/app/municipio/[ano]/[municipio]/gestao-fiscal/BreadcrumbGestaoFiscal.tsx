import { MunicipiosProps } from "@/types/Municipio";
import BreadcrumbMunicipiosPaginas from "../(root)/_components/BreadcrumbMunicipiosPaginas";
import BreadcrumbMunicipiosNomes from "../_components/BreadcrumbMunicipiosNomes";
import MunicipiosMenuAnos from "../_components/MunicipiosMenuAnos";
import BreadcrumbGestaoFiscalPaginas from "./_components/BreadcrumbGestaoFiscalPaginas";

export default function GestaoFiscalItensSubmenu({
  municipios,
}: MunicipiosProps) {
  return (
    <>
      <BreadcrumbMunicipiosNomes municipios={municipios} />
      <BreadcrumbMunicipiosPaginas />
      <BreadcrumbGestaoFiscalPaginas />
      <MunicipiosMenuAnos />
    </>
  );
}
