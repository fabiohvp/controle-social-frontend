import BreadcrumbAreaTematicaLabel from "../_components/BreadcrumbAreaTematicaLabel";
import BreadcrumbAreaTematicaPaginas from "../_components/BreadcrumbAreaTematicaPaginas";
import BreadcrumbContratacoesPublicasPaginas from "./_components/BreadcrumbContratacoesPublicasPaginas";

export default function BreadcrumbContratacoesPublicas() {
  return (
    <>
      <BreadcrumbAreaTematicaLabel />
      <BreadcrumbAreaTematicaPaginas />
      <BreadcrumbContratacoesPublicasPaginas />
    </>
  );
}
