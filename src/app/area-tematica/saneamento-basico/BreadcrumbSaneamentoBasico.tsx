import BreadcrumbAreaTematicaLabel from "../_components/BreadcrumbAreaTematicaLabel";
import BreadcrumbAreaTematicaPaginas from "../_components/BreadcrumbAreaTematicaPaginas";
import BreadcrumbSaneamentoBasicoPaginas from "./_components/BreadcrumbSaneamentoBasicoPaginas";

export default function BreadcrumbSaneamentoBasico() {
  return (
    <>
      <BreadcrumbAreaTematicaLabel />
      <BreadcrumbAreaTematicaPaginas />
      <BreadcrumbSaneamentoBasicoPaginas />
    </>
  );
}
