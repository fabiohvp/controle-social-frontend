import BreadcrumbAreaTematicaLabel from "../_components/BreadcrumbAreaTematicaLabel";
import BreadcrumbAreaTematicaPaginas from "../_components/BreadcrumbAreaTematicaPaginas";
import BreadcrumbPatrimonioPaginas from "./_components/BreadcrumbPatrimonioPaginas";

export default function BreadcrumbPatrimonio() {
  return (
    <>
      <BreadcrumbAreaTematicaLabel />
      <BreadcrumbAreaTematicaPaginas />
      <BreadcrumbPatrimonioPaginas />
    </>
  );
}
