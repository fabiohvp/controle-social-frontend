import Image from "next/image";
import { IconProps } from "../../types";

type Props = IconProps;

export default function EstadoIcon(props: Props) {
  return (
    <Image
      src="/icons/header/estado.png"
      alt="Fiscalização"
      height={28}
      width={26}
      {...props}
    />
  );
}
