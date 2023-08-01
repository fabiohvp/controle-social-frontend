import BreadcrumbObrigacaoEnvioLabel from "./_components/BreadcrumbObrigacaoEnvioLabel";
import BreadcrumbObrigacaoEnvioPaginas from "./_components/BreadcrumbObrigacaoEnvioPaginas";
import MenuObrigacaoEnvioMenuAnos from "./_components/ObrigacaoEnvioMenuAnos";

export default function BreadcrumbObrigacaoEnvio() {
  return (
    <>
      <BreadcrumbObrigacaoEnvioLabel />
      <BreadcrumbObrigacaoEnvioPaginas />
      <MenuObrigacaoEnvioMenuAnos />
    </>
  );
}
