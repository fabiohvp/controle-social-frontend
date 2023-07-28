import ObrigacaoEnvioLabelItemSubmenu from "./_components/ObrigacaoEnvioLabelItemSubmenu";
import MenuObrigacaoEnvioMenuAnos from "./_components/ObrigacaoEnvioMenuAnos";
import ObrigacaoEnvioMenuPaginas from "./_components/ObrigacaoEnvioMenuPaginas";

export default function ObrigacaoEnvioItensSubmenu() {
  return (
    <>
      <ObrigacaoEnvioLabelItemSubmenu />
      <ObrigacaoEnvioMenuPaginas />
      <MenuObrigacaoEnvioMenuAnos />
    </>
  );
}
