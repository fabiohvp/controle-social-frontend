import { MunicipiosProps } from "@/types/Municipio";
import BreadcrumbMunicipiosPaginas from "../(root)/_components/BreadcrumbMunicipiosPaginas";
import BreadcrumbMunicipiosNomes from "../_components/BreadcrumbMunicipiosNomes";
import MunicipiosMenuAnos from "../_components/MunicipiosMenuAnos";
import BreadcrumbGestaoOrcamentariaPaginas from "./_components/BreadcrumbGestaoOrcamentariaPaginas";

export default function BreadcrumbGestaoOrcamentaria({
  municipios,
}: MunicipiosProps) {
  return (
    <>
      <BreadcrumbMunicipiosNomes municipios={municipios} />
      <BreadcrumbMunicipiosPaginas />
      <BreadcrumbGestaoOrcamentariaPaginas />
      <MunicipiosMenuAnos />
    </>
  );
}
