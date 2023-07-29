import Image from "next/image";
import { IconProps } from "../../types";

type Props = IconProps;

export default function MapaEsIcon(props: Props) {
  return (
    <Image
      src="/icons/header/mapa-es.png"
      alt="Obrigações"
      height={26}
      width={16}
      {...props}
    />
  );
}
