import BreadcrumbAreaTematicaLabel from "../_components/BreadcrumbAreaTematicaLabel";
import BreadcrumbAreaTematicaPaginas from "../_components/BreadcrumbAreaTematicaPaginas";
import BreadcrumbEmendasParlamentaresPaginas from "./_components/BreadcrumbEmendasParlamentaresPaginas";

export default function BreadcrumbEmendasParlamentares() {
  return (
    <>
      <BreadcrumbAreaTematicaLabel />
      <BreadcrumbAreaTematicaPaginas />
      <BreadcrumbEmendasParlamentaresPaginas />
    </>
  );
}
