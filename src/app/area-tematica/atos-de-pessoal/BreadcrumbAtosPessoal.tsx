import BreadcrumbAreaTematicaLabel from "../_components/BreadcrumbAreaTematicaLabel";
import BreadcrumbAreaTematicaPaginas from "../_components/BreadcrumbAreaTematicaPaginas";
import BreadcrumbAtosPessoalPaginas from "./_components/BreadcrumbAtosPessoalPaginas";

export default function BreadcrumbAtosPessoal() {
  return (
    <>
      <BreadcrumbAreaTematicaLabel />
      <BreadcrumbAreaTematicaPaginas />
      <BreadcrumbAtosPessoalPaginas />
    </>
  );
}
