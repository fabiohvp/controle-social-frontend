import EstadoMenuAnos from "../_components/EstadoMenuAnos";
import EstadoMenuPaginas from "../_components/EstadoMenuPaginas";
import EstadoMenuGestaoOrcamentariaPaginas from "./_components/EstadoMenuGestaoOrcamentariaPaginas";

export default function EstadoGestaoOrcamentariaItensSubmenu() {
  return (
    <>
      <EstadoMenuPaginas />
      <EstadoMenuGestaoOrcamentariaPaginas />
      <EstadoMenuAnos />
    </>
  );
}
