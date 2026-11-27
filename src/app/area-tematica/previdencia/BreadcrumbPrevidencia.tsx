import BreadcrumbAreaTematicaLabel from "../_components/BreadcrumbAreaTematicaLabel";
import BreadcrumbAreaTematicaPaginas from "../_components/BreadcrumbAreaTematicaPaginas";
import BreadcrumbPrevidenciaPaginas from "./_components/BreadcrumbPrevidenciaPaginas";

export default function BreadcrumbPrevidencia() {
  return (
    <>
      <BreadcrumbAreaTematicaLabel />
      <BreadcrumbAreaTematicaPaginas />
      <BreadcrumbPrevidenciaPaginas />
    </>
  );
}
