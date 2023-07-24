import Image from "next/image";
import { IconProps } from "../../types";

type Props = IconProps;

export default function InteligenciaArtificialIcon(props: Props) {
  return (
    <Image
      src="/icons/header/inteligencia-artificial.png"
      alt="Inteligência Artificial"
      height={22}
      width={26}
      {...props}
    />
  );
}
