import BreadcrumbAreaTematicaLabel from "../_components/BreadcrumbAreaTematicaLabel";
import BreadcrumbAreaTematicaPaginas from "../_components/BreadcrumbAreaTematicaPaginas";
import BreadcrumbConcessaoPublicaPaginas from "./_components/BreadcrumbConcessaoPublicaPaginas";

export default function BreadcrumbConcessaoPublica() {
  return (
    <>
      <BreadcrumbAreaTematicaLabel />
      <BreadcrumbAreaTematicaPaginas />
      <BreadcrumbConcessaoPublicaPaginas />
    </>
  );
}
