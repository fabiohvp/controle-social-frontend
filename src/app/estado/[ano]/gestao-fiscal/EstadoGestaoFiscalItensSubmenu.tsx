import EstadoMenuAnos from "../_components/EstadoMenuAnos";
import EstadoMenuPaginas from "../_components/EstadoMenuPaginas";
import EstadoMenuGestaoFiscalPaginas from "./_components/EstadoMenuGestaoFiscalPaginas";

export default function EstadoGestaoFiscalItensSubmenu() {
  return (
    <>
      <EstadoMenuPaginas />
      <EstadoMenuGestaoFiscalPaginas />
      <EstadoMenuAnos />
    </>
  );
}
