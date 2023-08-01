import { MunicipiosProps } from "@/types/Municipio";
import BreadcrumbMunicipiosNomes from "../_components/BreadcrumbMunicipiosNomes";
import MunicipiosMenuAnos from "../_components/MunicipiosMenuAnos";
import BreadcrumbMunicipiosPaginas from "./_components/BreadcrumbMunicipiosPaginas";

export default function BreadcrumbMunicipio({ municipios }: MunicipiosProps) {
  return (
    <>
      <BreadcrumbMunicipiosNomes municipios={municipios} />
      <BreadcrumbMunicipiosPaginas />
      <MunicipiosMenuAnos />
    </>
  );
}
