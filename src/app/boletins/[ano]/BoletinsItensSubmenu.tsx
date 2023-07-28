import BoletinsLabelItemSubmenu from "./_components/BoletinsLabelItemSubmenu";
import BoletinsMenuAnos from "./_components/BoletinsMenuAnos";
import BoletinsMenuPaginas from "./_components/BoletinsMenuPaginas";

export default function BoletinsItensSubmenu() {
  return (
    <>
      <BoletinsLabelItemSubmenu />
      <BoletinsMenuPaginas />
      <BoletinsMenuAnos />
    </>
  );
}
